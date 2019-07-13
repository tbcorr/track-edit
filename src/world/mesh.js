import { MeshBuilder } from 'babylonjs';
import { createControlPointMaterial, createTrackSegmentMaterial } from './material';

const createControlPointMesh = (name, scene) => {
	const material = createControlPointMaterial(scene);

	const mesh = MeshBuilder.CreateIcoSphere(name, {radius: 0.1}, scene);
	mesh.material = material;
	mesh.isPickable = true;

	return mesh;
};

const createTrackSegmentMesh = (name, points, instance, scene) => {
	const material = createTrackSegmentMaterial(scene);
	
	const mesh = MeshBuilder.CreateLines(name, { points, instance, updatable: true }, scene);
	mesh.material = material;

	console.log(mesh);

	return mesh;
}

export { createControlPointMesh, createTrackSegmentMesh };
