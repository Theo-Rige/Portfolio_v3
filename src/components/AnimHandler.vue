<template>
	<span v-for="letter in props.text.split('')" :key="letter" ref="letters" class="letter">{{ letter }}</span>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
	text: {
		type: String,
		required: true,
	},
})

const letters = ref([])

onMounted(() => {
	const space = props.text.indexOf(' ')
	if (space > 0) {
		letters.value[space].replaceWith(' ')
	}
})
</script>

<style lang="scss">
.letter {
	display: inline-block;
	line-height: 1.25em;
	opacity: 0;
}
</style>
