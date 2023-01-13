var x;
	x=$(document);
	x.ready(start);//inico de la logica del documento

    var arrowLeftHot = $(".arrowLeftHot");
    var arrowRightHot = $(".arrowRightHot");

    var panelHot = $(".panelHot");

	var controlHot = 0;
	var maxControlHot = 5;
	

	function start() {
		arrowLeftHot.on("click",clickArrowLeftHot);
        arrowRightHot.on("click",clickArrowRightHot);

		$(".panelHot").draggable();
	}
	function clickArrowLeftHot() {
		
		if(controlHot < maxControlHot){
			panelHot.animate({left: "-=140"},350, function(){});
			controlHot += 1;
		}
		
		
	}

    function clickArrowRightHot() {
		
		if(controlHot > 0){
			panelHot.animate({left: "+=140"},350, function(){});
			controlHot -=1;
		}

	}
