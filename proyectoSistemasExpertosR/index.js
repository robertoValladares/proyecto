const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
var bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
var usuariosRouter = require('./routes/usuarios');
var proyectosRouter = require('./routes/proyectos');
var carpetasRouter = require('./routes/carpetas');
var carpetasCompartidasRouter = require('./routes/carpetasCompartidas');
var archivosRouter = require('./routes/archivos');









// inicializaciones 
const app= express();
require('./database');
require('./config/passport');


//app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(methodOverride('_method'));   // para que el formulario pueda enviar metodos put delete

// configuraciones
app.set('puerto', process.env.PORT || 3600);
app.set('views', path.join(__dirname, 'views')); 
//app.engine('html', require('ejs').renderfile);
app.set('view engine','ejs');


// middlewares
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // si sale que no es funcion probablemente no este en miidleware

// app.get('/', (req, res) => {
//     console.log('soy roberto');
//   });


//variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');  // este es para passport, pasa el error a través de messaje
  res.locals.user = req.user || null;
  next();
});
// rutas del proyecto
app.use(require('./routes'));
app.use("/usuarios",usuariosRouter);
app.use("/proyectos", proyectosRouter);
app.use("/carpetas", carpetasRouter);
app.use("/carpetasCompartidas", carpetasCompartidasRouter);
app.use("/archivos", archivosRouter);

// app.use(require('./routes/usuarios'));
//app.use(require('./routes/proyectos'));


// archivos estaticos

app.use(express.static(path.join(__dirname, 'public')));



// servidor escuchando 

app.listen(app.get('puerto'), () => {
    console.log('servidor levantado en el puerto', app.get('puerto'));
  });