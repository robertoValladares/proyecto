const mongoose = require('mongoose');
const { Schema } = mongoose;



const ProyectoSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: {type: String, required:true},
  usuario: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Proyecto', ProyectoSchema);