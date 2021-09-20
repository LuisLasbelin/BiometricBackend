<?php
// -------------------------------------------------
//
// nombre:Texto, password:Texto -> hacerLogin() -> Boolean, usuario:Texto
//
// usuario: devuelto implicitamente en la variable global de sesión
//  (en el navegador no se pordrá acceder a la var. global)
//
// -------------------------------------------------

$objetoResultado = new stdClass;

// creo una sesión 
session_start();

// comprobación "rigurosa" del password
if ( $_GET["password"] == "1234" ) {
  // si el password es correcto
  // preparo el resultado
  $objetoResultado->resultado = true;
  $objetoResultado->usuario = $_SESSION["usuario"];
  // gurado en la sesión el nombre del
  // del usuario
  session_start();
  $_SESSION["usuario"] = $_GET["nombre"];
} else {
  // si el password no es correcto,
  // cierro sesión y respondo false
  session_destroy();
  $objetoResultado->resultado = false;
}

// echo == devolver
echo json_encode( $objetoResultado );
?>
