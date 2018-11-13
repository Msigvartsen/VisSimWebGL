
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