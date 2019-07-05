<template>
  <div class="controls-menu">
		<el-collapse>
			<el-collapse-item title="World Settings">
				<el-row :gutter="20">
					<el-col :span="12" class="control">
						<span class="control-label">Background Color</span>
						<el-color-picker size="mini" v-model="worldBackground"/>
					</el-col>
					<el-col :span="12" class="control">
						<span class="control-label">Units</span>
						<el-select v-model="value">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</el-collapse-item>
			<el-collapse-item title="Track Settings">
				<el-row :gutter="20">
					<el-col :span="12" class="control">

					</el-col>
				</el-row>
				<el-divider></el-divider>
				<el-row :gutter="20">
					<el-col :span="12" class="control">

					</el-col>
				</el-row>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'controls-menu',
	
	computed: {
		...mapState([
			'worldBackgroundColor'
		]),

		worldBackground: {
			get() {
				return this.worldBackgroundColor;
			},

			set(color) {
				this.updateWorldBackgroundColor(color);
			}
		}
	},

	methods: {
		...mapMutations([
			'updateWorldBackgroundColor'
		])
	}
}
</script>

<style lang="scss">
.el-collapse-item__header {
	text-transform: uppercase;
}

.controls-menu {
	padding: 0 1em 0 1em;
}

.control {
	text-align: left;

	* {
		vertical-align: middle;
	}
}

.control-label {
	display: inline-block;
	font-weight: bold;
	margin: 0 0.5em 0 0;
}
</style>
