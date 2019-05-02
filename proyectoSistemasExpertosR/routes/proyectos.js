
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const Proyecto = require('../models/Proyecto');


//helpers
const { isAuthenticated } = require('../helpers/auth');


// obtiene todos los proyectos 
// deberia de obtener solamente los proyectos del usuario registrado en sesion
router.get('/', isAuthenticated ,async (req, res) => {
    const proyectos = await Proyecto.find({usuario: req.user.id});
    //res.send(proyectos);
    console.log(req.user.nombre);
    console.log(req.user.id);
    var ruta = 1;
    
    res.render('principal', {proyectos, ruta});
});


// agregar un nuevo proyecto
// falta asignarle el usuario que crea que este proyecto
router.post('/nuevoProyecto', isAuthenticated, async (req, res) => {
    var totalProyectos = await Proyecto.find({usuario: req.user.id}).count();
    if(req.user.tipoUsuario != 'premiun'){
          if (totalProyectos <=2){
              const {nombre, descripcion} = req.body;
              const proyecto = new Proyecto ({nombre , descripcion});
              proyecto.usuario=req.user.id;
              console.log(proyecto);
              console.log(totalProyectos);
              await proyecto.save();
              res.send(proyecto);
          }
          
          else{  const proyecto=[];
                 res.send(proyecto);
          }

    } 
        else{  
        const {nombre, descripcion} = req.body;
        const proyecto = new Proyecto ({nombre , descripcion});
        proyecto.usuario=req.user.id;
        console.log(proyecto);
        console.log(totalProyectos);
        await proyecto.save();
        res.send(proyecto);
    }
  });

// eliminar proyecto 
router.delete('/:idProyecto' , async (req, res)=> {
  const data =  await Proyecto.remove({_id:req.params.idProyecto});
  console.log(data);
  res.send(data);
});

  

  module.exports = router;