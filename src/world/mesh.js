import { createControlPointMaterial, createTrackSegmentMaterial } from './material';

const createControlPointMesh = (scene) => {
	const material = createControlPointMaterial(scene);

	const mesh = MeshBuilder.CreateIcoSphere(CONTROL_POINT_NAME, {radius: 1}, scene);
	mesh.material = material;
	mesh.isPickable = true;

	return mesh;
};

const createTrackSegmentMesh = (name, points, instance, scene) => {
	const material = createTrackSegmentMaterial(scene);
	
	const mesh = MeshBuilder.CreateLines(name, { points, instance, updatable: true }, scene);
	mesh.material = material;

	return mesh;
}

export { createControlPointMesh, createTrackSegmentMesh };
