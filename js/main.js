

//Create colorobject with predefined colors - easier to set colors to objects later on
var colors = {
	white : 0xffffff,
	yellow : 0xffff00,
	darkred : 0x5e0004,
	darkgreen : 0x0e3000,
	green : 0x1a5900,
	lightgreen: 0x529b33,
	darkestGreen: 0x001e04,
	brown: 0x3f1b00
	};
				
//Setup Renderer
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = false;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Create Scene
var scene = new THREE.Scene();

//Set camera setting
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(40,15,75);
camera.lookAt(0,0,0);

//Create Lights
createAmbientLight(colors.white);
var light = createPointLight(colors.white);
light.position.set(20,15,30);

//Create Room - Floor / Ceiling / Walls
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

function createTetrahedron(color,radius,subdiv=0, flatShading=false)
{
	let mat = new THREE.MeshPhongMaterial({color: color, flatShading: flatShading});
	//let mat = new THREE.MeshLambertMaterial({color: color});
	let geo = new THREE.TetrahedronGeometry(radius,subdiv);
	geo.applyMatrix( new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, -1 ).normalize(), Math.atan( Math.sqrt(2)) ) );
	let tetra = new THREE.Mesh(geo,mat);
	tetra.rotation.y = -5;
	tetra.receiveShadow = true;
	tetra.castShadow = true;

	return tetra;
}

function createPlane(x=0,y=0,z=0,color=colors.white)
{
	//let mat = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide, shininess: 2});
	let mat = new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide});
	let geo = new THREE.PlaneGeometry(x,y,z);
	let plane = new THREE.Mesh(geo,mat);
	plane.receiveShadow = true;
	scene.add(plane);
	return plane;
}

function createCylinder(radiusTop, radiusBot, height, segments, color,flatShading=false)
{
	var geo = new THREE.CylinderGeometry(radiusTop, radiusBot, height, segments);
	var mat = new THREE.MeshPhongMaterial({color: color, flatShading: flatShading});
	var cylinder = new THREE.Mesh(geo,mat);
	cylinder.castShadow = true;
	cylinder.receiveShadow = true;
	return cylinder;
}


function createTree()
{
	let treeGroup = new THREE.Group();

	let treeFoot = createCylinder(3,3,2,8, colors.darkestGreen,true);
	treeFoot.position.y = -7;
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

	treeGroup.add(treeFoot,trunk,bot,bot2,mid,mid2,top, top2);
	scene.add(treeGroup);

	return treeGroup;
}


function treeLight()
{
	let group = new THREE.Group();
	let holder = createCylinder(.1,.1,1,8, 0x000000, true);
	holder.position.y = 10;

	var bulbGeometry = new THREE.SphereBufferGeometry( .1, 16, 8 );
	var bulbLight = new THREE.PointLight( colors.yellow, .5, 1, 2 );

	var bulbMat = new THREE.MeshStandardMaterial( {
		emissive: colors.yellow,
		emissiveIntensity: 1,
		color: 0x000000
	} );

	bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
	bulbLight.position.set( 0, 10.5, 0 );

	group.add(holder,bulbLight);
	scene.add(group);
}



function Deg2Rad(degrees)
{
	return degrees * (Math.PI / 180);
}