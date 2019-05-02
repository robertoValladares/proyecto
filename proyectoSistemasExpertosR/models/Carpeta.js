const mongoose = require('mongoose');
const { Schema } = mongoose;



const CarpetaSchema = new Schema({
  nombre: { type: String, required: true },
  idPadre: {type: String, required :true},
  usuariosInvitados :{type : Array},
  fecha: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Carpeta', CarpetaSchema);