
exports.up = function(knex) {
    return  knex.schema.createTable('productos',(table) => {
        table.increment('id').notNullable().unique().primary();
        table.string('title').notNullable()
        table.string('price').notNullable()
        table.string('thumbnail').notNullable()
    }).createTable('mensajes', function(mensajes) {
        mensajes.increments('id').notNullable().unique().primary();
        mensajes.string('usuario').notNullable()
        mensajes.string('mensaje').notNullable()
        mensajes.string('fecha').notNullable()
      });
};

exports.down = function(knex) {
    return  knex.schema.dropTable('productos')
};
