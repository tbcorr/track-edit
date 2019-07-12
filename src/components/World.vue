<template>
	<canvas id="canvas" ref="canvas"></canvas>
</template>

<script>
import { mapState } from 'vuex';
import { Scene, Engine, ArcRotateCamera, Vector3, PointerEventTypes, Plane, RayHelper, Color3 } from 'babylonjs';
import { setup } from '@/world';

export default {
	name: 'viewport',

	data() {
		return {

		};
	},

	computed: {
		...mapState([
			'worldBackgroundColor'
		])
	},

	methods: {	
		onRender() {
			this.scene.render();
		}
	},

	mounted() {
		setup(this.$refs.canvas);
	}
}
</script>

<style lang="scss" scoped>
canvas {
	width: 100%;
	height: 100%;
}
</style>
