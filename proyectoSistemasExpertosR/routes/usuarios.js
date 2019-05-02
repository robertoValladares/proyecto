
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const Usuario = require('../models/Usuario');
const Carpeta = require('../models/Carpeta');
const Archivo = require('../models/Archivo');
const Plan = require('../models/Plan');


router.get('/', async (req, res) => {
    console.log('obtener usuario');
    const usuarios = await Usuario.find();
    res.send(usuarios);
   
});

router.get('/editor/:idPadre', async (req, res) => {
    const archivos = await Archivo.find({idPadre:req.params.idPadre});
    console.log(archivos);
    res.render('editor', {archivos})
});


router.post('/nuevoUsuario', async (req, res) => {
    let errores = [];
    console.log('hola roberto');
    const { nombre, apellido, correo, password, confirmar_password } = req.body;
    // res.send('hola soy nuevo usuario');

    // const usuario = new Usuario ({
    //     nombre : req.body.nombre,
    //     apellido : req.body.apellido,
    //     correo : req.body.correo,
    //     password : req.body.password
    // });

    if(nombre.length == 0){
        errores.push({texto:`El campo "nombre" está vacío `})
    }

    if(apellido.length == 0){
        errores.push({texto:`El campo "apellido" está vacío `})
    }

    if(password != confirmar_password) {
        errores.push({texto: 'las contraseñas no coinciden'});
      }
    if(password.length < 4) {
    errores.push({texto: 'la contraseña debe de ser mayor a 4 caracteres'})
    }

    if (errores.length > 0){
        res.render('registrarPersona', {errores})
    } else {

        const usuario = new Usuario({nombre,apellido, correo, password});
        usuario.password = await usuario.encryptPassword(password);
        console.log(usuario);
        console.log('hola roberto');
    
        await usuario.save();
        //res.send(usuario);
        //res.redirect('/users/signin');
        res.redirect('/login');

    }

    // console.log(usuario);
    // console.log('hola roberto');
    
    // await usuario.save();
    // res.send(usuario);
    
   
  });

  router.post('/autenticar', passport.authenticate('local', {
    successRedirect: '/proyectos',
    failureRedirect: '/login',
    failureFlash: true
  }));


  router.get('/salir', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Usted está desconectado ahora.');
    res.redirect('/login');
  });

// router.post('/autenticar', async (req, res) => {
//     const {correo, password} = req.body;
//     const usuario= new Usuario({correo, password});
//     //const usuarios = await Usuario.find();
//     res.send(usuario);
   
// });

//   router.post('/autenticar', passport.authenticate('local', {
//     successRedirect: '/principal',
//     failureRedirect: '/login',
//     //failureFlash: true
//   }));

// obtiene las carpetas que le han sido compartidas a un usuario 
// cuando se haga la sesion es mejor quitar el id como parametro y usar user.id
router.get('/carpetasCompartidas/:idUsuario', async (req, res)=> { 
  console.log("hola mundo");
  console.log(req.params.idUsuario);

  const carpetasCompartidas = await Carpeta.find({usuariosInvitados : req.params.idUsuario});
  console.log(carpetasCompartidas);
  res.send(carpetasCompartidas);
  //res.render('principal' , carpetasCompartidas);

});

router.get('/archivosCompartidos/:idUsuario', async (req, res)=> { 
  console.log("hola mundo");
  console.log(req.params.idUsuario);

  const archivosCompartidos = await Archivo.find({usuariosInvitados : req.params.idUsuario});
  if(archivosCompartidos != ''){ //si es comparar != no lleva doble '==' porque da error
  console.log(archivosCompartidos); // esta es la forma para hacer el plan
    
  }
  res.send(archivosCompartidos);
  //res.render('principal' , carpetasCompartidas);

});


router.put('/adquirirPlan/' , async (req, res)=> {
  console.log(req.user.id);
  const respuesta = await Usuario.findByIdAndUpdate(
      req.user.id,
      {$set: {"tipoUsuario" : "premiun"}}
  );
  console.log(respuesta);
  res.send(respuesta);
});

module.exports = router;

  