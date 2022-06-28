<template>
	<button>
		<span>{{ props.label }}</span>
		<i class="ri-arrow-right-line" v-if="props.icon"></i>
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
