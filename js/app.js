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
//generar numeros aleatorios
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
//obtener filas y columnas
function giveCandyArrays(arrayType, index) {
	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();
	var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7
	]);
	if (typeof index === 'number') {
		var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}
	if (arrayType === 'columns') {
		return candyColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
}

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
  $(".btn-reinicio").click(function(){
    if($(this).text() == "Reiniciar"){
      location.reload(true);
    }
    $(this).text("Reiniciar");
    $("#timer").startTimer({
      onComplete: endGame
    })
  });
}
//final del juego
function endGame() {
	$("div.panel-tablero, div.time").effect("fold");
	$(".main-titulo").addClass("title-over")
		.text("¡Gracias por jugar!");
	$("div.score, div.moves, div.panel-score").width("100%");

}
//punto 7. interaccion del usuario drag & drop
