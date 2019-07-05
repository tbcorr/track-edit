import { Scene, Engine, ArcRotateCamera, Vector3, MeshBuilder, DirectionalLight } from 'babylonjs';

let engine;
let scene;
let camera;
let light;

let grid;
let gridSize = 1000;
let gridSegments = 100;

const onRender = () => {
	scene.render();
};

const createGrid = (scene) => {
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

	grid = MeshBuilder.CreateLineSystem("Grid", {lines}, scene);
	grid.position.x = -(gridSize / 2);
	grid.position.z = -(gridSize / 2);
	grid.bakeCurrentTransformIntoVertices();
};

const setup = (canvasElement) => {
	engine = new Engine(canvasElement, true);
	scene = new Scene(engine);

	camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), scene);
	camera.attachControl(canvasElement, false);
	camera.lowerRadiusLimit = 1;
	camera.upperBetaLimit = Math.PI / 2;

	light = new DirectionalLight("DirectionalLight", new Vector3(0, -1, 0), scene);

	createGrid(scene);

	engine.runRenderLoop(onRender);
};

export { setup };
