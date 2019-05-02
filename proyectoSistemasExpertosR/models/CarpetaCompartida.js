const mongoose = require('mongoose');
const { Schema } = mongoose;



const CarpetaCompartidaSchema = new Schema({
  nombreCarpeta : ({type : String, required : true}),
  nombreUsuarioQueInvita: { type: String, required: true },
  idUsuarioInvitado: {type: String, required :true},
  fecha: { type: Date, default: Date.now }
});



module.exports = mongoose.model('CarpetasCompartida', CarpetaCompartidaSchema);