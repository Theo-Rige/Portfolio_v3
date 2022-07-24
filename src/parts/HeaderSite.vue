<template>
	<header>
		<nav>
			<router-link to="/">
				<svg width="466" height="400" viewBox="0 0 466 400" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M300 0L0 4.82053e-06V100H100V400H200V100H300V0Z" fill="white" />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M388.582 157.403C396.12 139.204 400 119.698 400 100H300C300 106.566 298.707 113.068 296.194 119.134C293.681 125.2 289.998 130.712 285.355 135.355C280.712 139.998 275.2 143.681 269.134 146.194C263.068 148.707 256.566 150 250 150L250 250C269.698 250 289.204 246.12 307.403 238.582C325.601 231.044 342.137 219.995 356.066 206.066C369.995 192.137 381.044 175.601 388.582 157.403Z"
						fill="#f8ea3e"
					/>
					<path d="M350 400L300 300H415.5L465.5 400H350Z" fill="white" />
				</svg>
			</router-link>
			<!-- <LinkSite target="/" :label="trl('Accueil')" /> -->
			<LinkSite target="/work" :label="trl('Projets')" />
		</nav>
		<div class="actions">
			<div class="theme-switch" @click="themeSwitch">
				<Transition>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" v-if="dark">
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
						/>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" v-else>
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
					</svg>
				</Transition>
			</div>
			<hr />
			<LinkSite label="FR" :class="{ active: locale === 'fr' }" @click="switcher('fr')" button />
			<hr />
			<LinkSite label="EN" :class="{ active: locale === 'en' }" @click="switcher('en')" button />
		</div>
	</header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLocale, useTranslate } from '../plugins/translate'

import LinkSite from '../components/LinkSite.vue'

const locale = useLocale()
const trl = useTranslate()

const switcher = (lang) => {
	if (lang === locale) {
		return
	} else if (lang === 'fr' && locale.value === 'en') {
		locale.value = 'fr'
	} else {
		locale.value = 'en'
	}
}

const dark = ref(false)

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const themeSwitch = () => {
	dark.value = dark.value !== true
	if (prefersDarkScheme.matches) {
		document.body.classList.toggle('light-theme')
	} else {
		document.body.classList.toggle('dark-theme')
	}
}

onMounted(() => {
	if (prefersDarkScheme.matches) {
		dark.value = true
	} else {
		dark.value = false
	}
})
</script>

<style lang="scss" scoped>
header {
	height: $main-space;
	padding: 0 $main-space;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	z-index: 1;
	background: var(--bkg-color);

	nav {
		display: flex;
		align-items: center;
		gap: space(5);

		svg {
			height: 30px;
			width: 35px;

			path {
				fill: var(--text-color);

				&:nth-child(2) {
					fill: #f8ea3e;
				}
			}
		}
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 20px;

		.theme-switch {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			&:hover {
				cursor: pointer;
			}

			i {
				color: var(--text-color);
				position: absolute;
				right: 0px;
			}
		}

		hr {
			width: 1px;
			height: space(3);
		}
	}
}

.v-enter-active,
.v-leave-active {
	transition: all 0.25s ease-out;
}

.v-enter-from {
	opacity: 0;
	transform: translateY(30px);
}

.v-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}
</style>
