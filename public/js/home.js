var x;
	x=$(document);
	x.ready(start);

	//Variables de carrusel de Hottie hots
    var arrowLeftHot = $(".arrowLeftHot");
    var arrowRightHot = $(".arrowRightHot");

    var panelHot = $(".panelHot");
	var panelHotChildren = panelHot.children();

	var controlHot = 0;
	//Variables de carrusel de newcomers
	var arrowLeftNew = $(".arrowLeftNew");
    var arrowRightNew = $(".arrowRightNew");

    var panelNew = $(".panelNew");
	var panelNewChildren = panelNew.children();

	var controlNew = 0;
	
	//Ejecucion del script
	function start() {

		//Carrusel de Hottie Hots
		for(var i = 0; i < panelHotChildren.length; i++){
			if(i>4){
				panelHotChildren[i].hidden = true;
			}
		}
		controlHot = 51;

		arrowLeftHot.on("click",(event)=>{
			
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
		});

        arrowRightHot.on("click",(event)=>{
			
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
		});

		
		//Carrusel de Newcomers
		for(var i = 0; i < panelNewChildren.length; i++){
			if(i>4){
				panelNewChildren[i].hidden = true;
			}
		}
		controlNew = 51;

		arrowLeftNew.on("click",(event)=>{
			
			if(controlNew == 51){
				panelNew.animate({left: '-100%'},250);
				panelNew.animate({left: '+100%'},0);
				window.setTimeout(function(){
					for(var i = 0; i < panelNewChildren.length; i++){
						if(i<=4){
							panelNewChildren[i].hidden = true;
						}
						else{
							panelNewChildren[i].hidden = false;
						}
					}
				},260);
				
				controlNew = 52;
				panelNew.animate({left: '0%'},250);
			}
			else{
				panelNew.animate({left: '-100%'},250);
				panelNew.animate({left: '+100%'},0);
				window.setTimeout(function(){
					for(var i = 0; i < panelNewChildren.length; i++){
						if(i<=4){
							panelNewChildren[i].hidden = false;
						}
						else{
							panelNewChildren[i].hidden = true;
						}
					}
				},260);
				controlNew = 51;
				panelNew.animate({left: '0%'},250);
			}
		});

        arrowRightNew.on("click",(event)=>{
			
			if(controlNew == 51){
				panelNew.animate({left: '+100%'},250);
				panelNew.animate({left: '-100%'},0);
				window.setTimeout(function(){
					for(var i = 0; i < panelNewChildren.length; i++){
						if(i<=4){
							panelNewChildren[i].hidden = true;
						}
						else{
							panelNewChildren[i].hidden = false;
						}
					}
				},260);
				
				controlNew = 52;
				panelNew.animate({left: '0%'},250);
			}
			else{
				panelNew.animate({left: '+100%'},250);
				panelNew.animate({left: '-100%'},0);
				window.setTimeout(function(){
					for(var i = 0; i < panelNewChildren.length; i++){
						if(i<=4){
							panelNewChildren[i].hidden = false;
						}
						else{
							panelNewChildren[i].hidden = true;
						}
					}
				},260);
				controlNew = 51;
				panelNew.animate({left: '0%'},250);;
			}
		});
	}
