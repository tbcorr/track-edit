<template>
	<canvas id="canvas" ref="canvas"></canvas>
</template>

<script>
import { mapState } from 'vuex';
import { setup } from '@/world';

export default {
	name: 'viewport',

	computed: {
		...mapState([
			'worldBackgroundColor'
		])
	},

	mounted() {
		setup(this.$refs.canvas)
	}
}
</script>

<style lang="scss" scoped>
canvas {
	width: 100%;
	height: 100%;
}
</style>
