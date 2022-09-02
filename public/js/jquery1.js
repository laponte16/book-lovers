var x;
	x=$(document);
	x.ready(inicio);//inico de la logica del documento
	function inicio() {
		var y;
		y=$("#1");
		y.click(mospsicologico);
		y=$("#4");
		y.click(mosaccion);
		y=$("#5");
		y.click(moscomedia);	
		y=$("#6");
		y.click(mosmisterio);
		
		
		y=$("#7");
		y.click(mosterror);
		y=$("#8");
		y.click(mosromance);
		y=$("#9");
		y.click(mosinfantil);
		y=$("#11");
		y.click(mosfilosofico);
		y=$("#12");
		y.click(mosaventura);
		y=$("#13");
		y.click(moshistoricos);
		y=$("#15");
		y.click(mosbiograficos);
		y=$("#16");
		y.click(mosciencia_ficcion);
	}
	function mosmisterio() {
		var x;
		var t;
		var i;
		x=$("#conte");
		t=$("#respu");
		i=$("#imgconte");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("lean sherlock holmes esta bueno");},700);
		imgUrl ="images/misterio.jpg"
		window.setTimeout(function(){i.css("background-image","url(" + imgUrl + ")");},700);
		x.fadeIn(1500);
		
	}
	function mosaccion() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("lean worm inicio algo lento pero se pone bueno");},700);
		x.fadeIn(1500);

			
		
	}
	function mospsicologico() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("aqui va la instropercion");},700);
		x.fadeIn(1500);

			
		
	}
	function moscomedia() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("aqui van las risas");},700);
		x.fadeIn(1500);

			
		
	}

	function mosterror() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("aqui va el miedo y el boo");},700);
		x.fadeIn(1500);

			
		
	}

	function mosromance() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("aqui va el the love");},700);
		x.fadeIn(1500);

			
		
	}

	function mosinfantil() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("aqui va los cuentos infantiles");},700);
		x.fadeIn(1500);

			
		
	}

	function mosfilosofico() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("grandes pensadores");},700);
		x.fadeIn(1500);

			
		
	}

	function mosaventura() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("que hora es ? es hora de aventura!");},700);
		x.fadeIn(1500);

			
		
	}

	function moshistoricos() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("aqui va la historia universal aqunue realmente solo es del la tierra");},700);
		x.fadeIn(1500);

			
		
	}

	function mosbiograficos() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("vida y obra de personas importantes");},700);
		x.fadeIn(1500);

			
		
	}

	function mosciencia_ficcion() {
		var x;
		var t;
		x=$("#conte");
		t=$("#respu");
		x.fadeOut(500);
		window.setTimeout(function(){t.text("aqui va volver al futuro , star war y demas");},700);
		x.fadeIn(1500);

			
		
	}