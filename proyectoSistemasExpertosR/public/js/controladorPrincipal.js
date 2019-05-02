


$("#btn-crear-proyecto").click(function(){
  var parametros = $("#formularioProyectos").serialize();
  console.log("Información a guardar: " + parametros);
  $.ajax({
      url:"/proyectos/nuevoProyecto/",
      method:"post",
      data: parametros,
      dataType: "json",
      success:function(res){
          console.log(res);
          $("#modal-nuevo-proyecto").modal("hide");
          if(res != '') {
                $("#contenedorPrincipal").append(
                `<div class="col-sm-6 mb-4" id="${res._id}">
                        <div class="card" style="background:#485e63; color: aliceblue;">
                        <div class="card-body">
                            <h5 class="card-title">${res.nombre}</h5>
                            <p class="card-text">${res.descripcion}</p>
                            <a href="/carpetas/${res._id}" class="btn btn-primary">ver archivos</a>
                            <a href="/usuarios/editor/${res._id}" class="btn btn-primary">comenzar proyecto</a>
                            <a href="" style="float:right;" onclick="eliminarProyecto(event, '${res._id}')"><i class="fas fa-trash fa-lg" style="color:#BF2B2B;"></i></a>
                        </div>
                        </div>
                    </div>` );
                crearArchivoHtml(res._id);
            }
            else{
                $("#contenedorPrincipal").prepend(
                    `<div class="alert alert-warning alert-dismissible fade show col-10 ml-5" role="alert">
                        ERROR (Para poder agregar más de 3 proyectos, adquiera el plan premiun)
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>` 
                    ); 
            }
      },
      error:function(error){
          console.log(error);
          $("#modal-nuevo-proyecto").modal("hide");
      }
  });
});

function crearArchivoHtml(idProyecto){
    const parametros = {
    nombre:"index",
    extension:".html",
    idPadre: idProyecto };
    console.log(parametros);
    $.ajax({
        url:"/archivos/nuevoArchivo",
        method:"post",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
            crearArchivoCss(idProyecto);
        },
        error:function(error){
            console.log(error);
        }
    });
  };

  function crearArchivoCss(idProyecto){
    const parametros = {
    nombre:"estilos",
    extension:".css",
    idPadre: idProyecto };
    console.log(parametros);
    $.ajax({
        url:"/archivos/nuevoArchivo",
        method:"post",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
            crearArchivoJs(idProyecto);
        },
        error:function(error){
            console.log(error);
        }
    });
  };

  function crearArchivoJs(idProyecto){
    const parametros = {
    nombre:"controlador",
    extension:".js",
    idPadre: idProyecto };
    console.log(parametros);
    $.ajax({
        url:"/archivos/nuevoArchivo",
        method:"post",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
        },
        error:function(error){
            console.log(error);
        }
    });
  };




$("#btn-crear-carpeta").click(function(){
  var parametros = $("#formularioCarpetas").serialize();
  console.log("Información a guardar: " + parametros);
  $.ajax({
      url:"/carpetas/nuevaCarpeta",
      method:"post",
      data: parametros,
      dataType: "json",
      success:function(res){
          console.log(res);
          $("#modal-nueva-carpeta").modal("hide");
          $("#contenedorPrincipal").append(
          `	<div class="col-xl-3 col-sm-12 col-xs-12 text-center mb-5" id="${res._id}">
                <a href="/carpetas/${res._id}"><i class="fas fa-folder fa-5x" style="color:#E18E48";></i></a>
                <div> 
                    <a href="" onclick="eliminarCarpeta(event, '${res._id}')"><i class="far fa-trash-alt fa-lg" style="color:#BF2B2B;"></i></a> 
                    <a href="" onclick="modalCompartirCarpeta(event, '${res._id}')"><i class="fas fa-share-alt fa-lg" style="color:#3334BF;"></i></a>
                </div>
                <h4>${res.nombre}</h4>
            </div>` );
      },
      error:function(error){
          console.log(error);
          $("#modal-nueva-carpeta").modal("hide");
      }
  });
});


$("#btn-crear-archivo").click(function(){
  var parametros = $("#formularioArchivos").serialize() + "&extension="+$("#lista-extensiones option:selected").text();
  console.log("Información a guardar: " + parametros);
  $.ajax({
      url:"/archivos/nuevoArchivo",
      method:"post",
      data: parametros,
      dataType: "json",
      success:function(res){
          console.log(res);
          $("#modal-nuevo-archivo").modal("hide");
          $("#contenedorPrincipal").append(
          `	<div class="col-xl-3 col-sm-12 col-xs-12 text-center mb-5" id="${res._id}">
                <a href="#" onclick="modalEditarArchivos(event, '${res._id}')"><i class="fas fa-file-code fa-5x mb-2" style="color:#77bbb8";></i></a>
                <div>
                    <a href="" onclick="eliminarArchivo(event, '${res._id}')"><i class="far fa-trash-alt fa-lg" style="color:#BF2B2B;"></i></a> 
                    <a href="" onclick="modalCompartirArchivo(event, '${res._id}')"><i class="fas fa-share-alt fa-lg" style="color:#3334BF;"></i></a>               
                </div>
                <h4>${res.nombre}${res.extension}</h4>
            </div>` );
            },
      error:function(error){
          console.log(error);
          $("#modal-nuevo-archivo").modal("hide");
      }
  });
});




function modalEditarArchivos(e,id){
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('editar archivo: ' + id);
    // $("#carpetaCompartir").val(id);
    $("#modal-editar-archivos").modal("show");
    $.ajax({
        url:"/archivos/"+id,
        method:"get",
        dataType: "json",
        success:function(res){
            console.log(res);
            $("#nombreArchivo").text(res.nombre+res.extension);
            $("#idArchivo").val(res._id);
            $("#contenido-archivo").val(res.contenido);
              },
        error:function(error){
            console.log(error);
            // $("#modal-nuevo-archivo").modal("hide");
        }
    });
  };

  $("#btn-editar-archivo").click(function(){
    var parametros = $("#formularioEditarArchivos").serialize();
    console.log("Información a guardar: " + parametros);
    $.ajax({
        url:"/archivos/editarArchivo",
        method:"put",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
            $("#modal-editar-archivos").modal("hide");
              },
        error:function(error){
            console.log(error);
            $("#modal-editar-archivos").modal("hide");
        }
    });
  });


function eliminarProyecto(e,id){
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('Eliminar el proyecto: ' + id);
    $.ajax({
        url:"/proyectos/"+id,
        method:"delete",
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
        },
        error:function(error){
            console.log(error);
        }
    });
};

function eliminarCarpeta(e,id){
  e.preventDefault(); //Evitar comportamiento por defecto de un anchor
  console.log('Eliminar el objeto: ' + id);
  $.ajax({
      url:"/carpetas/"+id,
      method:"delete",
      dataType:"json",
      success:function(res){
          console.log(res);
          if (res.n==1 && res.ok == 1)
              $("#"+id).remove();
      },
      error:function(error){
          console.log(error);
      }
  });
};

function eliminarArchivo(e,id){
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('Eliminar el objeto: ' + id);
    $.ajax({
        url:"/archivos/"+id,
        method:"delete",
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.n==1 && res.ok == 1)
                $("#"+id).remove();
        },
        error:function(error){
            console.log(error);
        }
    });
  };

function modalCompartirCarpeta(e,id){
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('compartir carpeta: ' + id);
    $("#carpetaCompartir").val(id);
    $("#modal-compartir-carpetas").modal("show");
    $.ajax({
        url:"/usuarios/",
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
           llenarListaDeUsuarios(res);
        },
        error:function(error){
            console.log(error);
        }
    });
  };

  function modalCompartirArchivo(e,id){
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('compartir archivo: ' + id);
    $("#archivoCompartir").val(id);
    $("#modal-compartir-archivos").modal("show");
    $.ajax({
        url:"/usuarios/",
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
           llenarListaDeUsuariosParaArchivos(res);
        },
        error:function(error){
            console.log(error);
        }
    });
  };


  function llenarListaDeUsuarios(usuarios){
    document.getElementById("lista-usuarios").innerHTML ='';
    for(var i=0; i < usuarios.length; i++){
        document.getElementById("lista-usuarios").innerHTML += 
                `<option name"idUsuarioInvitado" value="${usuarios[i]._id}"> ${usuarios[i].correo}</option>`;
    }
  };

  function llenarListaDeUsuariosParaArchivos(usuarios){
    document.getElementById("lista-usuarios-archivos").innerHTML ='';
    for(var i=0; i < usuarios.length; i++){
        document.getElementById("lista-usuarios-archivos").innerHTML += 
                `<option name"idUsuarioInvitado" value="${usuarios[i]._id}"> ${usuarios[i].correo}</option>`;
    }
  };

  


  $("#btn-compartir-carpeta").click(function(){
    var parametros = $("#formulario-compartir-carpetas").serialize() + "&idUsuarioInvitado="+$("#lista-usuarios option:selected").val();
    console.log("Información a guardar: " + parametros);
    $.ajax({
        url:"/carpetas/agregarInvitado",
        method:"put",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
            console.log("el objeto se actualizo")
            $("#modal-compartir-carpetas").modal("hide");
                if(res != '') {
                        $("#contenedorPrincipal").prepend(
                        `<div class="alert alert-success alert-dismissible fade show col-10 ml-5" role="alert">
                                La carpeta se compartió satisfactoriamente
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>` 
                            );
                        }
                    else{
                        $("#contenedorPrincipal").prepend(
                            `<div class="alert alert-warning alert-dismissible fade show col-10 ml-5" role="alert">
                                Para compartir, usted debe adquirir el plan premiun
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>` 
                        );
                    }
              },
        error:function(error){
            console.log(error);
            console.log("no pudo actualizarse")
            $("#modal-compartir-carpetas").modal("hide");
        }
    });
  });

  $("#btn-compartir-archivo").click(function(){
    var parametros = $("#formulario-compartir-archivos").serialize() + "&idUsuarioInvitado="+$("#lista-usuarios-archivos option:selected").val();
    console.log("Información a guardar: " + parametros);
    $.ajax({
        url:"/archivos/agregarInvitado",
        method:"put",
        data: parametros,
        dataType: "json",
        success:function(res){
            console.log(res);
            console.log("el objeto se actualizo")
            $("#modal-compartir-archivos").modal("hide");
            $("#contenedorPrincipal").prepend(
               `<div class="alert alert-success alert-dismissible fade show col-10 ml-5" role="alert">
                    El archivo se compartió satisfactoriamente
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>` 
                 );
              },
        error:function(error){
            console.log(error);
            console.log("no pudo actualizarse")
            $("#modal-compartir-archivos").modal("hide");
        }
    });
  });

  function obtenerCarpetasCompartidas(e,id){
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('llamar carpetas compartidas con el usuario: ' + id);

    $.ajax({
        url:"/usuarios/carpetasCompartidas/"+id,
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
            listarCarpetasCompartidas(res);
            
        },
        error:function(error){
            console.log(error);
        }
    });
  };

  function listarCarpetasCompartidas(carpetas){
    document.getElementById("contenedorPrincipal").innerHTML ='';
    for(var i=0; i < carpetas.length; i++){
        document.getElementById("contenedorPrincipal").innerHTML += 
                `<div class="col-xl-3 col-sm-12 col-xs-12 text-center mb-5" id="${carpetas[i]._id}">
                <a href="/carpetas/com/${carpetas[i]._id}"><i class="fas fa-folder fa-5x" style="color:#E18E48";></i></a>
                <h4>${carpetas[i].nombre}</h4>
                </div>`;
    }
  };

  function obtenerArchivosCompartidos(e,id){
    e.preventDefault(); //Evitar comportamiento por defecto de un anchor
    console.log('llamar archivos compartidas con el usuario: ' + id);

    $.ajax({
        url:"/usuarios/archivosCompartidos/"+id,
        method:"get",
        dataType:"json",
        success:function(res){
            console.log(res);
            listarArchivosCompartidos(res);
            
        },
        error:function(error){
            console.log(error);
        }
    });
  };

  function listarArchivosCompartidos(archivos){
    document.getElementById("contenedorPrincipal").innerHTML ='';
    for(var i=0; i < archivos.length; i++){
        document.getElementById("contenedorPrincipal").innerHTML += 
                `<div class="col-xl-3 col-sm-12 col-xs-12 text-center mb-5" id="${archivos[i]._id}">
					<a href="#" onclick="modalEditarArchivos(event, '${archivos[i]._id}')" ><i class="fas fa-file-code fa-5x mb-2" style="color:#77bbb8";></i></a>
                    <h4>${archivos[i].nombre}</h4>
                 </div>`;
    }
  };


  $("#btn-adquirir-plan").click(function(){
    $.ajax({
        url:"/usuarios/adquirirPlan",
        method:"put",
        dataType: "json",
        success:function(res){
            console.log(res);
            $("#modal-plan-premiun").modal("hide");
                    $("#contenedorPrincipal").prepend(
                        `<div class="alert alert-success alert-dismissible fade show col-10 ml-5" role="alert">
                            La compra del plan se realizó satisfactoriamente
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>` 
                        );        
              },
        error:function(error){
            console.log(error);
            $("#modal-plan-premiun").modal("hide");
        }
    });
  });


//   para agregar espacios sin salos de linea &nbsp 