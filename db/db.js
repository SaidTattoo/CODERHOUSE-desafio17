var mongoose = require('mongoose');
const connectionString = "mongodb+srv://SaidTattoo:saidravestsk8@cluster0.cts60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


exports.getConnection = async () => {
   try {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      return "conexion ok"
   } catch (error) {
       return "error en la db"
   }
  };