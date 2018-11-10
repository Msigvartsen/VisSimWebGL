

//Create colorobject with predefined colors - easier to set colors to objects later on
var colors = {
	white : 0xffffff,
	yellow : 0xffff00,
	darkred : 0x5e0004,
	darkgreen : 0x0e3000,
	green : 0x1a5900,
	lightgreen: 0x529b33,
	brown: 0x3f1b00
	};
				
//Setup Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Create Scene
var scene = new THREE.Scene();

//Set camera setting
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(15,25,100);
camera.lookAt(0,0,0);

//Create Lights
createAmbientLight(colors.white);
var light = createPointLight(colors.white);
light.position.set(0,5,30);
/*pointLight.castShadow = true;*/

//Create Objects
var p = createPlane(100,140,0, colors.brown);
p.rotation.x = Deg2Rad(90);

p = createPlane(100,100,0, colors.brown);
p.rotation.x = Deg2Rad(90);
p.position.y = 40;

p = createPlane(100,40,0, colors.brown);
p.position.set(0,20,-50);

p = createPlane(100,40,0,colors.brown);
p.rotation.y = Deg2Rad(90);
p.position.set(50,20,0);

p = createPlane(100,40,0,colors.brown);
p.rotation.y = Deg2Rad(90);
p.position.set(-50,20,0);




var tree = createTree();
tree.position.y = 7;

//Render loop
animate();



//Function definitions:
function animate() {
 	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}


function createAmbientLight(color)
{
	let ambientlight = new THREE.AmbientLight( color );
	scene.add( ambientlight );
	return ambientlight;
}


function createPointLight(color)
{
	let pointlight = new THREE.PointLight( color, 1,0 );
	let pointLightHelper = new THREE.PointLightHelper(pointlight,1);
	scene.add( pointlight, pointLightHelper );
	return pointlight;
}

function createTetrahedron(color,radius,subdiv=0, flatShading=false)
{
	let mat = new THREE.MeshPhongMaterial({color: color, flatShading: flatShading});
	let geo = new THREE.TetrahedronGeometry(radius,subdiv);
	geo.applyMatrix( new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, -1 ).normalize(), Math.atan( Math.sqrt(2)) ) );
	let tetra = new THREE.Mesh(geo,mat);
	tetra.rotation.y = -5;
	tetra.receiveShadow = true;

	return tetra;
}

function createPlane(x=0,y=0,z=0,color=colors.white)
{
	let mat = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide, shininess: 2});
	let geo = new THREE.PlaneGeometry(x,y,z);
	let plane = new THREE.Mesh(geo,mat);
	
	scene.add(plane);
	return plane;
}

function createCylinder(radiusTop, radiusBot, height, segments, color,flatShading=false)
{
	var geo = new THREE.CylinderGeometry(radiusTop, radiusBot, height, segments);
	var mat = new THREE.MeshPhongMaterial({color: color, flatShading: flatShading})
	var cylinder = new THREE.Mesh(geo,mat);

	return cylinder;
}


function createTree()
{
	let treeGroup = new THREE.Group();

	//Tree Trunk
	let trunk = createCylinder(2,2,6,6,colors.brown,true);
	trunk.position.y = -6;

	//Bottom branches
	let bot = createTetrahedron(colors.darkgreen, 10);
	let bot2 = createTetrahedron(colors.darkgreen, 9);
	bot2.rotation.y = 4.5;
	

	//Mid Branches
	let mid = createTetrahedron(colors.green, 9);
	mid.position.y = 5;
	let mid2 = createTetrahedron(colors.green, 8);
	mid2.rotation.y = 4.5;
	mid2.position.y = 5;
	
	//Top Branches
	let top = createTetrahedron(colors.lightgreen, 7);
	top.position.y = 10;
	let top2 = createTetrahedron(colors.lightgreen, 7);
	top2.position.y = 10;
	top2.rotation.y = 4.5;

	treeGroup.add(trunk,bot,bot2,mid,mid2,top, top2);
	scene.add(treeGroup);

	return treeGroup;
}



function Deg2Rad(degrees)
{
	return degrees * (Math.PI / 180);
}