<template>
	<div class="ui-overlay">
		<controls-camera />
	</div>
</template>

<script>
import ControlsCamera from '@/components/ControlsCamera';

export default {
	name: 'controls-overlay',

	components: {
		ControlsCamera
	}
}
</script>

<style lang="scss" scoped>
.ui-overlay {
	position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
	left: 0;
	pointer-events: none;
	padding: 1em;
}

.camera-controls {
	text-align: right;
}
</style>
