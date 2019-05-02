const mongoose = require('mongoose');
const { Schema } = mongoose;



const ArchivoSchema = new Schema({
  nombre: { type: String, required: true },
  extension: { type: String}, 
  contenido: { type: String },
  idPadre: {type: String, required :true},
  usuariosInvitados :{type : Array},
  fecha: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Archivo', ArchivoSchema);