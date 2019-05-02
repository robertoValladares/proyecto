const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const Usuario = require('../models/Usuario'); 

passport.use(new LocalStrategy({
  usernameField: 'correo'
}, async (correo, password, done) => {
  // Match Email's User
  console.log(correo);
  console.log(password);
  let errores = [];
  const usuario = await Usuario.findOne({correo: correo});
  console.log(usuario);
  if (!usuario) {
    return done(null, false, { message: 'usuario no encontrado' });
  } else {
    // Match Password's User
    const match = await usuario.matchPassword(password);
    if(match) {
      console.log("usuario autenticado");
      return done(null, usuario);
    } else {
      return done(null, false, { message: 'contraseña incorrecta' });
    }
  }

}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, usuario) => {
    done(err, usuario);
  });
});
