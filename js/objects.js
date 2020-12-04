
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

function createParticles()
{
	var material = new THREE.PointsMaterial({color: 0xffffcc, size: 0.2});
	var geometry = new THREE.Geometry();
	var x,y,z;
	for(var i = 0; i < 1800; i++)
	{
		x = (Math.random() * 500) - 400;
		y = (Math.random() * 800) - 400;
		z = (Math.random() * 300) - 400;

		geometry.vertices.push(new THREE.Vector3(x, y, z));
	}

	let pointCloud = new THREE.Points(geometry, material);
	scene.add(pointCloud);
	return pointCloud;
}

function animateParticles(particle)
{
	let length = particle.geometry.vertices.length;

	for(var i = 0; i < length; i++ )
	{
		let dX, dY, dZ;
    	dX = (Math.random() * 200 - 1);
    	dZ = (Math.random() * 200 - 1);
    	dY = (Math.random() * 200 - 1);

    	particle.geometry.vertices[i].set(dX,dY,dZ);
  	}

  	particle.geometry.verticesNeedUpdate = true;
}