

var directionWidth;
var directionTiming;
var timeRemaining;
var paperObject;
var throwDistance;
var throwDirection;
var score;
var scored = false;
var collisionTimerCenter;
var collisionTimerLeft;
var collisionTimerRight;
var canSwipe;
var isMobile = false;
var finalBall = true;
var timeoutFrame;
var videoPlaying;
var videoElement;
var gifNumber = 0;
var hasReset = true;
var intoPlaying = true;

//giving the bin object properties
var bin = {x:0,y:0,h:0,w:0}
var whichBall = 0;

var SITE = {

	init: function(e) {

		//reset functions 
		whichBall = 0;
		timeRemaining = 30;
		canSwipe = false;
		//starting score
		score = 0;

		// Assign All the elements to the elements on the page
		container = document.getElementById('container_dc');
		content = document.getElementById('content_dc');
		directionScrubber = $("#direction .directionScrubber");
		paperObject = $("#paper"+whichBall);
		shadowObject = $(".ballShadow"+whichBall);
		paperObject.css({opacity:1});
		shadowObject.css({opacity:0});
		container.style.display = 'block';


		$(".timeUp").css({opacity:0});
		$(".instructions").css({opacity:1});
		$("#score span").html("00");
		$("#timer span").html(timeRemaining);

		// set position of paper
		paperX = "140px";
		paperY = "420px"

		//set poition of shadow
		shadowX = "141px";
		shadowY = "446px";

		for(i=0; i<= 4; i++){
			$("#paper"+i).css({"opacity":"0"});
			$(".ballShadow"+i).css({"opacity":"0"});
		}

		for(z=0; z<= 5; z++){
			$(".message"+i).css({"opacity":"0"});
		}

		//position of the bin on stage
		bin.x = $("#bin").position().left;
		bin.y = $("#bin").position().top;
		bin.h = $("#bin").height();
		bin.w = $("#bin").width();

		TweenMax.to($("#binContainer"), 0, {left:-100});

		//hit box of the bin
		$("#binRectBot").css({
			//"backgroundColor":"blue",
			"width":bin.w - 20,
			"height":bin.h - 40,
			"top":bin.y + 30,
			"left":bin.x + 10,
			"position":"absolute"

		});

		hasReset = true;

		setTimeout(function(){intoPlaying == false},15000);

		TweenMax.to(paperObject, 0, {left:paperX,top:paperY,scaleX:1, scaleY:1, rotation:0, width: 55, height: 60, opacity:1});
		TweenMax.to(shadowObject, 0, {left:shadowX,top:shadowY,scaleX:1,scaleY:1, rotation:0, width: 55, height: 60, opacity:1});

		//setting the collision hitbox on the stage
		var rectangleBottom = $('#binRect').getRe

		$(".instructions").css({"zIndex":"4"});

		$(".instructions").bind('touchstart click', function(){
			this.style.opacity = 0;
			SITE.startgame();
			$(".instructions").css({"zIndex":"2"});
		});

		$("#startFrame").bind('touchstart click', function(e){
			Enabler.expand();
       	 	Enabler.startTimer('panel_1 Expansion');
       	 	SITE.frameMovement.startFrame();
			intoPlaying = false;

		});

		$(".playAgain").bind('touchstart click', function(){
			SITE.frameMovement.replayGame();
		});


		$(".findOutMore").bind('touchstart click', function(){
			Enabler.exit('HTML5_Expanded_Clickthrough');
			//Collapse Ad
			Enabler.collapse();
			//Stop Timer
			Enabler.stopTimer('panel_1 Expansion');
		});

		$(".closeBtn").bind('touchstart click', function(e){
			Enabler.counter('Rich Media Manual Closes');    
       	 	Enabler.collapse();
        	Enabler.stopTimer('panel_1 Expansion');
        	SITE.frameMovement.collapseFrame();
		});

		document.ontouchstart = function(e){ 
    		e.preventDefault(); 
		}	
		setTimeout(function(){SITE.frameMovement.collapsedAnimate(0)},3000);
		SITE.detectMobile();

	},

	detectMobile : function () {

		 if( navigator.userAgent.match(/Android/i)
		 || navigator.userAgent.match(/webOS/i)
		 || navigator.userAgent.match(/iPhone/i)
		 || navigator.userAgent.match(/iPad/i)
		 || navigator.userAgent.match(/iPod/i)
		 || navigator.userAgent.match(/BlackBerry/i)
		 || navigator.userAgent.match(/Windows Phone/i)
		 ){
		    isMobile = true;
		  }
		 else {
		    isMobile = false;
		  }
	},

	frameMovement : {

		collapsedAnimate : function (whichStep){
			console.log("here");
			if (intoPlaying == true){
				switch(whichStep){

					case 0 :
					TweenMax.to($(".frameOne"), 1, {opacity:0});
					TweenMax.to($(".frameTwo"), 1, {opacity:1, delay:0.5});
					setTimeout(function(){SITE.frameMovement.collapsedAnimate(1)},3000);
					break;
					case 1 :
					TweenMax.to($(".frameTwo"), 1, {opacity:0});
					TweenMax.to($(".frameOne"), 1, {opacity:1, delay:0.5});
					setTimeout(function(){SITE.frameMovement.collapsedAnimate(0)},3000);
					break;
				}
			}

		},

		startFrame : function(){
			TweenMax.to($(".frameOne"), 0, {opacity:0});
			TweenMax.to($(".frameTwo"), 0, {opacity:0});
			TweenMax.to($(".skyLogoSmall"), 0, {opacity:0});
			TweenMax.to($("#startFrame"), 1, {height:477,top:0,onComplete:function(){
				$("#startFrame").css({"display":"none"})
			}});
			TweenMax.to($("#container_dc"), 1, {height:480, delay:0});
			TweenMax.to($("#content_dc"), 0.5, {opacity:1, delay:1});
			TweenMax.to($("#endFrame"), 0.5, {opacity:1, delay:1});
			TweenMax.to($(".closeBtn"), 0.5, {opacity:1, delay:1});
		},

		collapseFrame : function (){
			TweenMax.to($(".frameOne"), 0, {opacity:1, delay:1});
			TweenMax.to($(".frameTwo"), 0, {opacity:1, delay:1});
			TweenMax.to($(".skyLogoSmall"), 0, {opacity:1, delay:1});
			$("#startFrame").css({"display":"inline"})
			TweenMax.to($("#startFrame"), 1, {height:50,top:428,onComplete:function(){}});
			TweenMax.to($("#container_dc"), 1, {height:480});
			TweenMax.to($("#content_dc"), 0.5, {opacity:0});
			TweenMax.to($("#endFrame"), 0.5, {opacity:0});
			TweenMax.to($(".closeBtn"), 0.5, {opacity:0});
			intoPlaying = true;
			setTimeout(function(){SITE.frameMovement.collapsedAnimate(0)},3000);
		},

		endFrame : function (){
			TweenMax.to($(".text1"), 0, {opacity:1});
			TweenMax.to($(".text2"), 0, {opacity:0});
			TweenMax.to($(".text1"), 1, {opacity:0,delay:5});
			TweenMax.to($(".text2"), 1, {opacity:1,delay:6});
			TweenMax.to($("#content_dc"), 1, {left:-320});
			TweenMax.to($("#endFrame"), 1, {left:0});

		},

		replayGame : function () {
			$(".findOutMore").unbind('touchstart click');
			$(".playAgain").unbind('touchstart click');
			TweenMax.to($("#endFrame"), 1, {left:320});
			TweenMax.to($("#content_dc"), 1, {left:0});
			SITE.init();
		},
	},

	startgame : function(){

		//reset the position of the bin + balls
		SITE.reset();
		//start animation of the direction scrubber
		SITE.binAnimate.moveBin();
		//SITE.animate.direction();

		//timer
		SITE.timer();
		//set the swipe function, this will enable swiping up and the user needs to swipe 20px in order for this to fire.
		$(function() {      
	      $(".hitArea").swipe( {
	        swipeUp:function(event, direction, distance, duration, fingerCount, fingerData) {

	         if (canSwipe == true){

	         	if (isMobile == false) {
	         		//desktop
	         		var parentOffset = $(this).parent().offset();
					var relX = event.clientX - parentOffset.left;
				 	SITE.animate.ball(relX);

	         	}
	         	else {
	         		//mobile
	         		var parentOffset = $(this).parent().offset();
					var relX = event.changedTouches[0].pageX - parentOffset.left;
				 	SITE.animate.ball(relX);

	         	}
			  canSwipe = false;
	         }
	        },
	         threshold:20
	      });
	    });
	},

	animate: {

		ball : function(relX){
			//get varible for the direction of the throw as per where the scrubber bar pointer is when the user throws
			var throwDirection = relX;
			//tween the ball into the air
			TweenMax.to(paperObject,1,{scaleX:0.9, scaleY:0.9,rotation:720,left:throwDirection, top: $("#binContainer").position().top - 300,ease:Cubic.easeOut,overwrite:false});
			//swap out the bin index so the ball is behind the bin when it drops down
			setTimeout(function(){SITE.binIndex(3);},700);
			//tween shadow
			TweenMax.to(shadowObject,1,{scaleX:0.9, scaleY:0.9, opacity:0.1, left:throwDirection, top: $("#binContainer").position().top + 100,ease:Cubic.easeOut,overwrite:false});
			//tween the bal to fall to the ground
			TweenMax.to(paperObject,2,{width: $("#binContainer").position().top / 30, height: $("#binContainer").position().top / 30,rotation:1440,left:throwDirection, top: $("#binContainer").position().top + 60,ease:Bounce.easeOut,overwrite:false,delay:0.75});
			//tween shadow
			TweenMax.to(shadowObject,2,{width: $("#binContainer").position().top / 30, opacity:0.2, height: $("#binContainer").position().top / 30,left:throwDirection, top: $("#binContainer").position().top + 68,ease:Bounce.easeOut,overwrite:false,delay:0.75});
			//add on to the ball varible so you can flick another ball
			whichBall ++;

			if(whichBall >= 3){
				whichBall = 0;
			}
			//check the time remainind
			if(timeRemaining >= 1){
				var resetTimer = setTimeout(function(){SITE.reset();},2000);
			}
			else {
				clearTimeout(resetTimer);
			}
			//check collision
			collisionTimerCenter = setTimeout(function(){
				SITE.collision(paperObject,$("#binRectBot"));
			},250);

			collisionTimerLeft = setTimeout(function(){
				SITE.collisionLeft(paperObject,$("#binRectLeft"));
			},250);

			collisionTimerRight = setTimeout(function(){
				SITE.collisionRight(paperObject,$("#binRectRight"));
			},250);

		},

		direction : function (){

			//directionWidth = $("#direction").width();
			//scrubber bar with yoyo effect will go to the end and back untill the user interacts 
			//directionTiming = TweenMax.to(directionScrubber, 0.5, {left:directionWidth, repeat:-1, yoyo:true, ease:Linear.easeNone});

		}
	},
	//collision checks if a is inside b, and returns true or false
	collision : function(a,b){

		var hitTest = a.objectHitTest({"object":b, "transparency":true});
		//TweenMax.to(paperObject,0,{rotation:0});

	  	//console.log("hitTestCenter --->"+hitTest);

	  	if(hitTest == true){

	  		SITE.binAnimate.shakeBin($("#binContainer"));
	  		TweenMax.to(paperObject, 0.1, {opacity:0});
	  		TweenMax.to(shadowObject, 0.1, {opacity:0});

	  		//score
	  		SITE.score.scoreHighlight();
	  		SITE.score.message();
	  		scored = true;

	  	}
	  	else {
	  		collisionTimerCenter = setTimeout(function(){
				SITE.collision(paperObject,$("#binRectBot"));
			},10)
	  	}
	},

	collisionLeft : function (a,b){

		var hitTest = a.objectHitTest({"object":b, "transparency":true});
		if(hitTest == true){

			var randomLeft = Math.floor(Math.random() * 270);

	  		//console.log("hitLeft")
	  		TweenLite.killTweensOf(paperObject);
	  		TweenLite.killTweensOf(shadowObject);
			TweenMax.to(paperObject,1,{top:$("#bin").position().top + 250, left:randomLeft, rotation:360, opacity:0});
			TweenMax.to(shadowObject,0.5,{top:$("#binContainer").position().top + 60, left:randomLeft, opacity:0});
			//SITE.binAnimate.moveBin();
	  	}
	  	else {
	  		collisionTimerLeft = setTimeout(function(){
				SITE.collisionLeft(paperObject,$("#binRectLeft"));
			},10)
	  	}
	},
	collisionRight : function (a,b){

		var hitTest = a.objectHitTest({"object":b, "transparency":true});
		if(hitTest == true){

	  		//console.log("hitRight");
	  		var randomRight = Math.floor(Math.random() * 270);

	  		TweenLite.killTweensOf(paperObject);
	  		TweenLite.killTweensOf(shadowObject);
			TweenMax.to(paperObject,1,{top:$("#bin").position().top + 250, left:randomRight , rotation:360, opacity:0});
			TweenMax.to(shadowObject,0.5,{top:$("#binContainer").position().top + 60, left:randomRight, opacity:0});
			//SITE.binAnimate.moveBin();
	  	}
	  	else {
	  		collisionTimerRight = setTimeout(function(){
				SITE.collisionRight(paperObject,$("#binRectRight"));
			},10)
	  	}
	},
	
	//timer functions
	timer : function(){
		$("#timer span").html(timeRemaining);
		timeRemaining--;

		if(timeRemaining >= 0){
			//setTimeout(function(){SITE.timer();},1000);
			TweenMax.to($("body"),1,{onComplete:SITE.timer});
		}
			
		else {
			SITE.gameover();
		}
	},

	gameover: function(){

		var finalScore = 0;

		if(score <= 9) {

			finalScore = "0" + score;

		}
		else {
			finalScore = score;
		}

		$(".timeUp span").html(finalScore);
		TweenMax.to($(".timeUp"), 1, {opacity:1});
		canSwipe = false;
		setTimeout(function(){SITE.frameMovement.endFrame()},2000);
		//setTimeout(function(){SITE.init();},1000)

		$(".instructions").unbind('touchstart click');
		$(".videoExit").unbind('touchstart click');
		$("#timeoutFrame").unbind('touchstart click');
		$("#video").unbind("ended");
	},

	reset : function(){

		if(timeRemaining <= 0 ){
			canSwipe = false;
			finalBall = false;
		}
		else {
			console.log("else");
			canSwipe = true;
			if(scored == false && hasReset == false){
				SITE.score.messageMiss();
			}
			hasReset = false;
			scored = false;
			//set the paperObject to the index of the ball you are throwing (different color balls)
			paperObject.css('zIndex', 1);
			paperObject = $("#paper"+whichBall);
			shadowObject = $(".ballShadow"+whichBall);
			paperObject.css('zIndex', 2);
			//reset position an opacity of ball
			TweenMax.to(paperObject, 0, {left:paperX,top:paperY,scaleX:1, scaleY:1, rotation:0, width: 55, height: 60, opacity:1});
			TweenMax.to(shadowObject, 0, {left:shadowX,top:shadowY,scaleX:1,scaleY:1, rotation:0, width: 55, height: 60, opacity:1});

			SITE.binIndex(1);
			
			clearTimeout(collisionTimerCenter);
			clearTimeout(collisionTimerLeft);
			clearTimeout(collisionTimerRight);

			SITE.binAnimate.moveBin();
		}	
	},

	score : {

		scoreHighlight : function (){

			if(timeRemaining >= 6) {
				$(".plusOne p").html("+1");
			}
			else {
				$(".plusOne p").html("+2");
			}

			TweenMax.to($('.plusOne'), 0, {opacity:0,left:$("#binContainer").position().left + 25, top:$("#binContainer").position().top - 25,scaleY:1,scaleX:1});
			TweenMax.to($('.plusOne'), 0.2, {opacity:1,delay:0.1});
			TweenMax.to($('.plusOne'), 1, {left:75, top:3, delay:0.3, scaleY:0.6,scaleX:0.6, opacity:0})
			setTimeout(function(){SITE.score.updatedScore();},1000);

		},
		updatedScore : function (){
 
			var newScore;

			if(timeRemaining >= 1) {
				score++
	  			
			}
			else {
				score++
				score++
			}

			if(score <= 9) {

			newScore = "0" + score;

			}
			else {
				newScore = score;		
			}

			$("#score span").html(newScore);

		},
		message : function () {

			var messageNumber = Math.round(Math.random() * 3) + 0;
			TweenMax.to($(".message"+messageNumber), 0.5, {opacity:1});
			TweenMax.to($(".message"+messageNumber), 0.5, {opacity:0, delay:0.7});

		},

		messageMiss : function () {
			if( !scored == true){

				var messageNumber = Math.floor((Math.random() * 3) + 3);
				console.log(messageNumber)
				TweenMax.to($(".message"+messageNumber), 0.5, {opacity:1});
				TweenMax.to($(".message"+messageNumber), 0.5, {opacity:0, delay:0.7});

			}
		}
	},

	binAnimate : {

		moveBin : function(){

		//get a random number between 
		var moveBin = Math.floor(Math.random() * 270);
		TweenMax.to($("#binContainer"), 1, {left:moveBin});


		},

		shakeBin : function (item){

			  TweenMax.to(item, 0.1, {left:$("#binContainer").position().left + 10, repeat:4, yoyo:true,ease:Linear.easeNone});
			  setTimeout(function(){onComplete:SITE.binAnimate.moveBin()},500);
		}

	},

	binIndex : function(whatIndex){

		$("#bin").css('zIndex', whatIndex);

	}
}

SITE.init();
