

// inicializamos la conexion
const socket = io.connect();
socket.on("products list", (data) => {
  console.log("products list", data);
});


const $titleData = document.getElementById("title");
const $priceData = document.getElementById("price");
const $thumbnailData = document.getElementById("thumbnail");


const $editList = document.getElementById("editList");
const $addList = document.getElementById("addList");
const $table = document.getElementById("table");
const $mensaje = document.getElementById("txtmessage");
const $username = document.getElementById("username")
const $enviarMsj = document.getElementById("enviarMsj");
const $delete = document.getElementById("delete");
const $value = document.getElementById("value");
$editList.style.display = 'none'

let timeout = undefined;
/**
 * Productos
 */

const template = Handlebars.compile(`
<div class="table-responsive">
    <table class="table table-dark">
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
        </tr>
        {{#each products}}
        <tr>
            <td>{{this.title}}</td>
            <td>$ {{this.price}}</td>
            <td><img width="50" src={{this.thumbnail}} alt="sin imagen"></td>
            <td><button  class="btn btn-danger"onclick="deleteProduct({{this._id}})">Eliminar</button></td>
            <td><button class="btn btn-primary"onclick="editProduct({{this._id}})">Editar</button></td>
        </tr>
        {{/each}}
    </table>
</div>

`);


const templateMensajes = Handlebars.compile(`
<ul>
  {{#each mensajes }}
  <li> <p class="usuario">{{this.usuario}}:</p><p class="mensaje">{{this.mensaje}}</p></li>
  <span>{{this.fecha}}</span>
  {{/each}}
</ul>
`)
var info 
socket.on("productData", (data) => {
  const elemento = document.getElementById("productosHTML")
  elemento.innerHTML = ''
  data.products.forEach((producto) => {
   elemento.innerHTML += `
        <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img width="50" src=${producto.thumbnail} alt="sin imagen"></td>
            <td><button  class="btn btn-danger"onclick="deleteProduct('${producto._id}')">Eliminar</button></td>
            <td><button class="btn btn-primary"onclick="editProduct('${producto._id}')">Editar</button></td>
        </tr>
    `
  })
   info = data
});

socket.on("disconnect", socket => {
  console.log("un usuario se desconecto")
})

// Cuando el usuario haga click en el boton se envia el socket con el mensaje del input
const addProduct = () => {
 
  const data = {
    title: $titleData.value,
    price: $priceData.value,
    thumbnail: $thumbnailData.value
  };
  socket.emit("addNewProduct", data);   
  $titleData.value = ""
  $priceData.value = ""
  $thumbnailData.value = ""
};

const deleteProduct = (id) => {
  console.log(id)
  socket.emit("deleteProduct", id);
}

const editProduct = (id) => {
  let data = info.products.find(product => product._id === id)
  console.log(data)
  $titleData.value = data.title
  $priceData.value = data.price
  $thumbnailData.value = data.thumbnail
  $editList.style.display = 'block'
  $addList.style.display = 'none'
  $value.value = id   
}


$addList.addEventListener("click", addProduct);

$editList.addEventListener("click",() => {
  let id = $value.value
  const data = {
    title: $titleData.value,
    price: $priceData.value,
    thumbnail: $thumbnailData.value
  };
  $titleData.value = ""
  $priceData.value = ""
  $thumbnailData.value = ""
  $value.value = ""
  console.log(data)
  $editList.style.display = 'none'
  $addList.style.display = 'block'
  socket.emit("editProduct", {
    id,
    data
  });
})

const enviarmensajes = () => {
  if ($username.value !== "") {
    socket.emit("crearMensaje", {
      usuario: $username.value,
      mensaje: $mensaje.value,
      fecha: moment().format('LLL')
    }, (mensajes) => {
      console.log("callback", mensajes)
    })
    $mensaje.value = ""
  } else {
    alert("agregar email")
    $username.focus();
  }
}

socket.on("crearMensaje", (mensajes) => {
  console.log(mensajes)
  $("#mensajes").html(
    templateMensajes({ mensajes: mensajes })
  );
});

socket.on("escribiendo", (mensajes) => {
  console.log(mensajes)
  if (mensajes.escribiendo === true) {
    $escribiendo.innerHTML = `<p>${mensajes.usuario} esta escribiendo</p>`
  } else {
    $escribiendo.innerHTML = ``
  }
})

$enviarMsj.addEventListener("click", enviarmensajes);


$mensaje.addEventListener('keydown', (event) => {
  console.log(event)
  if (event.code !== "Enter") {
    escribiendo = true;
    socket.emit('escribiendo', { usuario: $username.value, escribiendo: true }, (resp) => {

    });
    clearTimeout(timeout);
    timeout = setTimeout(finTiempoEscritura, 200);
  }
  else {
    clearTimeout(timeout);
    finTiempoEscritura();
  }
  configurarNombreUsuario()
});



function finTiempoEscritura() {
  escribiendo = false;
  socket.emit('escribiendo', { usuario: $username.value, escribiendo: false }, (resp) => {

  });
}


function configurarNombreUsuario() {
  socket.emit('configurarNombreUsuario', $username.value);
}
