

//Create colorobject with predefined colors - easier to set colors to objects later on
var colors = {
	white : 0xffffff,
	yellow : 0xffff00,
	darkyellow: 0xa08e14,
	darkred : 0x5e0004,
	darkgreen : 0x0e3000,
	green : 0x1a5900,
	lightgreen: 0x529b33,
	darkestGreen: 0x001e04,
	brown: 0x3f1b00,
	lightgray: 0xaaaaaa,
	darkgray: 0x444444,
	bluegray: 0x506a6d
	};

var materials = new Array();	
var showWireframe = false;


//Setup Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Create Scene
var scene = new THREE.Scene();

//Set camera setting
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(40,15,75);
camera.lookAt(0,0,0);

//Create Lights
createAmbientLight(colors.bluegray);
var light = createPointLight(colors.white);
light.position.set(20,15,30);


//Create Room - Floor / Ceiling / Walls
var p = createPlane(100,140,0, colors.darkgray);
p.rotation.x = Deg2Rad(90);

var wall = createRectangle(2,6,100, colors.darkgray);
wall.position.x = 49;

wall = createRectangle(2,6,100, colors.darkgray);
wall.position.x = -49;

wall = createRectangle(2,6,100, colors.darkgray);
wall.rotation.y = Deg2Rad(90);
wall.position.z = -49;

//presents
var cube = createRectangle(5,2,3, colors.darkred);
cube.position.x = 5;
cube.rotation.y = 5;

cube = createRectangle(2,3,4, colors.darkgreen);
cube.position.x = -5;
cube.rotation.y = -5;

cube = createRectangle(1.5,1,3, colors.yellow);
cube.position.x = -1;
cube.position.z = 4;

var rug = createCylinder(12,12,0.2,16, colors.darkred);
scene.add(rug);

var tree = createTree();
tree.position.y = 7;

var particles = createParticles();

//Render loop
animate();

//Function definitions:
function animate()
{
	animateParticles(particles);
 	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function buttonClicked()
{
	showWireframe = !showWireframe;
	for(var i = 0; i < materials.length; i++)
	{
		materials[i].wireframe = showWireframe;
	}
}

function createAmbientLight(color)
{
	let ambientlight = new THREE.AmbientLight( color, 0.4 );
	scene.add( ambientlight );
	return ambientlight;
}


function createPointLight(color)
{
	let light = new THREE.PointLight( color, 1,200 );
	let pointLightHelper = new THREE.PointLightHelper(light,1);
	light.castShadow = true;
	var d = 200;

    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;

    light.shadow.camera.far = 1000;

	scene.add( light, pointLightHelper );
	return light;
}


function createRectangle(x,y,z,color, addToScene=true)
{

	let geometry = new THREE.BoxBufferGeometry( x, y, z );
	let material = new THREE.MeshPhongMaterial( {color: color} );
	let cube = new THREE.Mesh( geometry, material );
	materials.push(material);
	cube.receiveShadow = true;
	cube.castShadow = true;
	cube.position.y = y/2;
	if(addToScene)
		scene.add(cube);
	return cube;
}

function createTetrahedron(color,radius,subdiv=0, flatShading=false, addToScene=true)
{
	let mat = new THREE.MeshPhongMaterial({color: color, flatShading: flatShading});
	let geo = new THREE.TetrahedronGeometry(radius,subdiv);
	geo.applyMatrix( new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, -1 ).normalize(), Math.atan( Math.sqrt(2)) ) );
	let tetra = new THREE.Mesh(geo,mat);
	tetra.rotation.y = -5;
	tetra.receiveShadow = true;
	tetra.castShadow = true;

	materials.push(mat);
	if(addToScene) {
		scene.add(tetra);
	}
	return tetra;
}

function createPlane(x, y, z, color=colors.white)
{
	//let mat = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide, shininess: 2});
	let mat = new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide});
	let geo = new THREE.PlaneGeometry(x,y,z);
	let plane = new THREE.Mesh(geo,mat);
	plane.receiveShadow = true;
	scene.add(plane);
	return plane;
}

function createCylinder(radiusTop, radiusBot, height, segments, color,flatShading=false, addToScene=true)
{
	var geo = new THREE.CylinderGeometry(radiusTop, radiusBot, height, segments);
	var mat = new THREE.MeshPhongMaterial({color: color, flatShading: flatShading});
	var cylinder = new THREE.Mesh(geo,mat);
	cylinder.castShadow = true;
	cylinder.receiveShadow = true;
	materials.push(mat);
	if(addToScene) {
		scene.add(cylinder);
	}

	return cylinder;
}


function Deg2Rad(degrees)
{
	return degrees * (Math.PI / 180);
}