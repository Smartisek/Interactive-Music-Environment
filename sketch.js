
// Arrays
let balloons = [];
let rectangles = [];
let squares = [];

// Variables
let backgroundSizeX = 350;
let backgroundSizeY = 450;

let squaresYSpeed = 4;
let squaresXSpeed = 4;

let sliderBalloon;
let sliderSquare;
// color sliders 
let rslider;
let gslider;
let bslider; 
let pitchSlider;

// Sound variables
let piano1;
let piano2;
let guitar;
let kalimba;
let horn;
let fft;
let drake;
let cher;
let katy;
let weeknd;
let kanye;
// music array 
let songs = [];

// variable for songs array position
let position = 0;
var playPosition = 0;


// image variables
let playImage;
let nextImage;
let previousImage;

// Preloading sounds
function preload(){
  piano1 = loadSound("sounds/piano1.mp3");
  kalimba = loadSound("sounds/kalimba.mp3");
  piano2 = loadSound("sounds/piano2.mp3");
  guitar = loadSound("sounds/guitar.mp3");
  horn = loadSound("sounds/horn.mp3");
  playImage = loadImage("images/playButton.png");
  nextImage = loadImage("images/nextButton.png");
  previousImage = loadImage("images/previousButton.png");
  songs.push(loadSound("music/Drake - Laugh Now Cry Later (Official Music Video).mp3"));
  songs.push(loadSound("music/Cher - Believe [Official Music Video].mp3"));
  songs.push(loadSound("music/Katy Perry - California Gurls (Official Music Video) ft. Snoop Dogg.mp3"));
  songs.push(loadSound("music/The+Weeknd+-+The+Hills+(Official+Video).mp3"));
  songs.push(loadSound("music/Kanye West - Stronger.mp3"));
}

function setup() {
  createCanvas(1500, 800);

  // Adding circles to an array
  for(let i=0; i<10; i++){
    balloons[i] = new Balloon(random(280,550), random(380,520), random(15,30));
  }

  // Adding squares to an array
  for(let s=0; s<10; s++){
    squares[s] = new Square(random(780, 920), random(380,520), random(15,40));
  }

  fft = new p5.FFT(0, 2048);


  // Slider for balloons
  sliderBalloon = createSlider(0,10,2);
  sliderBalloon.position(270,700);
  sliderBalloon.style("width","200px");
  sliderBalloon.addClass("balloonSlider");
  // Slider for squares
  sliderSquare = createSlider(0,10,2);
  sliderSquare.position(730,700);
  sliderSquare.style("width", "200px");
  sliderSquare.addClass("squareSlider");
  // Slider for speed 
  rslider = createSlider(0,255,254,5);
  rslider.position(1050, 250);
  rslider.style('width', '300px');
  rslider.addClass("redSlider");
 
  gslider = createSlider(0,255, 182, 5);
  gslider.position(1050, 300);
  gslider.style('width', '300px');
  gslider.addClass("greenSlider");
  
  bslider = createSlider(0, 255, 193, 5);
  bslider.position(1050, 350);
  bslider.style('width', '300px');
  bslider.addClass("blueSlider");
  
  playImage = createImg("images/playButton.png");
  playImage.size(50,50);
  playImage.position(1175,450);
  playImage.mouseClicked(play);
  playImage.addClass("playImage");

  nextImage = createImg("images/nextButton.png");
  nextImage.size(50,50);
  nextImage.position(1250, 450);
  nextImage.mouseClicked(next);
  nextImage.addClass("nextImage");

  previousImage = createImg("images/previousButton.png");
  previousImage.size(50,50);
  previousImage.position(1100, 450);
  previousImage.mouseClicked(previous);
  previousImage.addClass("previousImage");


  pitchSlider = createSlider(0,100,50,10);
  pitchSlider.position(420, 200);
  pitchSlider.style("width", "350px");

}

function draw() {
  background("lightBlue");

// fft wave
var wave = fft.waveform();

  let r = rslider.value();
  let g = gslider.value();
  let b = bslider.value();

  // changing pitch of a song 
  let pitch = pitchSlider.value();
  let playbackRate = map(pitch, 0.1, 100, 2, 0);
  playbackRate = constrain(playbackRate, 0.01, 4);
  songs[position].rate(playbackRate);

//  Radio screens 
  fill(r, g, b);
  rect(200,250,backgroundSizeX,backgroundSizeY);
  fill(b,r,g);
  rect(650,250,backgroundSizeX,backgroundSizeY);
 
  
  // Getting value from slider balloon
  let sliderValueBalloon = sliderBalloon.value();
  // Getting value from slider square
  let sliderValueSquare = sliderSquare.value();
  
// Reference code: https://editor.p5js.org/jps723/sketches/H1ras5H2Z
// For checking balls with each other I used a code from person called jps723
  //Circle x Wall and Circle x Circle
  for(let m = 0; m < sliderValueBalloon; m++){
    balloons[m].show();
    balloons[m].move();
    balloons[m].collide();
    balloons[m].mouseInteraction();

      for(let j=0; j<sliderValueBalloon; j++){
        if(m != j && balloons[m].intersect(balloons[j])){
          balloons[m].changeDirection();
        }
      }
  }

  // Square x Wall and Square x Square
  for(let ss=0; ss<sliderValueSquare; ss++){
    squares[ss].show();
    squares[ss].move();
    squares[ss].collide();
    squares[ss].mouseInteraction();
      for(let u=0; u<sliderValueSquare; u++){
        if(ss != u && squares[ss].intersect(squares[u])){
          squares[u].changeDirection();
        }
      }
  }

    // Drawing radio
    // Anthena
push();
fill("grey");
strokeWeight(5);
stroke(0);
rect(1250, 10, 20, 180, 20);
pop();


push();  
fill(96, 130, 182);
stroke(0);
strokeWeight(5);
rect(100,170, 1300, 100,20);
rect(100,170,105,600,20);
rect(100,690, 1305, 95, 20);
rect(550, 250, 100, 470, 20);
strokeWeight(7);
rect(1000,170,405,615,20);
pop();

// radio handle
push();
fill("grey");
strokeWeight(5);
stroke(0);
rect(250,70, 60, 100);
rect(750,70, 60, 100);
rect(250, 13, 560, 60, 5);
noStroke();
fill("grey");
rect(253, 60, 54, 60);
rect(753, 60, 54, 60);
pop();

// Getting rid off borders not needed
fill(96, 130, 182);
rect(120, 173,100,94);
rect(102, 680, 100.5, 50);
rect(540, 217, 120, 50);
rect(540, 692.5, 120, 50);

// fft window 
push();
strokeWeight(5);
stroke(0);
fill(	230, 158, 143);
rect(1050, 550, 300,200, 20);
pop();

// play buttons rect
push();
strokeWeight(5);
stroke(0);
fill("grey");
rect(1080, 430, 240,100, 20);
pop();

// Time window
let h = hour();
let m = minute();
let s = second();
let ms = millis();

push();
strokeWeight(5);
stroke(0);
fill("black");
rect(1130, 190, 150,50, 20);
pop();

push();
textSize(30);
fill(b,g,r);
text(h, 1145, 225);
text(":", 1180, 225);
// text(m , 1190, 225);
text(":", 1225, 225);
text(s, 1235, 225);
if(m < 10){
  text("0",1190, 225);
  text(m , 1208, 225);
} else {
  text(m , 1190, 225);
}

pop();


// FFT drawing
push();
for(var k =0; k< wave.length; k++ ){
  var index = floor(map(k, 1052, 1348, 0, wave.length));
  var x = k;
  var y = wave[index] * 100 + height -150;
  stroke(95, 75, 139);
  strokeWeight(2);
  // point(x,y);
  line(k, 650, k, y);
  fill(0);
  stroke(0);
  ellipse(160,720, y /8, y/8);
}
pop();

if(playPosition === 2 ){
  playPosition =0;
}
}

function play(){
 if(playPosition === 0){
  songs[position].play();
  playPosition+=1;
 } else if(playPosition ===1){
  songs[position].pause();
  playPosition+=1;
 }
}


function next(){
  songs[position].stop();
  position+=1;
  songs[position].play();
  
  
}

function previous(){
  songs[position].stop();
  position-=1;
  songs[position].play();
}


// https://freesound.org/people/HugeKC/sounds/579219/
// https://www.youtube.com/watch?v=uk96O7N1Yo0
// https://www.youtube.com/watch?v=2O3nm0Nvbi4
// https://lovepik.com/download/detail/401549467?byso=&type=3
// https://www.youtube.com/watch?v=PsO6ZnUZI0g
// http://danielstern.ca/range.css/?ref=css-tricks#/
// https://classroomclipart.com/clipart-view/Clipart/Entertainment/portable-radio-clipart_jpg.htm
// https://freesound.org/people/cabled_mess/sounds/396119/
// 