
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const Carpeta = require('../models/Carpeta');
const Archivo = require('../models/Archivo');


// obtener todas las carpetas
router.get('/', async (req, res) => {
    const carpetas = await Carpeta.find();
    const proyectos ='';
   //res.send(carpetas);
    res.render('principal', { carpetas, proyectos});
});


//Note.find({user: req.user.id}).sort({date: 'desc'}
// obtiene las carpetas por el id de la carpeta o proyecto padre
router.get('/:idPadre', async (req, res)=> {
    const carpetas = await Carpeta.find({idPadre:req.params.idPadre});
    const archivos = await Archivo.find({idPadre:req.params.idPadre});
    const idPadre = req.params.idPadre;
    var ruta = 2;
    //res.send(carpetas);
    res.render('principal', {carpetas,archivos, idPadre, ruta});
});

router.get('/com/:idPadre', async (req, res)=> {
    const carpetasCom = await Carpeta.find({idPadre:req.params.idPadre});
    const idPadre = req.params.idPadre;
    //res.send(carpetas);
    res.render('principal', {carpetasCom});
});


// obtiene las carpetas que le han sido compartidas a un usuario 
// cuando se haga la sesion es mejor quitar el id como parametro y usar user.id



// este es para el formulario, agregar una carpeta nueva
router.post('/nuevaCarpeta', async (req, res) => {
    console.log('hola roberto vamos a agregar carpetas');
    // res.send('hola soy nuevo usuario');
    const carpeta = new Carpeta ({
        nombre : req.body.nombre,
        idPadre : req.body.idPadre
    });

    console.log(carpeta);
    console.log('hola roberto');
    
    await carpeta.save(); 
    res.send(carpeta);
    
   
});


// al final si sirve  
// esta funcion obtiene dos valores de un formulario id de la carpeta a compartir 
// y el id de el usuario invitado, esto se debe hacer mediante un formulario
router.put('/agregarInvitado' , async (req, res)=> {
    if(req.user.tipoUsuario == "premiun"){
        console.log(req.body.idUsuarioInvitado);
        const respuesta = await Carpeta.findByIdAndUpdate(
            req.body.idCarpeta,
            {$push: {usuariosInvitados : req.body.idUsuarioInvitado}}
        );
        res.send(respuesta);
    } else{
        const respuesta=[];
        res.send(respuesta);
    }
    
});


// router.put('/agregarInvitado' , async (req, res)=> {
//     console.log("se quiere compartir carpeta")
//     console.log(req.body.idCarpeta , req.body.idUsuarioInvitado);
//     res.send(req.body.idUsuarioInvitado);
//     await Carpeta.update(
//         {_id: req.body.idCarpeta},
//         {$push: {"usuariosInvitados": req.body.idUsuarioInvitado}}
//     );
//     res.send("el arreglo se actualizo");


// });
    

// funcion para eliminar una carpeta
// router.delete('/:idCarpeta' , async (req, res)=> {
// const data =  await Carpeta.findByIdAndDelete(req.params.idCarpeta);
// console.log(data);
// res.send(data);
// });

router.delete('/:idCarpeta' , async (req, res)=> {
    const data =  await Carpeta.remove({_id:req.params.idCarpeta});
    console.log(data);
    res.send(data);
    });


    
// obtiene las carpetas que le han sido compartidas a un usuario 
// cuando se haga la sesion es mejor quitar el id como parametro y usar user.id
// router.get('/carpetasCompartidas/:idUsuario', async (req, res)=> { 
//     console.log("hola mundo");
//     console.log(req.params.idUsuario);

//     const carpetasCompartidas = await Carpeta.find({usuariosInvitados : req.params.idUsuario});
//     console.log(carpetasCompartidas);
//     res.send(carpetasCompartidas);
//     //res.render('principal' , carpetasCompartidas);

// });

module.exports = router;