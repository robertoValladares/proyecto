
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const Archivo = require('../models/Archivo');

const { isAuthenticated } = require('../helpers/auth');


// obtener todas las carpetas
router.get('/', async (req, res) => {
    const archivos = await Archivo.find();
    const proyectos ='';
    res.send(archivos);
    //res.render('principal', { archivos, proyectos});
    
});


router.get('/:id', isAuthenticated,  async (req, res) => {
    const archivo = await Archivo.findById(req.params.id);
    const proyectos ='';
    res.send(archivo);
    //res.render('principal', { archivos, proyectos});
    
});



//Note.find({user: req.user.id}).sort({date: 'desc'}
// obtiene las carpetas por el id de la carpeta o proyecto padre
router.get('/:idPadre', isAuthenticated, async (req, res)=> {
    const archivos = await Archivo.find({idPadre:req.params.idPadre});
    const proyectos = '';
    //res.send(carpetas);
    res.render('principal', {archivos, proyectos})
})

// obtiene las carpetas que le han sido compartidas a un usuario 
// cuando se haga la sesion es mejor quitar el id como parametro y usar user.id
router.get('/carpetasCompartidas/:idUsuario', async (req, res)=> {
    const archivos = await Archivo.find({usuariosInvitados : req.params.idUsuario});
    res.send(archivos);
})


// este es para el formulario, agregar una carpeta nueva
router.post('/nuevoArchivo', isAuthenticated, async (req, res) => {
    console.log('hola roberto vamos a agregar archivos');
    // res.send('hola soy nuevo usuario');
    const archivo = new Archivo ({
        nombre : req.body.nombre,
        extension : req.body.extension,
        contenido : req.body.contenido,
        idPadre : req.body.idPadre
    });

    console.log(archivo);
    console.log('hola roberto');
    
    await archivo.save(); 
    res.send(archivo);
    
   
});


// al final si sirve  
// esta funcion obtiene dos valores de un formulario id de la carpeta a compartir 
// y el id de el usuario invitado, esto se debe hacer mediante un formulario
router.put('/agregarInvitado' , isAuthenticated, async (req, res)=> {
    console.log(req.body.idUsuarioInvitado);
    const respuesta = await Archivo.findByIdAndUpdate(
        req.body.idArchivo,
        {$push: {usuariosInvitados : req.body.idUsuarioInvitado}}
    );
    res.send(respuesta);
});

router.put('/editarArchivo' , isAuthenticated, async (req, res)=> {
    console.log("se quire editar un archivo");
    console.log(req.body.idArchivo);
    console.log(req.body.contenidoArchivo);
    const respuesta = await Archivo.findByIdAndUpdate(
        req.body.idArchivo,
        {$set: {"contenido" : req.body.contenidoArchivo}}
    );
    console.log(respuesta);
    res.send(respuesta);


});


    

// funcion para eliminar una carpeta
router.delete('/:idArchivo' , isAuthenticated, async (req, res)=> {
    const data =  await Archivo.remove({_id:req.params.idArchivo});
    console.log(data);
    res.send(data);
    });



  module.exports = router;