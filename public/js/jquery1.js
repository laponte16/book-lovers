var x;
	x=$(document);
	x.ready(inicio);//inico de la logica del documento
	function inicio() {
		var y;
		y=$("#manga");
		y.click(mosmanga);
		y=$("#novela");
		y.click(mosnovela);
	}
	function mosmanga() {
		var x;
		x=$("#respu");
		x.fadeTo("fast","0");
		
		x.text("lean boku ");
		x.fadeTo("slow","0.8");//o fast, para escala sin degradaddo fadeIn o fadeOut en vez del show o hide

			// tambien esta fadeTo("velocidad","nivel de trasparencia")
		
	}
	function mosnovela() {
		var x;
		x=$("#respu");
		x.fadeTo("fast","0");
		
		x.text("lean worm ");
		x.fadeTo("slow","0.8");

			
		
	}