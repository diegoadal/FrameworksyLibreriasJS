//punto 1. cambio de color del titulo
function colorBlink(){
  $(".main-titulo").animate({
    opacity: "1",
  }, {
    step: function(){
      $(this).css("color", "yellow");
    },
    queue: true
  }, 1000)
  .delay(1000)
  .animate({
    opacity: "1",
  }, {
    step: function(){
      $(this).css("color", "white");
      //.delay(1000)
      colorBlink();
    },
    queue: true
  }, 1000)
}

//punto 2. generar numeros aleatorios y rellenar tablero

//punto 3. verificar dulces >= 3 unidades, eliminar y sumar puntaje

//punto 4. temporizador

//punto 5. contador de movimientos

//punto 6. boton de Iniciar
//preparar juego
$(function(){
  startGame();
});
//iniciar juego
function startGame(){
  colorBlink();
}
//punto 7. interaccion del usuario drag & drop
