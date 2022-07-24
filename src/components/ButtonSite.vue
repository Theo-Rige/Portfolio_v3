<template>
	<button>
		<span>{{ props.label }}</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" v-if="props.icon">
			<path fill="none" d="M0 0h24v24H0z" />
			<path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
		</svg>
	</button>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	icon: Boolean,
})

const label = ref(null)
</script>

<style lang="scss" scoped>
button {
	all: unset;
	color: var(--text-color);
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: space(4) space(2) 26px space(2);
	overflow: hidden;

	.label {
		font-weight: 300;
		font-size: 1.125rem;
		color: inherit;
	}

	.icon {
		transform: rotate(45deg);
	}

	&:hover {
		.icon {
			transform: rotate(0deg);
		}
	}
}
</style>
