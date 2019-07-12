import { Vector3, Curve3, Color3, StandardMaterial, MeshBuilder, UtilityLayerRenderer, Tools } from 'babylonjs';
import { scene, positionGizmo } from '@/world';

const K = 0.55228475;

export default class ArcTrackSegment {

	constructor(name, radius = 0, theta = 0, phi = 0, origin = Vector3.Zero(), scene) {
		this.name = name;
		this.radius = radius;
		this.theta = theta;
		this.phi = phi;
		this.origin = origin;
		this.scene = scene;

		this.p1 = Vector3.Zero();
		this.p2 = Vector3.Zero();
		this.p3 = Vector3.Zero();
		this.p4 = Vector3.Zero();

		this.p1Mesh = createControlPointMesh(this.scene);
		this.p4Mesh = createControlPointMesh(this.scene);

		this.editTrackSegmentMesh = null;

		this.init();
	}

	init() {

		p1 = createControlPointMesh(this.scene);
		p1.position = origin;
	
		p2 = p1.position.add(forward.scale(K));
	
		p4 = createControlPointMesh(this.scene);
		p4.position = p1.position.add(forward.scale(this.radius));
	
		p3 = p4.position.add(backward.scale(K));
	}

	update() {

	}

	updateControlPointMeshes() {
		this.p1Mesh.position = this.p1;
		this.p2Mesh.position = this.p2;
	}

	updateTrackMeshes() {
		const curve = Curve3.CreateCubicBezier(this.p1, this.p2, this.p3, this.p4, 10);

		this.editTrackSegmentMesh = createTrackSegmentMesh(this.name, curve.getPoints(), this.editTrackSegmentMesh, this.scene);
	}

	computePointsStraight() {
		const forward = Vector3.Forward();
		const backward = Vector3.Backward();

		this.p1 = this.origin;
		this.p2 = p1.position.add(forward.scale(K));

		this.p4 = p1.add(forward.scale(this.radius));
		this.p3 = p4.add(backward.scale(K));
	}

	computePointsArc() {
		const phiRadians = Tools.ToRadians(this.phi);

		this.p1 = this.origin;
		
		const p2z = this.p1.x + K * this.radius * sin(phiRadians);
		const p2y = this.p1.y - K * this.radius * Math.sin(Tools.ToRadians(phiRadians));

		this.p2 = new Vector3(0, p2y, p2z);




		x3 = x4 + k*R*sin(ϕ)
y3 = y4 + k*R*cos(ϕ). 
	}
};

const TRACK_SEGMENT_MATERIAL_NAME = 'Track Segment';
const CONTROL_POINT_MATERIAL_NAME = 'Control Point';

const CONTROL_POINT_NAME = 'Control Point';

let p1;
let p2;
let p3;
let p4;

let radius = 10;
let theta = 0;
let phi = 0;

let editTrackSegmentCurve;
let editTrackSegment;

let controlPointMaterial;
let trackSegmentMaterial;

positionGizmo.zGizmo.dragBehavior.onDragObservable.add((event)=>{
	p4.position.addInPlace(Vector3.Forward().scale(event.dragDistance));

	editTrackSegmentCurve = Curve3.CreateCubicBezier(
		p1.position,
		p2,
		p3,
		p4.position,
		10
	);

	editTrackSegment = MeshBuilder.CreateLines("Track Segment", {
		points: editTrackSegmentCurve.getPoints(),
		updatable: true,
		instance: editTrackSegment
	}, scene);
});