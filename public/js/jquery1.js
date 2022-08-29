var x;
	x=$(document);
	x.ready(inicio);//inico de la logica del documento
	function inicio() {
		var y;
		y=$("#misterio");
		y.click(mosmisterio);
		y=$("#accion");
		y.click(mosaccion);
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