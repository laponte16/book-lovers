var x;
	x=$(document);
	x.ready(start);//inico de la logica del documento

    var arrowLeftHot = $(".arrowLeftHot");
    var arrowRightHot = $(".arrowRightHot");

    var panelHot = $(".panelHot");
	var panelHotChildren = panelHot.children();

	var controlHot = 0;
	

	function start() {
		arrowLeftHot.on("click",clickArrowLeftHot);
        arrowRightHot.on("click",clickArrowRightHot);

		for(var i = 0; i < panelHotChildren.length; i++){
			if(i>4){
				panelHotChildren[i].hidden = true;
			}
		}
		controlHot = 51;
	}
	function clickArrowLeftHot() {
		
		if(controlHot == 51){
			panelHot.animate({left: '-100%'},250);
			panelHot.animate({left: '+100%'},0);
			window.setTimeout(function(){
				for(var i = 0; i < panelHotChildren.length; i++){
					if(i<=4){
						panelHotChildren[i].hidden = true;
					}
					else{
						panelHotChildren[i].hidden = false;
					}
				}
			},260);
			
			controlHot = 52;
			panelHot.animate({left: '0%'},250);
		}
		else{
			panelHot.animate({left: '-100%'},250);
			panelHot.animate({left: '+100%'},0);
			window.setTimeout(function(){
				for(var i = 0; i < panelHotChildren.length; i++){
					if(i<=4){
						panelHotChildren[i].hidden = false;
					}
					else{
						panelHotChildren[i].hidden = true;
					}
				}
			},260);
			controlHot = 51;
			panelHot.animate({left: '0%'},250);
		}
	}

    function clickArrowRightHot() {
		
		if(controlHot == 51){
			panelHot.animate({left: '+100%'},250);
			panelHot.animate({left: '-100%'},0);
			window.setTimeout(function(){
				for(var i = 0; i < panelHotChildren.length; i++){
					if(i<=4){
						panelHotChildren[i].hidden = true;
					}
					else{
						panelHotChildren[i].hidden = false;
					}
				}
			},260);
			
			controlHot = 52;
			panelHot.animate({left: '0%'},250);
		}
		else{
			panelHot.animate({left: '+100%'},250);
			panelHot.animate({left: '-100%'},0);
			window.setTimeout(function(){
				for(var i = 0; i < panelHotChildren.length; i++){
					if(i<=4){
						panelHotChildren[i].hidden = false;
					}
					else{
						panelHotChildren[i].hidden = true;
					}
				}
			},260);
			controlHot = 51;
			panelHot.animate({left: '0%'},250);;
		}

	}
