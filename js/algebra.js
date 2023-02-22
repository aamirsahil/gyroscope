
document.getElementById("left").href = "geometric_b.html";
document.getElementById("right").href = "algebra_b.html";

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

r = 200;

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
  o = createVector(p/10,50);
  base = {x:o.x, y:o.y+350}

  /***Usual Draw function***/  
  background(240,248,255);
  theta = atan(1);
  x = base.x + r*Math.sin(theta);
  y = base.y - r*Math.cos(theta);
	L = 80;
	Lz = L*Math.cos(theta)
	Lxy = L*Math.sin(theta)

  fill(150,150,200);
  stroke(100,100,100);
  line(base.x,base.y,x,y); 
  line(30,50,p-30,50);
  push()
  translate(x, y);
  rotate(-theta);
  ellipse(0,0,20,40);
	pop()
//coordinate (gray)
  stroke(190,190,190);
  drawingContext.setLineDash([2,2]);
  line(o.x,o.y,base.x,base.y);
  line(o.x,base.y,o.x+200,base.y);
  drawingContext.setLineDash([0]);

// angle(orange)
  noFill();
  stroke(255,128,0);
  arc(base.x,base.y,50,50,-PI/2,-(PI/2-theta));
  noStroke();
  fill(255,128,0);
  text('φ',base.x+5,base.y-15);   

// length(orange)
noFill();
fill(255,128,0);
text('r',o.x+50,y+40);  

//Gravity(red)
	v1 = createVector(x,y);
  v2 = createVector(x,y+q/5);
  stroke (150,0,0,gbv[0]);
  fill(150,0,0,gbv[0])
  drawArrow(v1,v2,'mg');

//Tension(red)
v1 = createVector(base.x,base.y);
v2 = createVector(base.x,y+q/5);
stroke (150,0,0,gbv[0]);
fill(150,0,0,gbv[0])
drawArrow(v1,v2,'T');

//Angular momentum(blu)
v1 = createVector(x,y);
  v2 = createVector(x+Lxy,y-Lz);
  stroke (0,0,150,gbv[1]);
  fill(0,0,150,gbv[1])
  drawArrow(v1,v2,'L');

//Angular momentum Z(blu)
v2 = createVector(x,y-Lz);
stroke (0,0,150,gbv[1]);
fill(0,0,150,gbv[1])
drawArrow(v1,v2,'Lz');

//Angular momentum XY(blu)
v2 = createVector(x+Lxy,y);
stroke (0,0,150,gbv[1]);
fill(0,0,150,gbv[1])
drawArrow(v1,v2,'l');

//Torque(green) 
  w =3;
  v2 = createVector(x+w*15*sin(theta),y-w*7*cos(theta));
  stroke (0,150,0,gbv[2]);
  fill(0,150,0,gbv[2])
  drawArrow(v1,v2,'mgr');
}