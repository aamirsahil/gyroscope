document.getElementById("left").href = "algebra.html";
document.getElementById("right").href = "graphic.html";

// *********************** PENDULUM PART************** //

gbv = [250,250,250];
function shw(i)
{   
    gbv = [50,50,50];
    gbv[i] =250;
}

explan = [0,0];
function xplain(i)
{
    explan = [0,0];
    explan[i] = 1;
    gbv = [250,250,250];

    const docx = document.documentElement;
    docx.style.setProperty('--exp0',explan[0]);
    docx.style.setProperty('--exp1',explan[1]);
}

function drawArrow(x1, x2,string) 
{   push();
    line(x1.x, x1.y, x2.x, x2.y); 
    var angle = atan2(x1.y - x2.y, x1.x - x2.x); 
    translate(x2.x, x2.y); 
    noStroke()
    text(string,10,10);
    rotate(angle-HALF_PI); 
    size =5
    triangle(-size/2, size, size/2, size, 0, -size/2); 
    pop();
}

xInit = 0;
yInit = 0;
thetaInit = 0;
r = 250;

dx = 0;
dy = 0;
dtheta = 0;
  
function draw()
{
  /***Create a canvas aka setup***/
  const wide = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const tall = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  p = wide*0.2;
  q = tall*0.6;
  var canvas =createCanvas(p,q);
  canvas.parent('section_1');
  frameRate(100);
  o = createVector(p/3,50);
  /***Usual Draw function***/
  thetaInit = atan(0.25);
  console.log(thetaInit);
  xInit = r*sin(thetaInit) + o.x;
  yInit = r*cos(thetaInit) + o.y;
  
  x = xInit + dx;
  y = yInit + dy;
  theta = thetaInit + dtheta;

  background(240,248,255);
  fill(150,150,200);
  drawingContext.setLineDash([2,2]);
  line(30,50,p-30,50);
 
//coordinate (gray)
  stroke(190,190,190);
  drawingContext.setLineDash([2,2]);
  line(o.x,o.y,o.x,yInit+30);
  drawingContext.setLineDash([0]);

// angle(orange)
  noFill();
  stroke(255,128,0);
  arc(o.x,o.y,50,50,PI/2-theta,PI/2);
  noStroke();
  fill(255,128,0);
  text('θ',o.x+2,o.y+60);  
// angle(orange)
noFill();
stroke(255,255,0);
arc(o.x,o.y,50,50,PI/2-theta,PI/2-thetaInit);
noStroke();
fill(255,128,0);
text('dθ',o.x+15,o.y+60);

// r(orange)
noFill();
stroke(255,255,0);
noStroke();
fill(255,128,0);
text('r',o.x+25,o.y+160);

//angular momentum xy(red)
  v1 = createVector(o.x,o.y);
  v2 = createVector(xInit,yInit);
  stroke (150,0,0,gbv[0]);
  fill(150,0,0,gbv[0])
  drawArrow(v1,v2,'l');

//angular momentum xy update(red)
v1 = createVector(o.x,o.y);
v2 = createVector(x,y);
stroke (150,0,0,gbv[0]);
fill(150,0,0,gbv[0])
drawArrow(v1,v2,'');

//delta angular momentum xy(red)
v1 = createVector(xInit,yInit);
v2 = createVector(x,y);
stroke (150,0,0,gbv[0]);
fill(150,0,0,gbv[0])
drawArrow(v1,v2,'dl');

//Torque(green) 
  v1 = createVector(x,y);
  w =3;
  v2 = createVector(x+w*15*cos(theta),y-w*15*sin(theta));
  stroke (0,150,0,gbv[2]);
  fill(0,150,0,gbv[2])
  drawArrow(v1,v2,'- av'); 

}

function timeChanger(value)
{
    dtheta = value*0.3;
    dr=2*r*Math.sin(dtheta/2);
    dx = dr*Math.cos(dtheta);
    dy = -dr*Math.sin(dtheta);
}