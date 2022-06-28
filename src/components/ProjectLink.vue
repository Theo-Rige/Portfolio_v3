<template>
	<li v-if="full">
		<router-link :to="props.target">
			<div class="title" :style="style">
				<div class="labels">
					<div class="label">{{ props.project.name }}</div>
					<div class="label italic" ref="label">{{ props.project.name }}</div>
				</div>
			</div>
			<div class="meta" v-if="full">
				<span class="type">{{ props.project.type }}</span>
				<hr />
				<span class="date">{{ props.project.date }}</span>
			</div>
		</router-link>
	</li>
	<router-link :to="props.target" v-else>
		<div class="title" :style="style">
			<div class="labels">
				<div class="label">{{ props.project.name }}</div>
				<div class="label italic" ref="label">{{ props.project.name }}</div>
			</div>
		</div>
		<div class="meta" v-if="full">
			<span class="type">{{ props.project.type }}</span>
			<hr />
			<span class="date">{{ props.project.date }}</span>
		</div>
	</router-link>
</template>

<script setup>
import { defineProps, ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
	target: String,
	full: Boolean,
})

const label = ref(null)
const width = ref(null)
const style = ref({})

const update = () => {
	width.value = label.value.clientWidth + 2
	style.value = { width: width.value + 16 + 'px' }
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
a {
	all: unset;
	color: var(--text-color);
	cursor: pointer;
	height: space(20);
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid var(--border-color);

	.title {
		height: 48px;
		display: flex;
		justify-content: center;
		position: relative;
		overflow: hidden;

		.labels {
			position: absolute;
			top: 0;
			display: flex;
			flex-direction: column;
			gap: space(0.5);
			-webkit-transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

			.label {
				font-weight: 500;
				font-size: 3rem;
				color: inherit;
				white-space: nowrap;

				&.italic {
					font-weight: 800;
					font-style: italic;
				}
			}
		}
	}

	.meta {
		display: flex;
		align-items: center;
		gap: space(5);
		font-size: 1.5rem;

		hr {
			width: 1px;
			height: space(5);
		}
	}

	&:hover,
	&.active,
	&.router-link-exact-active {
		.labels {
			transform: translateY(calc(-50% - 2px));
		}
	}
}
</style>
