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
// arreglos de filas
function candyRows(index) {
	var candyRow = giveCandyArrays('rows', index);
	return candyRow;
}
// arreglos de colunmnas
function candyColumns(index) {
	var candyColumn = giveCandyArrays('columns');
	return candyColumn[index];
}

//punto 3. verificar dulces >= 3 unidades, eliminar y sumar puntaje
function columnValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyColumn = candyColumns(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, candyColumn);
			setScore(candyCount);
		}
	}
}
//eliminar columnas
function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}
// Valida si hay dulces que deben eliminarse en una fila
function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = candyRows(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
	}
}
//eliminar filas
function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}
//contador de puntuacion
function setScore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}



//punto 5. contador de movimientos


//punto 4. temporizador
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
