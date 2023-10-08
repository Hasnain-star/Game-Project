/*
The Game Project part 7 - The Final
By Hasnain Ahmed 
Game Title = The Orchard

*/
// declaring variables list
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isFound;
var gameChar_x;
var gameChar_y;
var floorPos_y;
var canyons;
var trees_x;
var treesPos_y;
var clouds;
var mountains;
var cameraPosX;
var collectables;
var game_score;
var flagpole;
var lives;
var jumpSound;
var BGM;
var fallSound;
var victorySound;
var crunchSound;
var img;
var garry;
var enemies;
var hissingSound;


function preload()
 {
     soundFormats('mp3','wav');
    
     //load your sounds here
     jumpSound  = loadSound('assets/Jump.wav');
     jumpSound.setVolume(0.1);
	 
	 fallSound = loadSound('assets/falling2.wav');
     fallSound.setVolume(0.1);
	 fallSound.rate(2);
	 
	 
	 BGM = loadSound('assets/BGMusic.wav')
	 BGM.setVolume(0.3);
	  
	 victorySound = loadSound('assets/victory.wav');
     victorySound.setVolume(0.4);
	 
	 crunchSound= loadSound('assets/Crunch.wav');
     crunchSound.setVolume(0.4);
	 crunchSound.rate(2.5);
	 
	 hissingSound = loadSound('assets/hissing.mp3');
	 hissingSound.setVolume(8);
	 hissingSound.rate(4);	 

	 
	 //loading images 
	 img = loadImage('assets/water2.jpg');
	 garry = loadImage('assets/garry.png');

	 
 }


function setup()
{
	
	//initalisation objects 
	BGM.loop();
	createCanvas(1500, 576);
	floorPos_y = height * 3/4;
	lives = 3;
	startGame();

	
}

function draw()
{
	
	// to make the bg move with the char 
	cameraPosX = gameChar_x - width/2;
	
	///////////DRAWING CODE//////////

	background(135,206,235); //fill bg with the sky blue
	

	//here comes the sun!
	textSize(150);
	text("☀️",200,height/5);
	
	//game character Score
	fill(0);
	noStroke();
	textSize(20);
	text("🧺Score: " + game_score, 20,20);
	
	// calling lives token loop
	livestoken();
	
	//draw some green grass
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
	
    // drawing some ground
	fill(160,82,45);
	rect(0, floorPos_y + 50, width, height - floorPos_y - 50)
	
	
	//for the bg move start and stop push and pop
	push();
	translate(-cameraPosX,0);
	
	// draw mountains & loop 
	  drawMountains();
	
	//draw trees & loop 
		drawTrees();
		
	//draw clouds & loop
		drawClouds();

	
	//draw platform & loop
	for ( var i = 0; i < platforms.length; i++)
	{
		platforms[i].draw();
	}
	

	//collectable token - eg. a jewel, fruit, coins
	for ( var i = 0; i < collectables.length; i++)
	{
		
		if(collectables[i].isFound == false){
			
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
			
			
			
			console.log("collectables" + i);
			
			
	}	
	}
	
	//draw the canyon
	for(var i = 0; i< canyons.length; i++)
	{
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i])
		console.log("canyons loop" + i);
	}
	
// lives counter loop 
function livestoken(){	
	for (var i = 0; i < lives; i++)
	{
	 	noStroke();
		fill(255,0,0);
		text('❤',20 + [i] * 20,50);
		console.log("lives loop"+[i]);
	}
	
}
	
	
// RENDER FLAG POLE
	renderFlagpole();
	 	
	
// DRAW GAME CHAR 
	drawGameChar();
	
//CHECK IF PLATER DIED
	checkPlayerDie();	
	
//enemies loop that decrease lives if you colide with them and resets the loop back to the start	
for(var i = 0; i < enemies.length; i++)
	{
		enemies[i].update();
		enemies[i].draw();
		
		var isContact = enemies[i].checkContact(gameChar_x,gameChar_y);
		
		if(isContact == true)
		{ 
			hissingSound.play();
			if(lives -= 1)
			{
				startGame();
				break;
			}
		}
	}
	pop();


// code to display text after losing 
if (lives < 1)
{
	fill(255,0,0);
	text("GAME 💔 OVER!",width/2,height/2)
	textSize(80);
	text("💬", gameChar_x + 5, floorPos_y - 63);
	fill(0);
	textSize(12);
	text("I hate you!", gameChar_x + 33, floorPos_y - 87);  
	keyPressed = false;
	textSize(10);
	text("💧", gameChar_x + 5,floorPos_y - 53);
	return;
} 
	
// detect if char reached flagpole display winning text
if (flagpole.isReached == false)
	{
		checkFlagpole();
	}
	else if (flagpole.isReached == true)
{
	fill(0,255,0);
	text("Level complete. Press space to continue.", width/2,height/2);
	return;
}
	
///////////INTERACTION CODE//////////
//Put conditional statements to move the game character below here
	
if(isPlummeting == false)
	{
	//speed of movement for game char left or right	
	if(isLeft == true)
	{
		gameChar_x -= 5;
	}
	if(isRight == true)
	{
		gameChar_x += 5;
	}
	//checking contact with the platform and landing on it
	if(gameChar_y < floorPos_y)
	{
		var isContact = false;
		for(var i = 0; i< platforms.length; i++)
		{
			if(platforms[i].checkContact(gameChar_x, gameChar_y)== true)
			{
				isContact = true;
				break;
			}
		}
		
		if(isContact == false)
		{
			gameChar_y += 5;
			isFalling = true;
			
		}
	
	}
	else 
	{
		isFalling = false; 
		
	}
	}
	
else
{
	isPlummeting = true;
	
}
	
 
}
	
function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
	//to make char move to the right
	if(keyCode == 68)
	{
		console.log("a");
		isRight = true;
	}	
	//to make char move to the left
	else if ( keyCode == 65)
	{
		console.log("d");
		isLeft = true;
	}
	//to make char jump
	if(isFalling==false)
	{
		if(keyCode == 32)
		{
			gameChar_y -= 120;
			jumpSound.play();
		}
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
	
	if(keyCode == 68)
	{
		console.log("a");
		isRight = false;
		
	}
	//for when you release the left key to stop char 
	else if ( keyCode == 65)
	{
		console.log("d");
		isLeft = false;
	}

}

function drawGameChar()
	{
	// add your jumping-left code
		noStroke();
	if(isLeft && isFalling)
	{
	// head
	fill(255,153,51);
    ellipse(gameChar_x ,gameChar_y - 60, 25, 30); 
	
	// starw hat
	fill(218,165,32);
	ellipse(gameChar_x ,gameChar_y - 90, 20, 20);
		
	fill(255,69,0 );
	rect(gameChar_x - 15,gameChar_y - 90, 30, 10)
    
    // 3d eyes left
    fill(0);
	textSize(20);
	text("👀",gameChar_x - 15,gameChar_y -62);
    
	// mouth
    fill(255,255,255);
    rect(gameChar_x - 15, gameChar_y -55,8,5,10);
    
	//right leg
    fill(0);
    rect(gameChar_x - 5, gameChar_y - 20,10,18,5); 
    
	// body
    fill(0,240,0);
    rect(gameChar_x - 10,gameChar_y - 45,20,30,2); 
		
    // right arm
    fill(255,153,51);
    rect(gameChar_x - 25 ,gameChar_y - 45,30,10,10);
    
}
	// add your jumping-right code
	else if(isRight && isFalling)
	{
	
	// head
	fill(255,153,51);
    ellipse(gameChar_x ,gameChar_y - 60, 25, 30); 
	
	// starw hat
	fill(218,165,32);
	ellipse(gameChar_x ,gameChar_y - 90, 20, 20);
		
	fill(255,69,0 );
	rect(gameChar_x - 15,gameChar_y - 90, 30, 10)
    
	// 3d eyes right
    fill(255);
	ellipse(gameChar_x + 8,gameChar_y -65,13,17);
	fill(0);
    ellipse(gameChar_x + 10,gameChar_y -65,6,7);
	fill(255);
	ellipse(gameChar_x + 3,gameChar_y -65,13,17);
	fill(0);
    ellipse(gameChar_x + 4,gameChar_y -65,6,7);
    
	// mouth
    fill(255,255,255);
    rect(gameChar_x + 5, gameChar_y -55,8,5,10);
		 
	//right leg
    fill(0);
    rect(gameChar_x - 5, gameChar_y - 20,10,18,5);
    
	// body
    fill(0,240,0);
    rect(gameChar_x - 10,gameChar_y - 45,20,30,2); 
    
	// right arm
    fill(255,153,51);
    rect(gameChar_x - 5 ,gameChar_y - 45,30,10,10);
    


	}
	// add your walking left code
	else if(isLeft)
	{
	// head
	fill(255,153,51);
    ellipse(gameChar_x ,gameChar_y - 60, 25, 30); 
		
	// starw hat
	fill(218,165,32);
	ellipse(gameChar_x ,gameChar_y - 80, 20, 20);
	fill(255,69,0 );
	rect(gameChar_x - 15,gameChar_y - 80, 30, 10)	
    
	// 3d eyes left
	textSize(15);
	text("👀",gameChar_x - 15,gameChar_y -62);
    
	// mouth
    fill(255,255,255);
    rect(gameChar_x - 15, gameChar_y -55,8,5,10);
    
	//left leg
    fill(0);
    rect(gameChar_x - 11, gameChar_y - 20,10,20); 
    
	//right leg
    fill(0);
    rect(gameChar_x - 2, gameChar_y - 20,10,25); 
    
	// body
    fill(0,240,0);
    rect(gameChar_x - 10,gameChar_y - 45,20,30,2); 
    
	// right arm
    fill(255,153,51);
    rect(gameChar_x - 8,gameChar_y - 45,10,30,10);
    


	}
	// add your walking right code
	else if(isRight)
	{
	// head
	fill(255,153,51);
    ellipse(gameChar_x ,gameChar_y - 60, 25, 30); 
    
	// starw hat
	fill(218,165,32);
	ellipse(gameChar_x ,gameChar_y - 80, 20, 20);
	fill(255,69,0 );
	rect(gameChar_x - 15,gameChar_y - 80, 30, 10)	
    
	// 3d eyes right
	fill(255);
	ellipse(gameChar_x + 8,gameChar_y -65,10,13);
	fill(0);
    ellipse(gameChar_x + 10,gameChar_y -65,4,7);
	fill(255);
	ellipse(gameChar_x + 3,gameChar_y -65,10,13);
	fill(0);
    ellipse(gameChar_x + 4,gameChar_y -65,4,7);
	
	// mouth	
    fill(255,255,255);
    rect(gameChar_x + 5, gameChar_y -55,8,5,10);
		
    //left leg
    fill(0);
    rect(gameChar_x -10, gameChar_y - 20,10,25); 
	
	//right leg	
    fill(0);
    rect(gameChar_x - 1, gameChar_y - 20,10,20); 
		
    // body
    fill(0,240,0);
    rect(gameChar_x - 10,gameChar_y - 45,20,30,2); 
    
	// left arm
    fill(255,153,51);
    rect(gameChar_x - 2,gameChar_y - 45,10,30,10);
    

	}
	// add your jumping facing forwards code
	else if(isFalling || isPlummeting)
	{
	// head
	fill(255,153,51);
    ellipse(gameChar_x ,gameChar_y - 60, 30, 30); 
	
	// starw hat
	fill(218,165,32);
	ellipse(gameChar_x ,gameChar_y - 90, 30, 30);
	fill(255,69,0 );
	rect(gameChar_x - 20,gameChar_y - 90, 40, 10)
	
	// left eye	
	textSize(20);
	text("👁️",gameChar_x + 2,gameChar_y -62);
    // right eye
	textSize(20);
	text("👁️",gameChar_x - 17,gameChar_y -62);
    
	// mouth	
    fill(255,255,255);
    rect(gameChar_x - 5, gameChar_y -55,10,25,15);
    
	// right arm
    fill(255,153,51);
    rect(gameChar_x + 10 ,gameChar_y - 45,30,10,10);
    
	// left arm
    fill(255,153,51);
    rect(gameChar_x - 38 ,gameChar_y - 45,30,10,10);
    
	//left leg
    fill(0);
    rect(gameChar_x -15, gameChar_y - 20,10,18,5); 
    
	//right leg
    fill(0);
    rect(gameChar_x + 5, gameChar_y - 20,10,18,5); 
    
	// body
    fill(0,240,0);
    rect(gameChar_x - 15,gameChar_y - 45,30,30,2); 
    
	//emblem heart 
    fill(255,0,0);
	textSize(20);
    text("❤",gameChar_x - 8, gameChar_y - 25);
    
    

	}
	// add your standing front facing code
	else
	{
	// head
	fill(255,153,51);
    ellipse(gameChar_x ,gameChar_y - 60, 35, 35);
	
	// starw hat
	fill(218,165,32);
	ellipse(gameChar_x ,gameChar_y - 80, 30, 30);
	fill(255,69,0 );
	rect(gameChar_x - 20,gameChar_y - 80, 40, 10)
   
	// left eye
    fill(0);
	textSize(12);
	text("👁️",gameChar_x - 2,gameChar_y -62);
    
	// right eye
    fill(0);
	text("👁️",gameChar_x - 15,gameChar_y -62);
		
    // mouth
    fill(255,255,255);
    rect(gameChar_x - 5, gameChar_y -55,10,5,10);
    
	// right arm
    fill(255,153,51);
    rect(gameChar_x + 10 ,gameChar_y - 45,15,30,10);
    
	// left arm
    fill(255,153,51);
    rect(gameChar_x - 25 ,gameChar_y - 45,15,30,10);
    
	//left leg	
    fill(0);
    rect(gameChar_x -15, gameChar_y - 20,10,25); 
    
	//right leg	
    fill(0);
    rect(gameChar_x + 5, gameChar_y - 20,10,25); 
    
	// body	
    fill(0,240,0);
    rect(gameChar_x - 15,gameChar_y - 45,30,30,2); 
    
	//emblem heart 
	textSize(15)
    fill(255,0,0);
    text("❤",gameChar_x - 8 , gameChar_y - 25);
    
	}
	}

	
function drawClouds(){
	for(var i = 0; i < clouds.length; i++)
	{
		console.log("clouds loop" + i);
		
		// CLOUD ANIMATION
		clouds[i].x_pos += 0.15;
		
    fill(245,245,245);
    ellipse(clouds[i].x_pos ,clouds[i].y_pos,clouds[i].size - 50);//main body
    ellipse(clouds[i].x_pos + 30,clouds[i].y_pos - 10,clouds[i].size + 5);//right up
    ellipse(clouds[i].x_pos,clouds[i].y_pos - 20,clouds[i].size);//center up
    ellipse(clouds[i].x_pos - 30,clouds[i].y_pos - 10,clouds[i].size);//left up
    ellipse(clouds[i].x_pos + 30,clouds[i].y_pos + 10,clouds[i].size);//right botton
    ellipse(clouds[i].x_pos,clouds[i].y_pos + 20,clouds[i].size);//center bottom
    ellipse(clouds[i].x_pos - 30,clouds[i].y_pos + 10,clouds[i].size);//left bttom
	}
}
function drawMountains()
{
	
	for(var i = 0; i < mountains.length; i++)
	{
		console.log("mountains loop" + i);

    fill(100,149,237);
    //mountain front
    triangle(mountains[i].x_pos + 130,mountains[i].y_pos ,mountains[i].x_pos - 100,mountains[i].y_pos + 334,mountains[i].x_pos + 450,mountains[i].y_pos + 330);
    //mountain back
    triangle(mountains[i].x_pos + 250,mountains[i].y_pos + 75,mountains[i].x_pos - 100,mountains[i].y_pos + 335,mountains[i].x_pos + 450,mountains[i].y_pos + 332);
	
		//snow start front
	//stroke(5);
	fill(255,250,250);
	triangle(mountains[i].x_pos + 130,mountains[i].y_pos ,mountains[i].x_pos ,mountains[i].y_pos + 190,mountains[i].x_pos + 190,mountains[i].y_pos + 190);
	
	//snow star back
	triangle(mountains[i].x_pos + 250,mountains[i].y_pos + 75,mountains[i].x_pos ,mountains[i].y_pos + 90,mountains[i].x_pos + 90,mountains[i].y_pos + 190);}
	
	
}

function drawTrees()
{
	
	for(var i = 0; i < trees_x.length; i++)
	{
		console.log("trees loop" + i);
		
	//tree
    noStroke();
    fill(102,51,0);
    rect(trees_x[i],treePos_y - 75,30,80);
    fill(0,155,0);
    ellipse(trees_x[i] + 15,treePos_y - 100,100,100);
    ellipse(trees_x[i] + 15,treePos_y - 150,40,40);
	
	//apples
	textSize(15)	
	text("🍎",trees_x[i] + 16,treePos_y - 100);
	text("🍎",trees_x[i] - 16,treePos_y - 100);
	text("🍎",trees_x[i],treePos_y - 70);
		
		
	// Adding some sunflowers
	textSize(30);
	text("🌻",trees_x[i] - 50, treePos_y);
	text("🌼",trees_x[i] + 50, treePos_y);
	text("🌷",trees_x[i] + 100, treePos_y);
	text("🌹",trees_x[i] + 130, treePos_y);
	text("🌱",trees_x[i] + 5, treePos_y);
		
	// owl
	textSize(40);
	text("🦉",488,floorPos_y - 173);

	}
	// apple picking basket
	textSize(40);
	text("🧺",770, floorPos_y);
	
	//random bunny 
	textSize(40);
	text("🐇",-500, floorPos_y);
	
	
	
}
function drawCollectable(t_collectable)
{	
	
	
	//apples coectable
	textSize(40)
    text("🍎",t_collectable.x_pos - 5,t_collectable.y_pos - 3);
	
	}


function drawCanyon(t_canyon)
{
	
	
    noStroke();
    fill(139,69,19); //brown 
    rect(t_canyon.x_pos ,floorPos_y,t_canyon.width, height + 15 - floorPos_y,5);
	
	//blue outlay for effect
	fill(135,206,235);
	rect(t_canyon.x_pos + 13 ,floorPos_y ,t_canyon.width - 25, height - 5 - floorPos_y,5);
	
	// wrong way text
	fill(0);
	textSize(15);
	text("your going the wrong way kid!,you made Gyarados angry!",-3000,height/3);
	fill(0);
	textSize(15);
	text("Exits, that way ➡️",-3020,height/2);
	fill(0);
	textSize(15);
	text("Also stop looking at the player ,its creepy",-3050,height/1.5);
	
	
	
	
	//some additional elements for game
	textSize(40);
	text("🦴",-2000,floorPos_y + 100);
	textSize(40);
	text("🐚",-400,floorPos_y + 90);
	textSize(40);
	text("🪱",1000,floorPos_y + 120);
	textSize(40);
	text("🐠",400,floorPos_y + 40);
	textSize(40);
	text("🦑",-980,floorPos_y + 40);
	
	//importing images for effect 
	image(garry,-3420,150,400,470);
	image(img,380,470,80,100);
	image(img,1510,470,60,100);
	image(img,2010,470,180,100);
	image(img,-1010,470,180,100);
	image(img,-1740,470,80,100);
	image(img,380,470,80,100);
	image(img,-3440,450,680,470);

}
function checkCollectable(t_collectable)
{
	
	if(dist(gameChar_x,gameChar_y,t_collectable.x_pos,t_collectable.y_pos) <= 50)
	{
		crunchSound.play();
		t_collectable.isFound = true;
		game_score += 1;
		
	}
	
}
function checkCanyon(t_canyon)
{
	if((gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos+t_canyon.width && gameChar_y >= floorPos_y))
	{
		fallSound.play();
		isPlummeting = true;
		isFalling = true;
		gameChar_y += 8;
		keyPressed == false;
		
	}
}

function renderFlagpole()
{
	push();
	strokeWeight(5);
	stroke(3);
	text("🕳️",flagpole.x_pos - 22,floorPos_y + 13);
	line(flagpole.x_pos, floorPos_y, 
	flagpole.x_pos, floorPos_y - 250);
	
	noStroke();
	
	if(flagpole.isReached) 
	{
		//flag goes up
		fill(0,255,0);
		ellipse(flagpole.x_pos, floorPos_y -260, 20);
		rect(flagpole.x_pos,floorPos_y -250,50,50);
		text("🎖️",flagpole.x_pos,floorPos_y - 210);
	}
	else 
	{
		//flag stays down
		fill(255,0,0);
		ellipse(flagpole.x_pos, floorPos_y -260, 20);
		rect(flagpole.x_pos,floorPos_y -50,50,50);
		
	}
	pop();
	
}
	//checking distance between gamechar and flagple
function checkFlagpole()
{
	
	var d = abs(gameChar_x - flagpole.x_pos);
	if(d < 15 )
		
	{   victorySound.play();
	    BGM.setVolume(0);
		flagpole.isReached = true;
		keyPressed = false;
		
	}
	
}
	//checking when our player bites the dust
function checkPlayerDie()
	{
	
	if(gameChar_y > canvas.height)
	{
		  if (lives > 0){
		lives -=1;
		startGame();
	}
	}
	
	}
	//creating interactive platforms 
function createPlatforms(x,y,length)
{
	var p = {
		x: x,
		y: y,
		length: length,
	 	draw: function(){
		fill(0,155,0);
			rect(this.x,this.y,this.length, 20);
			
		fill(160,82,45)
			rect(this.x,this.y + 8,this.length, 20);
		
		
	},
		checkContact: function(gc_x,gc_y)
		{
		
		if(gc_x > this.x && gc_x < this.x + this.length)
		{
			var d = this.y - gc_y;
			if( d >= 0 && d < 5)
			{
				isPlummeting = false;
				isFalling = false;
				return true;
				
			}
	
		}
			return false;
	}
		
	}
	return p;
}

	// enemy movement and draw fucntion 
function Enemy(x,y,range)
{ 
	this.x = x;
	this.y = y;
	this.range = range;
	
	this.currentX = x;
	this.inc = 1;
	
	this.update = function()
	{
		this.currentX += this.inc;
		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
			
		}
		else if(this.currentX < this.x)
		{
			this.inc = 1;
		}
		
		this.draw = function()
		{
			this.update();
			textSize(50);
		text("🐍",this.currentX,this.y);
		}
		
		this.checkContact = function(gc_x,gc_y)
		{
			var d = dist(gc_x,gc_y,this.currentX,this.y)
			{
				if(d <= 15)
				{
					return true;
				}
				return false;
			
			}
			
		}
		
	}
	
}
	

	// starts the game and loads these arrays and elements in a loop set above 
function startGame()
{
	//set values for gamechar in the game 
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	
	// boolen off so we can turn it on in the game as we please 
	isLeft = false;
 	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isFound = false;

	//canyons locational array
	canyons= [{x_pos:370,width:100},{x_pos:2000,width:200},{x_pos:1500,width:80},{x_pos:-1750,width:100},{x_pos:-1020,width:200},{x_pos:-3450,width: 700}];
	
	//trees locational array 
	trees_x = [100,500,900,1150, -700,- 200,-1380,1800,-2300,-2700,-1900];
    treePos_y = floorPos_y;
	
	// clouds locational array 
	clouds =[{x_pos: 200,y_pos: 100, size: 50
    },{x_pos: 500,y_pos: 120, size: 50
    },{x_pos: 800,y_pos: 80, size: 50}
	,{x_pos: -1500,y_pos: 60, size: 50
    },{x_pos: -200,y_pos: 55, size: 50
    },{x_pos: -500,y_pos: 70, size: 50
    },{x_pos: -800,y_pos: 50, size: 50}
	,{x_pos: 1000,y_pos: 35, size: 50
    },{x_pos: 1200,y_pos: 28, size: 50
    },{x_pos: 1500,y_pos: 66, size: 50},
	{x_pos: 2000,y_pos: 98, size: 50},
	{x_pos: -2000,y_pos: 27, size: 50}];
	
	//mountains locational array 
	mountains=[{x_pos: -100,y_pos: 100},
			  {x_pos: 600,y_pos: 100},
			  {x_pos: 800,y_pos: 100},
			  {x_pos: -430,y_pos: 100},
			  {x_pos: -730,y_pos: 100},
			  {x_pos: 1000,y_pos: 100},
			  {x_pos: 1300,y_pos: 100},
			  {x_pos: 1500,y_pos: 100},
			  {x_pos: -1500,y_pos: 100},
			  {x_pos: 2300,y_pos: 100},{x_pos: -2500,y_pos: 100},
			  {x_pos: -2300,y_pos: 100}];
	
	// camera movement set here default 
	cameraPosX = 0;
	
	//collectables locaional array 
	collectables=[{x_pos: 400, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: 800, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: -2000, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: 2050, y_pos: floorPos_y - 130,size:  35, isFound: false},
				{x_pos: 1300, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: 1200, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: 1700, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: -500, y_pos: floorPos_y- 110,size:  35, isFound: false},
				{x_pos: -650, y_pos:floorPos_y - 110 ,size:  35, isFound: false},
				{x_pos: -400, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: -1050, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: -1150, y_pos: floorPos_y - 110,size:  35, isFound: false},
				{x_pos: 1520, y_pos: floorPos_y - 130,size:  35, isFound: false},
				{x_pos: -300, y_pos: floorPos_y - 190,size:  35, isFound: false},
				{x_pos: 2150, y_pos: floorPos_y - 170,size:  35, isFound: false}];
	
	//default game score set here 
	game_score = 0;
	
	//flagpole locational array
	flagpole = {isReached: false, x_pos: 2500};
	
	
	// drawing enemies 
	enemies = [];
	//enemies locational function 
	enemies.push(new Enemy(100,floorPos_y,100));
	enemies.push(new Enemy(1300,floorPos_y,100));
	enemies.push(new Enemy(1700,floorPos_y,100));
	enemies.push(new Enemy(-1300,floorPos_y,100));
	enemies.push(new Enemy(-400,floorPos_y,100));
	enemies.push(new Enemy(-2050,floorPos_y,100));
	

	//creating platforms in the game
	platforms = [];
	//platforms loctional function 
	platforms.push(createPlatforms(2030,floorPos_y - 80,120));
	platforms.push(createPlatforms(-980,floorPos_y - 80,130));
	platforms.push(createPlatforms(1500,floorPos_y - 90,100));
	platforms.push(createPlatforms(-200,floorPos_y - 90,130));
	platforms.push(createPlatforms(-300,floorPos_y - 150,130));
	platforms.push(createPlatforms(2120,floorPos_y - 150,100));
	
	
	
		
}

