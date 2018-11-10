

//Create colorobject with predefined colors - easier to set colors to objects later on
var colors = {
	white : 0xffffff,
	yellow : 0xffff00,
	darkred : 0x5e0004,
	darkgreen : 0x0e3000,
	green : 0x1a5900,
	lightgreen: 0x34b200
	};
				
//Setup Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Create Scene
var scene = new THREE.Scene();

//Set camera setting
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,25,100);
//camera.lookAt(0,0,0);

//Create Lights
createAmbientLight(colors.white);
var pointLight = createPointLight(colors.white);
pointLight.position.set(0,20,20);


//Create Objects
/*var p = createPlane(100,100,0, colors.yellow);
p.rotation.x = 1.57*/

createTree();

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
	
	return tetra;
}

function createPlane(x=0,y=0,z=0,color=colors.white)
{
	mat = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide});
	geo = new THREE.PlaneGeometry(x,y,z);
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
	let trunk = createCylinder(3,3,10,5,colors.darkgreen);
	trunk.position.x = 10;

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
	let top = createTetrahedron(0x529b33, 7);
	top.position.y = 10;
	let top2 = createTetrahedron(0x529b33, 7);
	top2.position.y = 10;
	top2.rotation.y = 4.5;

	treeGroup.add(trunk,bot,bot2,mid,mid2,top, top2);
	scene.add(treeGroup);

	return treeGroup;
}