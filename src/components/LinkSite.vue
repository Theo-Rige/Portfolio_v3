<template>
	<button v-if="button" :class="{ fill: fill, line: line }" :type="props.type">
		<div class="text" :style="style">
			<div class="labels">
				<div class="label">{{ props.label }}</div>
				<div class="label bold" ref="label">{{ props.label }}</div>
			</div>
		</div>
		<div class="icon" v-if="props.plane">
			<div class="plane">
				<i class="ri-send-plane-fill"></i>
				<i class="ri-send-plane-fill"></i>
			</div>
		</div>
	</button>
	<a v-else-if="link" :href="props.target" target="_blank" :class="{ fill: fill, line: line }">
		<div class="text" :style="style">
			<div class="labels">
				<div class="label">{{ props.label }}</div>
				<div class="label bold" ref="label">{{ props.label }}</div>
			</div>
		</div>
	</a>
	<router-link v-else :to="props.target" :class="{ fill: fill, line: line }">
		<div class="text" :style="style">
			<div class="labels">
				<div class="label">{{ props.label }}</div>
				<div class="label bold" ref="label">{{ props.label }}</div>
			</div>
		</div>
	</router-link>
</template>

<script setup>
import { defineProps, ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: null,
	},
	button: Boolean,
	link: Boolean,
	fill: Boolean,
	line: Boolean,
	plane: Boolean,
	target: String,
})

const label = ref(null)
const width = ref(null)
const style = ref({})

const update = () => {
	width.value = label.value.clientWidth + 2

	style.value = {
		width: width.value + 'px',
	}
}

onMounted(() => {
	update()
})

watch(
	() => props.label,
	async () => {
		await nextTick()
		update()
	}
)
</script>

<style lang="scss" scoped>
a,
button {
	all: unset;
	color: var(--text-color);
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: space(2);
	width: fit-content;

	.text {
		height: 1.125rem;
		position: relative;
		overflow: hidden;

		.labels {
			position: absolute;
			top: 0;
			display: flex;
			flex-direction: column;
			-webkit-transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

			.label {
				font-weight: 300;
				font-size: 1.125rem;
				color: inherit;
				white-space: nowrap;

				&.bold {
					font-weight: 500;
				}
			}
		}
	}

	.icon {
		position: relative;
		height: space(3);
		width: space(3);
		overflow: hidden;

		.plane {
			position: absolute;
			right: 0;
			display: flex;
			flex-direction: column;
			-webkit-transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

			i:nth-child(1) {
				margin-left: space(3);
			}
		}
	}

	&:hover,
	&.active,
	&.router-link-exact-active {
		.labels {
			transform: translateY(-50%);
		}

		.plane {
			transform: translate(50%, -50%);
		}

		&.line {
			color: var(--bkg-color);
			background: var(--text-color);
		}
	}

	&.fill {
		color: var(--bkg-color);
		border-radius: 100px;
		background: var(--text-color);
		padding: space(2) space(3);
	}

	&.line {
		border-radius: 100px;
		border: 1px solid var(--text-color);
		padding: space(2) space(3);
		transition: background 0.3s ease, color 0.3s ease;
	}
}
</style>
