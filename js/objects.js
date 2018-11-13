
function createTree()
{
	let treeGroup = new THREE.Group();

	let treeFoot = createCylinder(3,3,2,8, colors.darkestGreen,true,false);
	treeFoot.position.y = -7;
	//Tree Trunk
	let trunk = createCylinder(2,2,6,6,colors.brown,true,false);
	trunk.position.y = -6;

	//Bottom branches
	let bot = createTetrahedron(colors.darkgreen, 10,false, false);
	let bot2 = createTetrahedron(colors.darkgreen, 9,false, false);
	bot2.rotation.y = 4.5;
	
	//Mid Branches
	let mid = createTetrahedron(colors.green, 9, false, false);
	mid.position.y = 5;
	let mid2 = createTetrahedron(colors.green, 8, false, false);
	mid2.rotation.y = 4.5;
	mid2.position.y = 5;
	
	//Top Branches
	let top = createTetrahedron(colors.lightgreen, 7, false);
	top.position.y = 10;
	let top2 = createTetrahedron(colors.lightgreen, 7, false);
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

function particles()
{
	// create the particle variables
	let particleCount = 1800;
    let particles = new THREE.Geometry();
    let pMaterial = new THREE.PointsMaterial({
      	color: 0xFFFFFF,
      	size: 2,
      	blending: THREE.AdditiveBlending,
  	  	transparent: true
    });

	
//now create the individual particles
	for (var p = 0; p < particleCount; p++) {

  		// create a particle with random
  		// position values, -250 -> 250
		let pY = Math.random() * 10 - 1;
    	let pZ = Math.random() * 10 - 1;
  		let pX = Math.random() * 10 - 1;
      	particle = new THREE.Vector3(pX, pY, pZ);

  		// add it to the geometry
  		particles.vertices.push(particle);
}
	// create the particle system
	var particleSystem = new THREE.Points(particles, pMaterial);
	particleSystem.sortParticles = true;
	// add it to the scene
	scene.add(particleSystem);
}