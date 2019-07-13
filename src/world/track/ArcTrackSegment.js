import { Vector3, Curve3, Tools, Scalar } from 'babylonjs';
import { createControlPointMesh, createTrackSegmentMesh } from '@/world/mesh';

const LENGTH = 10;

export default class ArcTrackSegment {
	constructor(name, originPoint = Vector3.Zero(), originTangent = Vector3.Forward(), scene) {
		this.name = name;
		this.radius = 1;
		this.theta = 0;
		this.phi = 0;
		this.scene = scene;

		this.p1 = originPoint;
		this.p2 = Vector3.Zero();
		this.p3 = Vector3.Zero();
		this.p4 = originPoint.add(originTangent.scale(LENGTH));

		this.p1Mesh = createControlPointMesh(this.scene);
		this.p1Mesh.position = this.p1;

		this.p4Mesh = createControlPointMesh(this.scene);
		this.p4Mesh.position = this.p4;

		this.editTrackSegmentMesh = null;
	}

	update() {
		const thetaRadians = Tools.ToRadians(this.theta);
		const phiRadians = Tools.ToRadians(this.phi);

		const x1xz = 0;
		const z1xz = 1;

		const y1zy = -1;
		const z1zy = 0;

		this.p1Mesh.position.y = y1zy;

		// const x4 = (Math.sin(thetaRadians) * Math.cos(phiRadians)).toFixed(5);
		// const y4 = Math.cos(phiRadians).toFixed(5);
		// const z4 = (Math.sin(thetaRadians) * Math.sin(phiRadians)).toFixed(5);
		
		// const xc = (Math.sin(thetaRadians / 2) * Math.cos(phiRadians / 2)).toFixed(5);
		// const yc = Math.cos(phiRadians / 2).toFixed(5);
		// const zc = (Math.sin(thetaRadians / 2) * Math.sin(phiRadians / 2)).toFixed(5);

		// const xc = (Math.sin(thetaRadians / 2) * Math.cos(phiRadians / 2)).toFixed(5);
		// const yc = Math.cos(phiRadians / 2).toFixed(5);
		// const zc = (Math.sin(thetaRadians / 2) * Math.sin(phiRadians / 2)).toFixed(5);

		const x4xz = Number(Math.cos(thetaRadians).toFixed(4));
		const z4xz = Number(Math.sin(thetaRadians).toFixed(4));

		console.log(x4xz);

		const z4zy = Number(Math.cos(phiRadians).toFixed(4));
		const y4zy = Number(Math.sin(phiRadians).toFixed(4));

		const xc = 0;
		const yc = 0;
		const zc = 0;

		this.cMesh = createControlPointMesh(this.scene);
		this.cMesh.position = new Vector3(xc, yc, zc);

		// x z plane
		const axxz = x1xz - xc;
		const azxz = z1xz - zc;

		// z y plane
		const azzy = z1zy - zc;
		const ayzy = y1zy - yc;

		// x z plane
		const bxxz = x4xz - xc;
		const bzxz = z4xz - zc;

		// z y plane
		const bzzy = z4zy - zc;
		const byzy = y4zy - yc;

		const q1xz = axxz * axxz + azxz * azxz;
		const q2xz = q1xz + axxz * bxxz + azxz * bzxz;

		const q1zy = azzy * azzy + ayzy * ayzy;
		const q2zy = q1zy + azzy * bzzy + ayzy * byzy;

		const kxz = (4/3) * (Math.sqrt(2 * q1xz * q2xz) - q2xz) / (axxz * bzxz - azxz * bxxz);
		const kzy = (4/3) * (Math.sqrt(2 * q1zy * q2zy) - q2zy) / (ayzy * byzy - ayzy * bzzy);

		this.p2.x = xc + x1xz + kxz * y1zy;
		this.p2.y = yc + y1zy + kzy * z1zy;
		this.p2.z = zc + z1zy - kzy * y1zy;

		this.p3.x = xc + x4xz + kxz * z4xz;
		this.p3.y = yc + y4zy - kzy * z4zy;
		this.p3.z = zc + z4zy + kzy * y4zy;

		console.log(this.p3);

		this.p4.x = x4xz;
		this.p4.y = y4zy;
		this.p4.z = z4zy;

		this.p2Mesh = createControlPointMesh(this.scene);
		this.p2Mesh.position = this.p2;

		this.p3Mesh = createControlPointMesh(this.scene);
		this.p3Mesh.position = this.p3;
		this.p4Mesh.position = this.p4;

		this.updateTrackMeshes();
	}

	updateControlPointMeshes() {
		this.p1Mesh.position = this.p1;
		this.p4Mesh.position = this.p4;
	}

	updateTrackMeshes() {
		const curve = Curve3.CreateCubicBezier(this.p1, this.p2, this.p3, this.p4, 10);

		this.editTrackSegmentMesh = createTrackSegmentMesh(this.name, curve.getPoints(), this.editTrackSegmentMesh, this.scene);
	}
};

// positionGizmo.zGizmo.dragBehavior.onDragObservable.add((event)=>{
// 	p4.position.addInPlace(Vector3.Forward().scale(event.dragDistance));

// 	editTrackSegmentCurve = Curve3.CreateCubicBezier(
// 		p1.position,
// 		p2,
// 		p3,
// 		p4.position,
// 		10
// 	);

// 	editTrackSegment = MeshBuilder.CreateLines("Track Segment", {
// 		points: editTrackSegmentCurve.getPoints(),
// 		updatable: true,
// 		instance: editTrackSegment
// 	}, scene);
// });