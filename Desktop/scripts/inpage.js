
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
var minTime = 0;
var newScore = 0;
var secondTime = false;

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
		newScore = 0;
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
		$("#timer span").html(+timeRemaining);

		// set position of paper
		paperX = "400px";
		paperY = "440px";

		//set poition of shadow
		shadowX = "400px";
		shadowY = "475px";

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

		TweenMax.to(paperObject, 0, {left:paperX,top:paperY,scaleX:1, scaleY:1, rotation:0, width: 65, height: 60, opacity:1});
		TweenMax.to(shadowObject, 0, {left:shadowX,top:shadowY,scaleX:1,scaleY:1, rotation:0, width: 65, height: 60, opacity:1});

		//setting the collision hitbox on the stage
		var rectangleBottom = $('#binRect').getRe

		$(".instructions").css({"zIndex":"4"});

		$(".instructions").bind('touchstart click', function(){
			this.style.opacity = 0;
			this.style.zIndex = 0;
			SITE.startgame();
		});

		$(".playAgain").bind('touchstart click', function(){
			SITE.frameMovement.replayGame();
		});

		$(".playGame").bind('touchstart click', function(){
			SITE.frameMovement.timeOutPlay();
		});


		$("#gameExit").bind('touchstart click', function(){
			alert("exit");
		});

		$(".endFrameExit").bind('touchstart click', function(){
			alert("exit");
		});

		$(".legalsBtn").bind('touchstart click', function(){
			console.log("wtf");
			SITE.legals.open();

		});

		$(".legals").bind('touchstart click', function(){
			SITE.legals.close();
		});

		document.ontouchstart = function(e){ 
    		e.preventDefault(); 
		}

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

	eventHandlers : {

		introHandler : function() {

			SITE.frameMovement.startFrame();
			clearTimeout(timeoutFrame);
			video.pause();
			videoPlaying = false;
			gifNumber = 100;
		}
	},

	frameMovement : {

		animteGif : function () {
			
			if(gifNumber == 65){
				TweenMax.to($(".playButton"), 0.6, {opacity:1});
			}
			if(gifNumber < 87){

				gifNumber ++
				var gifNumber1 = gifNumber + 1;

				$(".idris"+gifNumber).css({"opacity":"1"});
				$(".idris"+gifNumber1).css({"opacity":"1"});
				
				setTimeout(function(){SITE.frameMovement.animteGif();},70);
			}
			else if (gifNumber == 100){
			}
			else {
				timeoutFrame = setTimeout(function(){SITE.frameMovement.timeoutFrameAnimate();},7500);
				TweenMax.to($("#idris"), 1, {opacity:0});
				TweenMax.to($(".forgetText"), 1, {opacity:1,delay:1});
				TweenMax.to($(".smartSeries"), 1, {opacity:1,delay:3});
				TweenMax.to($(".skyBox"), 1, {opacity:1,delay:4});
			}
		},

		startFrame : function(){

			TweenMax.to($("#startFrame"), 1, {left:-300});
			TweenMax.to($("#content_dc"), 1, {left:0});
			TweenMax.to($("#startFrame"), 0, {left:299,delay:1});

		},

		endFrame : function (){
			TweenMax.to($(".text1"), 0, {opacity:1});
			TweenMax.to($(".text2"), 0, {opacity:0});
			TweenMax.to($(".text1"), 1, {opacity:0,delay:5});
			TweenMax.to($(".text2"), 1, {opacity:1,delay:6});
			TweenMax.to($("#content_dc"), 1, {left:-300});
			TweenMax.to($("#endFrame"), 1, {left:0});
		},

		timeOutPlay : function (){

			TweenMax.to($("#timeoutFrame"), 1, {left:-300});
			TweenMax.to($("#content_dc"), 1, {left:0});

		},

		replayGame : function () {
			$(".findOutMore").unbind('touchstart click');
			$(".playAgain").unbind('touchstart click');
			$(".endFrameExit").unbind('touchstart click');
			$(".legalsBtn").unbind('touchstart click');
			$(".legals").unbind('touchstart click');
			TweenMax.to($("#endFrame"), 1, {left:899});
			TweenMax.to($("#content_dc"), 1, {left:0});
			timeRemaining = 2;
			secondTime = true;
			SITE.init();
		},

		timeoutFrameAnimate : function (){ 
			TweenMax.to($("#startFrame"), 1, {left:-300});
			TweenMax.to($("#timeoutFrame"), 1, {left:0});
		}
	},

	startgame : function(){

		$("#binContainer").css({opacity:1});
		hasReset = true;
		//reset the position of the bin + balls
		SITE.reset();
		//start animation of the direction scrubber
		SITE.binAnimate.moveBin();
		//SITE.animate.direction();
		//timer
		SITE.timer();
		//set the swipe function, this will enable swiping up and the user needs to swipe 20px in order for this to fire.
		$(function() {      
	      $(".hitArea").swipe({
			swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {				
				SITE.swiped(this, event);				
			},
			swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {				
				SITE.swiped(this, event);
			},			
	        swipeUp:function(event, direction, distance, duration, fingerCount, fingerData) {				
				SITE.swiped(this, event)
	        },
	         threshold:20
	      });
	    
		
		});
	},
	swiped:function(_this, _event){
	         if (canSwipe == true){

	         	if (isMobile == false) {
	         		//desktop					
	         		var parentOffset = $(_this).parent().offset();					
					var relX = _event.clientX - parentOffset.left;							
				 	SITE.animate.ball(relX);
	         	}
	         	else {
	         		//mobile
	         		var parentOffset = $(_this).parent().offset();
					console.log(parentOffset);
					var relX = _event.changedTouches[0].pageX - parentOffset.left;
				 	SITE.animate.ball(relX);

	         	}
			  canSwipe = false;
	         }	
	},

	animate: {

		ball : function(relX){
			console.log(relX);
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
			TweenMax.to(paperObject,1,{top:$("#bin").position().top + 280, left:randomLeft, rotation:360, opacity:0});
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
			TweenMax.to(paperObject,1,{top:$("#bin").position().top + 280, left:randomRight , rotation:360, opacity:0});
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
		//console.log("timeRemaining-->"+timeRemaining);
		timeRemaining--;

		if(timeRemaining >= minTime){
			setTimeout(function(){SITE.timer();},1000);
			//TweenMax.to($("body"),1,{onComplete:SITE.timer});
		}
		else {
			SITE.gameover();
		}
	},

	gameover: function(){
		canSwipe = false;
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
		$("#startFrame").unbind('touchstart click', SITE.eventHandlers.introHandler);
		$(".videoExit").unbind('touchstart click', SITE.eventHandlers.introHandler);
		$("#timeoutFrame").unbind('touchstart click');
		$("#video").unbind("ended");
		$("#gameExit").unbind('touchstart click');
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
			TweenMax.to(paperObject, 0, {left:paperX,top:paperY,scaleX:1, scaleY:1, rotation:0, width: 65, height: 60, opacity:1});
			TweenMax.to(shadowObject, 0, {left:shadowX,top:shadowY,scaleX:1,scaleY:1, rotation:0, width: 65, height: 60, opacity:1});

			SITE.binIndex(1);
			
			clearTimeout(collisionTimerCenter);
			clearTimeout(collisionTimerLeft);
			clearTimeout(collisionTimerRight);

			SITE.binAnimate.moveBin();
		}	
	},

	score : {

		scoreHighlight : function (){

			$(".plusOne p").html("+1");

			TweenMax.to($('.plusOne'), 0, {opacity:0,left:$("#binContainer").position().left + 25, top:$("#binContainer").position().top - 25,scaleY:1,scaleX:1});
			TweenMax.to($('.plusOne'), 0.2, {opacity:1,delay:0.1});
			TweenMax.to($('.plusOne'), 1, {left:75, top:3, delay:0.3, scaleY:0.6,scaleX:0.6, opacity:0})
			setTimeout(function(){SITE.score.updatedScore();},1000);

		},
		updatedScore : function (){

			score++

			if(score <= 9) {

			newScore = "0" + score;

			}
			else {
				newScore = score;		
			}

			if(timeRemaining <= 0){
				
			}
			else{
				$("#score span").html(newScore);
			}

		},
		message : function () {
			if(timeRemaining <= 0){
				
			}
			else{
				var messageNumber = Math.round(Math.random() * 2) + 0;
				TweenMax.to($(".message"+messageNumber), 0.5, {opacity:1});
				TweenMax.to($(".message"+messageNumber), 0.5, {opacity:0, delay:0.7});
			}
		},

		messageMiss : function () {

			if(timeRemaining <= 0){
				
			}
			else{

				if( !scored == true){

					var messageNumber = Math.floor((Math.random() * 3) + 3);
					console.log(messageNumber)
					TweenMax.to($(".message"+messageNumber), 0.5, {opacity:1});
					TweenMax.to($(".message"+messageNumber), 0.5, {opacity:0, delay:0.7});

				}
			}
		}
	},

	legals : {

		open : function (){

			TweenMax.to($(".legals"),0.5,{top:291});
			console.log("open");
		}, 

		close : function () {

			TweenMax.to($(".legals"),0.5,{top:600});
			console.log("open");
		}

	},

	binAnimate : {

		moveBin : function(){

		//get a random number between 
		var moveBin = Math.floor(Math.random() * 850);
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

