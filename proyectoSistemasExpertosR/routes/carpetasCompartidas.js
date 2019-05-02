
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const CarpetaCompartida = require('../models/CarpetaCompartida');



router.get('/', async (req, res) => {
    const carpetasCompartidas = await CarpetaCompartida.find();
    res.send(carpetasCompartidas);
});




//esta funcion debe de implemetarse con el id del usuario guardado en sesion
// solamente debe de ir "/"
router.get('/:idUsuario', async (req, res)=> {
    const carpetasCompartidas = await CarpetaCompartida.find({idUsuarioInvitado:req.params.idUsuario});
    res.send(carpetasCompartidas);
})

router.post('/nuevaCarpetaCompartida', async (req, res) => {
    console.log('hola roberto vamos a agregar carpetas');
    // res.send('hola soy nuevo usuario');
    const carpetaCompartida = new CarpetaCompartida ({
        _id : req.body.id,
        nombreCarpeta : req.body.nombreCarpeta,
        nombreUsuarioQueInvita : req.body.nombreUsuarioQueInvita,
        idUsuarioInvitado : req.body.idUsuarioInvitado,
        fecha : req.body.fecha
    });

    console.log(carpetaCompartida);
    console.log('hola roberto');
    
    await carpetaCompartida.save(); 
    res.send(carpetaCompartida);
    
   
  });

  router.delete('/:idCarpeta' , async (req, res)=> {
    await CarpetaCompartida.findByIdAndDelete(req.params.idCarpeta);
    res.send("objeto eliminado")
  });



  
  module.exports = router;