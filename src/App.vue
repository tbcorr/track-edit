<template>
  <div class="app">
    <el-container class="app-container">
      <el-aside width="25%">
        <controls-menu />
      </el-aside>
      <el-main class="ui-viewport" >
        <world />
        <controls-overlay />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import World from '@/components/World';
import ControlsMenu from '@/components/ControlsMenu';
import ControlsOverlay from '@/components/ControlsOverlay';

export default {
  name: 'app',

  components: {
    World,
    ControlsMenu,
    ControlsOverlay
	}
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-container {
  height: 100%;
}

.ui-viewport {
  position: relative;
  padding: 0;
}
</style>
