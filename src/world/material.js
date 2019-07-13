import { StandardMaterial, Color3 } from 'babylonjs';

const CONTROL_POINT_MATERIAL_NAME = 'Control Point';
const TRACK_SEGMENT_MATERIAL_NAME = 'Track Segment';

let controlPointMaterial;
let trackSegmentMaterial;

const createControlPointMaterial = (scene) => {
	if(controlPointMaterial) {
		return controlPointMaterial;
	}

	controlPointMaterial = new StandardMaterial(CONTROL_POINT_MATERIAL_NAME, scene);
	controlPointMaterial.diffuseColor = Color3.Blue();

	return controlPointMaterial;
};

const createTrackSegmentMaterial = (scene) => {
	if(trackSegmentMaterial) {
		return trackSegmentMaterial;
	}

	trackSegmentMaterial = new StandardMaterial(TRACK_SEGMENT_MATERIAL_NAME, scene);
	trackSegmentMaterial.diffuseColor = Color3.Green();

	return trackSegmentMaterial;
};

export { createControlPointMaterial, createTrackSegmentMaterial };