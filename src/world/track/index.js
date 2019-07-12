const createTrackSegment = (name, points, instance, scene) => {
	const mesh = createTrackSegmentMesh(name, points, instance, scene);

	mesh.material = getTrackSegmentMaterial(scene);
};