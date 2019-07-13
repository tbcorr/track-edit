import {
	Scene,
	Engine,
	DirectionalLight,
	ArcRotateCamera,
	Vector3,
	MeshBuilder,
	Tools,
	Color3,
	UtilityLayerRenderer,
	PositionGizmo,
	PointerEventTypes
} from 'babylonjs';
import ArcTrackSegment from './track/ArcTrackSegment';

const CAMERA_NAME = 'Camera';
const GRID_NAME = 'Grid';
const BUILD_PLANE_NAME = 'Build Plane';
const LIGHT_NAME = 'Light';

let engine;
let scene;
let light;
let camera;

let buildPlane;
let grid;
let controlPoint;

let utilLayer;
let positionGizmo;

let previousPosition;

const onRender = () => {
	scene.render();
};

const setup = (canvasElement) => {
	engine = createEngine(canvasElement, 1);
	scene = createScene();
	light = createLight();
	camera = createCamera(canvasElement);
	grid = createGrid(1000, 100);
	// buildPlane = createBuildPlane();

	utilLayer = new UtilityLayerRenderer(scene);
	positionGizmo = new PositionGizmo(utilLayer);

	setupPointerObserver(scene);

	const segment = new ArcTrackSegment("Track Segment", Vector3.Zero(), Vector3.Forward(), scene);
	segment.phi = 360;
	segment.theta = 0;
	segment.update();

	engine.runRenderLoop(onRender);
};

const setupPointerObserver = () => {
	scene.onPointerObservable.add((pointerInfo) => {      
		switch (pointerInfo.type) {
			case PointerEventTypes.POINTERDOWN:
				// onPointerDown(scene);
				break;
			case PointerEventTypes.POINTERUP:
				console.log("POINTER UP");
				break;
			case PointerEventTypes.POINTERMOVE:
				// onPointerMove();
				break;
			case PointerEventTypes.POINTERPICK:
				console.log("POINTER PICK");
				break;
      }
	});
};

const createEngine = (canvasElement, scalingLevel) => {
	const engine = new Engine(canvasElement, true);

	engine.setHardwareScalingLevel(scalingLevel);

	return engine;
};

const createScene = () => {
	const scene = new Scene(engine);

	return scene;
};

const createCamera = (canvasElement) => {
	const camera = new ArcRotateCamera(CAMERA_NAME, 0, 0, 10, new Vector3(0, 0, 0), scene);

	camera.attachControl(canvasElement, false);
	camera.lowerRadiusLimit = 1;
	camera.upperBetaLimit = Math.PI / 2;

	return camera;
};

const createLight = () => {
	const light = new DirectionalLight(LIGHT_NAME, Vector3.Down(), scene);

	return light;
};

const createGrid = (gridSize, gridSegments) => {
	const lines = [];
	const delta = Math.floor(gridSize / gridSegments);

	// left -> right
	for(let i = 0; i <= gridSegments; i++) {
		const x = i * delta;
		const z = i * delta;

		lines.push([
			new Vector3(x, 0, 0),
			new Vector3(x, 0, gridSize)
		]);

		lines.push([
			new Vector3(0, 0, z),
			new Vector3(gridSize, 0, z)
		]);
	}

	grid = MeshBuilder.CreateLineSystem(GRID_NAME, {lines}, scene);
	grid.position.x = -(gridSize / 2);
	grid.position.z = -(gridSize / 2);
	grid.bakeCurrentTransformIntoVertices();

	return grid;
};

const createBuildPlane = () => {
	const material = new BABYLON.StandardMaterial(BUILD_PLANE_NAME, scene);
	material.diffuseColor = Color3.White();
	material.alpha = 0.25;

	const buildPlane = MeshBuilder.CreatePlane(BUILD_PLANE_NAME, {size: 1000}, scene);
	buildPlane.rotation.x = Tools.ToRadians(90);
	buildPlane.bakeCurrentTransformIntoVertices();

	buildPlane.position.y = 1;

	buildPlane.isPickable = true;
	buildPlane.material = material;

	return buildPlane
};

const onPointerMove = () => {
	const pickResult = scene.pick(scene.pointerX, scene.pointerY);

	if(pickResult.pickedMesh === buildPlane) {
		previousPosition = controlPoint.position;

		const delta = pickResult.pickedPoint.subtract(previousPosition);

		controlPoint.position.addInPlace(delta);
	}
};

const onPointerDown = () => {
	const pickResult = scene.pick(scene.pointerX, scene.pointerY);
};

export { setup, scene, positionGizmo };
