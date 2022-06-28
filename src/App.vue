<template>
	<div class="transition">
		<div class="background" ref="transition">
			<div class="title">{{ route }}</div>
		</div>
	</div>
	<HeaderSite />
	<SocialSite />
	<router-view v-slot="{ Component }">
		<transition @before-leave="onBeforeLeave" @enter="onEnter" @after-enter="onAfterEnter">
			<component :is="Component" />
		</transition>
	</router-view>
	<FooterSite />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from './plugins/translate'

import anime from 'animejs/lib/anime.es.js'

import HeaderSite from './parts/HeaderSite.vue'
import SocialSite from './parts/SocialSite.vue'
import FooterSite from './parts/FooterSite.vue'

const locale = useLocale()

const route = computed(() => {
	if (useRoute().meta[locale.value] !== undefined) {
		return useRoute().meta[locale.value]
	} else {
		return useRoute().params.name
	}
})

const transition = ref(null)

const onBeforeLeave = () => {
	anime({
		targets: transition.value,
		translateY: ['-100%', '0%'],
		duration: 500,
		easing: 'easeInOutCirc',
	})
}

const onEnter = (el, done) => {
	setTimeout(done, 600)
}

const onAfterEnter = () => {
	anime({
		targets: transition.value,
		translateY: ['0%', '100%'],
		easing: 'easeInQuint',
		duration: 1000,
		delay: 1000,
	})
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}

body {
	position: relative;
	margin: 0;
	padding: 0;
	// height: 100vh;
	font-family: $west;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	@include light-colors;
	background: var(--bkg-color);
	color: var(--text-color);

	main {
		margin-top: space(10);
		height: calc(100vh - space(20));
	}

	.simplebar-track {
		.simplebar-scrollbar {
			&::before {
				background: var(--border-color);
			}
		}
	}

	section {
		margin: 0 calc($main-space / 2);
		padding: 0 space(15);
		display: flex;
		flex-direction: column;
	}

	h2.subtitle {
		font-size: 1.25rem;
		font-weight: 200;
		text-transform: uppercase;
		margin-bottom: space(3);
		width: 100%;

		em {
			font-weight: 600;
		}
	}

	hr {
		all: unset;
		background: var(--border-color);
	}

	i {
		font-size: space(3);
	}

	p {
		font-weight: 300;
	}
}

/* Dark theme colors */
body.dark-theme {
	@include dark-colors;
}

/* Styles for users who prefer dark mode at the OS level */
@media (prefers-color-scheme: dark) {
	/* defaults to dark theme */
	body {
		@include dark-colors;
	}
	/* Override dark mode with light mode styles if the user decides to swap */
	body.light-theme {
		@include light-colors;
	}
}

.transition {
	position: fixed;
	z-index: 100;
	inset: 0;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	pointer-events: none;

	.background {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		inset: 0;
		background-color: var(--text-color);
		transform: translateY(-100%);
		color: var(--bkg-color);
		font-size: 4rem;
	}
}
</style>
