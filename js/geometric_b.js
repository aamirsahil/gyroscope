

document.getElementById("left").href = "geometric_a.html";
document.getElementById("right").href = "algebra.html";

const el = document.getElementById("infor");
function remov() 
{
  
  el.innerHTML="";
}
function addRemoveObject(list,x1,parent){
	if(x1==0){
		for(let i=0; i<list.length; i++){
			parent.add(list[i]);
		}
	}
	else if(x1==1){
		for(let i=0; i<list.length; i++){
			parent.remove(list[i]);
		}
}
}

function timeChanger(value)
{
    timeScale =value*0.01;
}

Weight=["Weight",0]; AngMomentum=["AngMomentum",0]; ResolveMomentum=["ResolveMomentum",0]; Torque=["Torque",0];
weightSwitch =0; angMomentumSwitch=0; resolveMomentumSwitch=0; torqueSwitch=0;

info = "";

function mark(s)
{   
    if (s[0] =="Weight") 
    { 		
        addRemoveObject([weightVector],weightSwitch,pivot);
        weightSwitch = 1-weightSwitch;
    }
    if (s[0]=="AngMomentum") 
    { 
        el.innerHTML = '<text>angle is measured from the horizontel axis in anticlockwise direction. Our intution suggests that theta varies in a sinusoidal fashion. Look at the graph above..</text><button onclick="remov()">ok</button>';
        addRemoveObject([totalLVector],angMomentumSwitch,pivot);
        angMomentumSwitch = 1-angMomentumSwitch;
    }
    else if (s[0]=="ResolveMomentum") 
    { 
        el.innerHTML = '<text>angle is measured from the horizontel axis in anticlockwise direction. Our intution suggests that theta varies in a sinusoidal fashion. Look at the graph above..</text><button onclick="remov()">ok</button>';
        addRemoveObject([lXYVector,lZVector],resolveMomentumSwitch,pivot);
        resolveMomentumSwitch = 1-resolveMomentumSwitch;
    }
    else if (s[0]=="Torque") 
    {
        el.innerHTML = '<text>angle is measured from the horizontel axis in anticlockwise direction. Our intution suggests that theta varies in a sinusoidal fashion. Look at the graph above..</text><button onclick="remov()">ok</button>';
        addRemoveObject([torqueVector],torqueSwitch,pivot);
        torqueSwitch = 1-torqueSwitch;				
    }
}

//   three.js stuffs
// controls the angle indicator
function changeLine(data){
	let points = [];
	points.push(new THREE.Vector3(data.start[0], data.start[1], data.start[2]));
	points.push(new THREE.Vector3(data.end[0], data.end[1], data.end[2]));
	let geometry = new THREE.BufferGeometry().setFromPoints(points);
	return geometry;
}
function turnAngle(angle){
    let curve = new THREE.EllipseCurve(0, 0, // ax,ay
        0.05, 0.05, // xRadius, yRadius
        0, angle, //start angle, end angle
        true, // anti clockwise
        0); // rotaion
    let points = curve.getPoints(50);
    let geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
}
// changes the text
function changeText(data){
    geometry = new THREE.TextGeometry(data.text, {
                font:data.font, size:data.size, height:data.height, curveSegments:12,
        });
    return geometry;
}
// create the variable value indicator
function createText(textData){
    let textField = document.createElement("div");
    textField.innerHTML = textData.innerHtml;
    containerSide.appendChild(textField);
    return textField;
}
// create slider
function createSlider(sliderData){
    let slider = document.createElement("input");
    slider.type = "range";
    slider.min = sliderData.min;
    slider.max = sliderData.max;
    slider.step = sliderData.step;
    slider.value = sliderData.value;
    slider.style.width = sliderData.width;
    containerSide.appendChild(slider);
    return slider;
}
// create differnt three.js objects
function createObject(data){
    let geometry = null;
    let material = null;
    let object = null;
    let points = [];
    let curve = null;

    switch(data.type){
        case "Sphere":
        geometry = new THREE.SphereGeometry( data.dims[0], data.dims[1], data.dims[2] );
        material = new THREE.MeshBasicMaterial( data.material );
        object = new THREE.Mesh( geometry, material );
        break;
        case "Cylinder":
        geometry = new THREE.CylinderGeometry( data.dims[0], data.dims[1], data.dims[2], data.dims[3] );
        material = new THREE.MeshBasicMaterial( data.material );
        object = new THREE.Mesh( geometry, material );
        break;
        case "Line":
        points.push(new THREE.Vector3(data.start[0], data.start[1], data.start[2]));
        points.push(new THREE.Vector3(data.end[0], data.end[1], data.end[2]));
        geometry = new THREE.BufferGeometry().setFromPoints(points);
        material = new THREE.LineBasicMaterial(data.material);
        object = new THREE.Line( geometry, material );
        break;
        case "Angle":
        curve = new THREE.EllipseCurve(0, 0, // ax,ay
            0.05, 0.05, // xRadius, yRadius
            data.startAngle, data.endAngle, //start angle, end angle
            data.aClockwise, // anti clockwise
            0); // rotaion
        points = curve.getPoints(50);
        geometry = new THREE.BufferGeometry().setFromPoints(points);
        material = new THREE.LineBasicMaterial(data.material);
        object = new THREE.Line(geometry, material);
        break;
        case "Text":
            geometry = new THREE.TextGeometry(data.text, {
            font:data.font, size:data.size, height:data.height, curveSegments:12,
            });
            material = new THREE.MeshBasicMaterial(data.material);
            object = new THREE.Mesh(geometry, material);
        break;
        case "Vector":
        let dir = new THREE.Vector3( data.dir[0], data.dir[1], data.dir[2] );
        let origin = new THREE.Vector3( data.origin[0], data.origin[1], data.origin[2] );
        object = new THREE.ArrowHelper( dir, origin, data.length, data.color, headWidth=data.headWidth);
        break;
        case "Point":
        object = new THREE.Object3D();
        break;
    }
    object.position.x = data.position.x;object.position.y = data.position.y;object.position.z = data.position.z;
    object.rotation.x = data.rotation.x;object.rotation.y = data.rotation.y;object.rotation.z = data.rotation.z;
    return object;
}
let timeScale = 0.01 // second/udpation
let time = 0;
const g = 1;

let mass = 0.01; // kg
let diskRadius = 0.1;
let diskThickness = 0.005
let axleLength = 0.15;

let theta0 = 0;
let phi0 = Math.PI/6;
let omegaS = 2*Math.PI // rad/s
let theta = theta0;

let I0 = (mass*diskRadius**2)/2;
let omegaZ = axleLength*mass*g/I0/omegaS; // rad/s
let Ls = I0*omegaS;
let Lz = Ls*Math.cos(phi0);
let Lxy = Ls*Math.sin(phi0);
let torque =  mass*g*axleLength*Math.sin(phi0);

const containerSide = document.getElementById("section_1");
const container = document.getElementById("section_2");
const width = container.offsetWidth;
const height = container.offsetHeight;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );
renderer.setClearColor( 0xffffff );
container.appendChild( renderer.domElement );

const loader = new THREE.FontLoader();

const Camera1 = new THREE.PerspectiveCamera( 75, width / height , 0.1, 1000 );
const Camera2 = new THREE.PerspectiveCamera( 75, width / height / 2.5 , 0.1, 1000 );

let zoomValue1 = 3.5;
let zoomValue = 3;
Camera1.position.x = 0.01;
Camera1.position.y = 0.04;
Camera1.position.z = zoomValue1*axleLength;
Camera1.lookAt(0,0,0);

Camera2.position.x = 0
Camera2.position.y = zoomValue*axleLength;
Camera2.position.z = 0;
Camera2.lookAt(0,0,0);

let objectData = {}

objectData = {
    type:"Sphere",
    dims:[0.01,0.01,0.01],
    material:{color:0x00ff00},
    position:{x:0,y:0,z:0},
    rotation:{x:0,y:0,z:0},
}
let origin = createObject(objectData); 
scene.add( origin );

// Create the pivot
objectData = {
    type:"Point",
    position:{x:0,y:0,z:0},
    rotation:{x:0,y:theta0,z:-phi0},
}
let pivot = createObject(objectData);
scene.add( pivot );

// Create the rotating axle
objectData = {
    type:"Cylinder",
    dims:[0.005,0.005,axleLength,32],
    material:{color:0x000000},
    position:{x:0,y:axleLength/2,z:0},
    rotation:{x:0,y:0,z:0},
}
let idealAxle = createObject(objectData);

// Create the disk
objectData = {
    type:"Cylinder",
    dims:[diskRadius,diskRadius,diskThickness,32],
    material:{ color: 0x000000, transparent: true, opacity: 0.75 , wireframe: false},
    position:{x:0,y:axleLength+diskThickness/2,z:0},
    rotation:{x:0,y:0,z:0},
}
let idealDisk = createObject(objectData);

pivot.add(idealDisk);
pivot.add(idealAxle);

// axis
objectData = {
    type:"Line",
    material:{ color: 0x000000},
    start:[0,0,0],
    end:[10,0,0],
    position:{x:0,y:0,z:0},
    rotation:{x:0,y:0,z:0},
}      
const xAxis = createObject(objectData);
scene.add( xAxis );
objectData.end = [0, 10, 0];
const yAxis = createObject(objectData);
scene.add( yAxis );
objectData.end = [0, 0, 10];
const zAxis = createObject(objectData);
scene.add(zAxis);

// vector
let weightVectorLengthRatio = 0.1;
let torqueVectorLengthRatio = 0.01;
let angularMomentumVectorLengthRatio = 0.002;
objectData = {
    type:"Vector",
    color:0xff00ff,
    origin:[0,0,0],
    dir:[0,0,0],
    headWidth:0.03,
    length:mass*g/weightVectorLengthRatio,
    position:{x:0,y:axleLength+diskThickness/2,z:0},
    rotation:{x:0,y:0,z:Math.PI+phi0},
}
// weight
let weightVector = createObject(objectData);
// pivot.add( weightVector );
// L due to spin
objectData.length = Math.abs(Ls/angularMomentumVectorLengthRatio);
objectData.rotation = {x:0,y:0,z:0};
let totalLVector = createObject(objectData)
// pivot.add(totalLVector);
// L along z
objectData.length = Math.abs(Lz/angularMomentumVectorLengthRatio);
objectData.rotation = {x:0,y:0,z:phi0};
let lZVector = createObject(objectData)
// pivot.add(lZVector);
// L along xy
objectData.length = Math.abs(Lxy/angularMomentumVectorLengthRatio);
objectData.rotation = {x:0,y:0,z:-(Math.PI/2-phi0)};
let lXYVector = createObject(objectData)
// pivot.add(lXYVector);

// torqe
objectData.length = Math.abs(torque/torqueVectorLengthRatio);
objectData.rotation = {x:-Math.PI/2,y:0,z:0};
let torqueVector = createObject(objectData)
// pivot.add(torqueVector);

// angles
objectData = {
    type:"Angle",
    material:{ color: 0xff0000},
    startAngle:0,
    endAngle:-theta0,
    aClockwise:true,
    position:{x:0,y:0,z:0},
    rotation: {x:Math.PI/2, y:0, z:0},
}
let thetaEllipse = createObject(objectData);
scene.add(thetaEllipse);

objectData.endAngle = -phi0;
objectData.rotation = {x:0,y:0,z:Math.PI/2 + phi0}
let phiEllipse = createObject(objectData);
pivot.add(phiEllipse);

// // Add a slider to control the rotation of the cube
let sliders = [];

// phi slider
const phiText = document.getElementById("phiText");
const phiSlider = document.getElementById("phiSlider");
sliders.push({slider:phiSlider, text:phiText, id:"phi"});

// spin omega slider
const omegaSText = document.getElementById("omegaSText");
const omegaSSlider = document.getElementById("omegaSSlider");
sliders.push({slider:omegaSSlider, text:omegaSText, id:"omegaS"});

// mass slider
const massText = document.getElementById("massText");
const massSlider = document.getElementById("massSlider");
sliders.push({slider:massSlider, text:massText, id:"mass"});

// axle length slider
const axleLengthText = document.getElementById("lengthText");
const axleLengthSlider = document.getElementById("lengthSlider");
sliders.push({slider:axleLengthSlider, text:axleLengthText, id:"axleLength"});

// radius slider
const radiusText = document.getElementById("radiusText");
const radiusSlider = document.getElementById("radiusSlider");
sliders.push({slider:radiusSlider, text:radiusText, id:"radius"});

// runs every frame
var animate = function () {
    requestAnimationFrame( animate );

    time += timeScale;
    theta += omegaZ*timeScale;
    pivot.rotation.y += omegaZ*timeScale;
    idealDisk.rotation.y += omegaS*timeScale;

    thetaEllipse.geometry = turnAngle(-theta);

    // Render the scene from camera 1
    renderer.setViewport(0, 0, width, height);
    renderer.render( scene, Camera1 );

    // Render the scene from camera 2
    renderer.setScissorTest(true);
    renderer.setScissor(0, 0, width/5, height/2.5);
    renderer.setViewport(0, 0, width/5 , height/2.5);
    renderer.render( scene, Camera2 );
    renderer.setScissorTest(false);
};

animate();

// Listen to the input event on the slider
for(let i=0; i<sliders.length;i++){
sliders[i].slider.addEventListener("input", function(){
    switch(sliders[i].id){
    case "phi":
        sliders[i].text.innerHTML = this.value;
        phi0 = THREE.Math.degToRad(this.value);
        pivot.rotation.z = -phi0;
        phiEllipse.geometry = turnAngle(-phi0);

        weightVector.rotation.z = Math.PI+phi0;
        
        phiEllipse.rotation.z = Math.PI/2 + phi0;

        var lZrotation = 0
        var lXYrotation = 0
        if(phi0<Math.PI/2)
            lZrotation = phi0;
        else
            lZrotation = Math.PI+phi0;
        lXYrotation = -(Math.PI/2-phi0);
        Lz = Ls*Math.cos(phi0);
        Lxy = Ls*Math.sin(phi0);

        var data = {
            type:"Vector",
            color:0xff00ff,
            origin:[0,0,0],
            dir:[0,0,0],
            headWidth:0.03,
            length:Math.abs(Lz/angularMomentumVectorLengthRatio),
            position:{x:0,y:axleLength+diskThickness/2,z:0},
            rotation:{x:0,y:0,z:lZrotation},
        }
        pivot.remove(lZVector);
        pivot.remove(lXYVector);
        lZVector = createObject(data);
        data.length = Lxy/angularMomentumVectorLengthRatio;
        data.rotation.z = lXYrotation;
        lXYVector = createObject(data);
        if(resolveMomentumSwitch==1){
            pivot.add(lZVector);
            pivot.add(lXYVector);
        }
        break;
    case "omegaS":
        sliders[i].text.innerHTML = this.value;
        omegaS = THREE.Math.degToRad(this.value);

        Ls = I0*omegaS;
        Lz = Ls*Math.cos(phi0);
        Lxy = Ls*Math.sin(phi0);
        omegaZ = axleLength*mass*g/I0/omegaS;

        var lZrotation = 0
        var lXYrotation = 0
        if(phi0<Math.PI/2)
            lZrotation = phi0;
        else
            lZrotation = Math.PI+phi0;
        lXYrotation = -(Math.PI/2-phi0);

        var data = {
            type:"Vector",
            color:0xff00ff,
            origin:[0,0,0],
            dir:[0,0,0],
            headWidth:0.03,
            length:Math.abs(Lz/angularMomentumVectorLengthRatio),
            position:{x:0,y:axleLength+diskThickness/2,z:0},
            rotation:{x:0,y:0,z:lZrotation},
        }
        pivot.remove(lZVector);
        pivot.remove(lXYVector);
        pivot.remove(totalLVector);
        lZVector = createObject(data);
        data.length = Lxy/angularMomentumVectorLengthRatio;
        data.rotation.z = lXYrotation;
        lXYVector = createObject(data);
        data.length = Ls/angularMomentumVectorLengthRatio;
        data.rotation.z=0;
        totalLVector = createObject(data);
        if(resolveMomentumSwitch==1){
            pivot.add(lZVector);
            pivot.add(lXYVector);
        }
        if(angMomentumSwitch==1){
            pivot.add(totalLVector);
        }
        break;
    case "mass":
        sliders[i].text.innerHTML = this.value;
        mass = parseFloat(this.value);
        I0 = (mass*diskRadius**2)/2;
        omegaZ = axleLength*mass*g/I0/omegaS;
        break;
    case "axleLength":
        sliders[i].text.innerHTML = this.value;
        axleLength = parseFloat(this.value);

        var geometry = new THREE.CylinderGeometry(0.005, 0.005, axleLength, 32);
        idealAxle.geometry = geometry;
        idealAxle.position.y = axleLength/2;
        idealDisk.position.y = axleLength+diskThickness/2;
					
        weightVector.position.y = axleLength+diskThickness/2;
        totalLVector.position.y = axleLength+diskThickness/2;
        torqueVector.position.y = axleLength+diskThickness/2;
        // weightVector.position.y = axleLength+diskThickness/2;

        omegaZ = axleLength*mass*g/I0/omegaS;
        break;
    case "radius":
        sliders[i].text.innerHTML = this.value;
        diskRadius = parseFloat(this.value);
        var geometry = new THREE.CylinderGeometry(diskRadius, diskRadius, diskThickness, 32);
        idealDisk.geometry = geometry;
        I0 = (mass*diskRadius**2)/2;

        omegaZ = axleLength*mass*g/I0/omegaS;
        break;
    }
});
}
// three.js stuffs close
container.addEventListener("wheel", (event) => {
	if (event.deltaY > 0)
		zoomValue += 0.1;
	else
		zoomValue -= 0.1
	Camera1.position.z = zoomValue*axleLength;
    Camera2.position.y = zoomValue*axleLength;
});