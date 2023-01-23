var x;
	x=$(document);
	x.ready(start);

	//Variables de carrusel de Hottie hots
    var arrowLeftHot = $(".arrowLeftHot");
    var arrowRightHot = $(".arrowRightHot");

    var panelHot = $(".panelHot");
	var panelHotChildren = panelHot.children();

	var controlHot = 999;
	var controlHot2 = 999;
	//Variables de carrusel de newcomers
	var arrowLeftNew = $(".arrowLeftNew");
    var arrowRightNew = $(".arrowRightNew");

    var panelNew = $(".panelNew");
	var panelNewChildren = panelNew.children();

	var controlNew = 999;
	var controlNew2 = 999;
	
	//Ejecucion del script
	function start() {

		//Carruseles
		//Responsive: Large
		if(window.screen.width >= 1024){
			for(var i = 0; i < panelHotChildren.length; i++){
				if(i>4){
					panelHotChildren[i].hidden = true;
					panelNewChildren[i].hidden = true;
				}
			}
			controlHot = 51;
			controlNew = 51;
		}
		else if(window.screen.width >= 768){
			for(var i = 0; i < panelHotChildren.length; i++){
				if(i>1){
					panelHotChildren[i].hidden = true;
					panelNewChildren[i].hidden = true;
				}
			}
			controlHot = 32;
			controlHot2 = 0;
			controlNew = 32;
			controlNew2 = 0;
		}
		else if(window.screen.width >= 360){
			for(var i = 0; i<panelHotChildren.length;i++){
				if(i == 0){
					panelHotChildren[0].hidden = false;
					panelNewChildren[0].hidden = false;
				}
				else{
					panelHotChildren[i].hidden = true;
					panelNewChildren[i].hidden = true;
				}
			}
			controlHot = 0;
			controlHot2 = 0;
			controlNew = 0;
			controlNew2 = 0;
		}
		
		//Carrusel Hottie Hot
		arrowLeftHot.on("click",(event)=>{
			
			switch(controlHot){
				case 51:
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
				break;

				case 52:
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
				break;

				case 32:
					panelHot.animate({left: '-100%'},250);
					panelHot.animate({left: '+100%'},0);
					if(controlHot2 < 8){
						window.setTimeout(function(){
							for(var i = 0; i < panelHotChildren.length; i++){
								if(i>controlHot2+1 && i<=controlHot2+3){
									panelHotChildren[i].hidden = false;
								}
								else{
									panelHotChildren[i].hidden = true;
								}
							}
							controlHot2 = controlHot2+2;
						},260);
					}
					else{
						window.setTimeout(function(){
							for(var i = 0; i < panelHotChildren.length; i++){
								if(i<2){
									panelHotChildren[i].hidden = false;
								}
								else{
									panelHotChildren[i].hidden = true;
								}
							}
							controlHot2 = 0;
						},260);
					}	
					panelHot.animate({left: '0%'},250);
				break;
				case 0:
					panelHot.animate({left: '-100%'},250);
					panelHot.animate({left: '+100%'},0);
					if(controlHot2 < 9){
						
						window.setTimeout(function(){
							panelHotChildren[controlHot2].hidden = true;
							panelHotChildren[controlHot2 + 1].hidden = false;
							controlHot2 = controlHot2 + 1;
						},260);
						
					}
					else if(controlHot2 == 9){
						window.setTimeout(function(){
							panelHotChildren[controlHot2].hidden = true;
							panelHotChildren[0].hidden = false;
							controlHot2 = 0;
						},260);
					}
					panelHot.animate({left: '0%'},250);					
				break;
			}
				
		});

        arrowRightHot.on("click",(event)=>{
			
			switch(controlHot){
				case 51:
					panelHot.animate({left: '+100%'},250);
					panelHot.animate({left: '-100%'},0);
					window.setTimeout(function(){
						for(var i = 0; i < panelHotChildren.length; i++){
							if(i>4){
								panelHotChildren[i].hidden = false;
							}
							else{
								panelHotChildren[i].hidden = true;
							}
						}
					},260);
				
				controlHot = 52;
				panelHot.animate({left: '0%'},250);
				break;

				case 52:
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
					panelHot.animate({left: '0%'},250);
				break;

				case 32:
					panelHot.animate({left: '+100%'},250);
					panelHot.animate({left: '-100%'},0);
					if(controlHot2 > 0){
						window.setTimeout(function(){
							for(var i = 0; i < panelHotChildren.length; i++){
								if(i<controlHot2 && i>=controlHot2-2){
									panelHotChildren[i].hidden = false;
								}
								else{
									panelHotChildren[i].hidden = true;
								}
							}
							controlHot2 = controlHot2-2;
						},260);
					}
					else{
						window.setTimeout(function(){
							for(var i = 0; i < panelHotChildren.length; i++){
								if(i>7){
									panelHotChildren[i].hidden = false;
								}
								else{
									panelHotChildren[i].hidden = true;
								}
							}
							controlHot2 = 8;
						},260);
					}	
					panelHot.animate({left: '0%'},250);
				break;
				case 0:
					panelHot.animate({left: '+100%'},250);
					panelHot.animate({left: '-100%'},0);
					if(controlHot2 > 0){
						
						window.setTimeout(function(){
							panelHotChildren[controlHot2].hidden = true;
							panelHotChildren[controlHot2 - 1].hidden = false;
							controlHot2 = controlHot2 - 1;
						},260);
						
					}
					else if(controlHot2 == 0){
						window.setTimeout(function(){
							panelHotChildren[controlHot2].hidden = true;
							panelHotChildren[9].hidden = false;
							controlHot2 = 9;
						},260);
					}
					panelHot.animate({left: '0%'},250);					
				break;
			}

		});

		
		//Carrusel de Newcomers
		
		arrowLeftNew.on("click",(event)=>{
			
			switch(controlNew){
				case 51:
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
				break;

				case 52:
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
				break;

				case 32:
					panelNew.animate({left: '-100%'},250);
					panelNew.animate({left: '+100%'},0);
					if(controlNew2 < 8){
						window.setTimeout(function(){
							for(var i = 0; i < panelNewChildren.length; i++){
								if(i>controlNew2+1 && i<=controlNew2+3){
									panelNewChildren[i].hidden = false;
								}
								else{
									panelNewChildren[i].hidden = true;
								}
							}
							controlNew2 = controlNew2+2;
						},260);
					}
					else{
						window.setTimeout(function(){
							for(var i = 0; i < panelNewChildren.length; i++){
								if(i<2){
									panelNewChildren[i].hidden = false;
								}
								else{
									panelNewChildren[i].hidden = true;
								}
							}
							controlNew2 = 0;
						},260);
					}	
					panelNew.animate({left: '0%'},250);
				break;
				case 0:
					panelNew.animate({left: '-100%'},250);
					panelNew.animate({left: '+100%'},0);
					if(controlNew2 < 9){
						
						window.setTimeout(function(){
							panelNewChildren[controlNew2].hidden = true;
							panelNewChildren[controlNew2 + 1].hidden = false;
							controlNew2 = controlNew2 + 1;
						},260);
						
					}
					else if(controlNew2 == 9){
						window.setTimeout(function(){
							panelNewChildren[controlNew2].hidden = true;
							panelNewChildren[0].hidden = false;
							controlNew2 = 0;
						},260);
					}
					panelNew.animate({left: '0%'},250);					
				break;
			}
				
		});

		arrowRightNew.on("click",(event)=>{
			
			switch(controlNew){
				case 51:
					panelNew.animate({left: '+100%'},250);
					panelNew.animate({left: '-100%'},0);
					window.setTimeout(function(){
						for(var i = 0; i < panelNewChildren.length; i++){
							if(i>4){
								panelNewChildren[i].hidden = false;
							}
							else{
								panelNewChildren[i].hidden = true;
							}
						}
					},260);
				
				controlNew = 52;
				panelNew.animate({left: '0%'},250);
				break;

				case 52:
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
					panelNew.animate({left: '0%'},250);
				break;

				case 32:
					panelNew.animate({left: '+100%'},250);
					panelNew.animate({left: '-100%'},0);
					if(controlNew2 > 0){
						window.setTimeout(function(){
							for(var i = 0; i < panelNewChildren.length; i++){
								if(i<controlNew2 && i>=controlNew2-2){
									panelNewChildren[i].hidden = false;
								}
								else{
									panelNewChildren[i].hidden = true;
								}
							}
							controlNew2 = controlNew2-2;
						},260);
					}
					else{
						window.setTimeout(function(){
							for(var i = 0; i < panelNewChildren.length; i++){
								if(i>7){
									panelNewChildren[i].hidden = false;
								}
								else{
									panelNewChildren[i].hidden = true;
								}
							}
							controlNew2 = 8;
						},260);
					}	
					panelNew.animate({left: '0%'},250);
				break;
				case 0:
					panelNew.animate({left: '+100%'},250);
					panelNew.animate({left: '-100%'},0);
					if(controlNew2 > 0){
						
						window.setTimeout(function(){
							panelNewChildren[controlNew2].hidden = true;
							panelNewChildren[controlNew2 - 1].hidden = false;
							controlNew2 = controlNew2 - 1;
						},260);
						
					}
					else if(controlNew2 == 0){
						window.setTimeout(function(){
							panelNewChildren[controlNew2].hidden = true;
							panelNewChildren[9].hidden = false;
							controlNew2 = 9;
						},260);
					}
					panelNew.animate({left: '0%'},250);					
				break;
			}

		});
	}
