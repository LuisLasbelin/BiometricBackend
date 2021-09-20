<?php
// -------------------------------------------------
// Función (verdadera) de la lógica del negocio
//
// usuario:Texto -> diHola() -> (nombre:Texto, saludo:Texto) | error:Texto
//
// usuario: recibido de forma implícita en la sesión
// (nombre:Texto, saludo:Texto) | error:Texto : devuelto en un mismo JSON
//
// -------------------------------------------------

session_start();

// creo el objeto resultado
$objetoResultado = new stdClass;

// compruebo si esto lo pide un usuario
// antes acreditado mediante login
if ( ! isset( $_SESSION["usuario"]) ) {
  // no es un usuario acreditado
  $objetoResultado->error = "usuario no acreditado";
  $objetoResultado->nombre = "";
  $objetoResultado->saludo = "";
  // echo == devolver
  echo json_encode( $objetoResultado );
  return;
}

// si es un usuario acreditado:

// el nombre es el parámetro de entrada
// implícito en la sesión: "usuario"
$objetoResultado->error = 0;
$objetoResultado->nombre = $_SESSION["usuario"];
$objetoResultado->saludo = "That's all folks";

// echo == devolver
echo json_encode( $objetoResultado );
?>
