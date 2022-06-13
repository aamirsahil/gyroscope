// canvas dimension
var Canvas_Width = 800;
var Canvas_Height = 600;
// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( Canvas_Width, Canvas_Height );
document.getElementById("section").appendChild( renderer.domElement );
renderer.setClearColor( 0x000000, 1 );
// secene and light
const scene = new THREE.Scene();
const light = new THREE.DirectionalLight( 0xffffff, 1.15 );//light(color, intersity)
light.position.set(0, 3, 3);
scene.add( light );
// origin and xy plane
const originGeometry = new THREE.SphereGeometry( 0.1, 32, 16 );
const originMaterial = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
const origin = new THREE.Mesh( originGeometry, originMaterial );
origin.position.set(0,0,0);
scene.add( origin );
// skybox
const loader = new THREE.TextureLoader();
let skyboxGeo = new THREE.PlaneGeometry(10, 10);
const skyTexture = new THREE.TextureLoader().load("./background.jpg");
skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;
skyTexture.repeat.set( 1, 1 );
skyTexture.anisotropy = 16;
skyTexture.encoding = THREE.sRGBEncoding;

const skyMaterial = new THREE.MeshStandardMaterial({
    map: skyTexture,
});
let skybox = new THREE.Mesh( skyboxGeo, skyMaterial );

skybox.position.set(0,0,-2);
scene.add(skybox);
// to load 3d model
// const loader = new THREE.GLTFLoader();
// degree to rad converter
var degToRad = (angle) =>  angle/360*2*Math.PI;
// gyroscope
class Gyroscope{
    constructor(){
        // parameters
        this.g = 9.8;
        this.omega = 0.2;
        this.radius = 1;
        // geometry
        let planeGeometry = new THREE.PlaneGeometry( 10, 10 );
        let cylinderPhiGeometry = new THREE.CylinderGeometry( 0.01, 0.05, 0.5, 32 );
        let cylinderThetaGeometry = new THREE.CylinderGeometry( 0.01, 0.01, 0.5, 32 );
        let cylinderDiskGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.05, 8 );
        let cylinderDiskDecorGeometry = new THREE.CylinderGeometry( 0.01, 0.01, 0.05, 32 );
        // materials
        const baseTexture = new THREE.TextureLoader().load("./base.jpg");
        baseTexture.wrapS = baseTexture.wrapT = THREE.RepeatWrapping;
        baseTexture.repeat.set( 1, 1 );
        baseTexture.anisotropy = 16;
        baseTexture.encoding = THREE.sRGBEncoding;

        let baseMaterial = new THREE.MeshStandardMaterial( { map: baseTexture } );
        let phiAxisMaterial = new THREE.MeshPhongMaterial( { color: 0xfe0000 } );
        let thetaAxisMaterial = new THREE.MeshPhongMaterial( { color: 0x2a6dbd } );
        let diskMaterial = new THREE.MeshPhongMaterial( { color: 0x49f5bd } );
        // base
        this.base = new THREE.Mesh( planeGeometry, baseMaterial );
        this.base.position.set(0,0,0);
        this.base.scale.set(0.15,0.15,1);
        this.base.rotation.set(degToRad(270), 0, 0);
        // phiAxis
        this.phiAxis = new THREE.Mesh( cylinderPhiGeometry, phiAxisMaterial );
        this.phiAxis.position.set(0,0.25,0);
        this.phiAxis.scale.set(1,1,1);
        this.phiAxis.rotation.set(0,0,0);
        // thetaAxis
        this.thetaAxis = new THREE.Mesh( cylinderThetaGeometry, thetaAxisMaterial );
        this.thetaAxis.position.set(0,0.45,0);
        this.thetaAxis.scale.set(1,1,1);
        this.thetaAxis.rotation.set(0,0,degToRad(90));
        cylinderThetaGeometry.translate( 0, -0.25, 0 );
        // disk
        this.disk = new THREE.Mesh( cylinderDiskGeometry, diskMaterial );
        this.disk.position.set(0,0.45,0);
        this.disk.scale.set(1,1,1);
        this.disk.rotation.set(0,0,degToRad(90));
        cylinderDiskGeometry.translate( 0, -0.5, 0 );
        // adding to scene
        scene.add( this.base );
        scene.add( this.phiAxis );
        scene.add( this.thetaAxis );
        scene.add( this.disk );
    }
    rotateTheta(time){
        this.thetaAxis.rotation.z = angle;
        this.disk.rotation.z = angle;
    }
    rotatePhi(){
        let deltaPhi = this.g/this.omega/this.radius*0.01;
        deltaPhi = degToRad(deltaPhi);
        this.thetaAxis.rotation.y += deltaPhi;
        this.disk.rotation.y += deltaPhi;
    }
    rotateDisk(){
        // let deltaAngle = this.omega;
        // deltaAngle = degToRad(deltaAngle);
        // this.disk.rotation.x += deltaAngle;
    }
    changeRadius(radius){
        this.radius = radius;
        this.disk.scale.set(radius,1,radius);
    }
    changeOmega(omega){
        this.omega = omega;
    }
}
// camera
class Camera{
    constructor(){
        const fov = 75;
        const aspect = Canvas_Width/Canvas_Height;
        const near = 0.1;
        const far = 5;

        this.camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
        this.camera.position.set(0,0.25,1);
    }
    zoom(){
        this.camera.updateProjectionMatrix();
    }
    resize(Canvas_Width, Canvas_Height){
        this.camera.aspect = Canvas_Width / Canvas_Height;
        this.camera.updateProjectionMatrix();
    
        renderer.setSize( Canvas_Width, Canvas_Height );
    }
}
let gyroscope = new Gyroscope();
let camera = new Camera();

function animate(time) {
    time = time*0.001;

    gyroscope.rotatePhi();
    gyroscope.rotateDisk();
    renderer.render( scene, camera.camera );
    requestAnimationFrame( animate );
}

setTimeout(()=>{
    animate();
}, 1000);