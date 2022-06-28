<template>
	<main data-simplebar class="home">
		<section class="hero">
			<canvas id="gradient" data-transition-in />
			<div class="name">
				<AnimHandler :text="headings.name" />
			</div>
			<h2>
				<div class="light">
					<AnimHandler :text="headings.light" />
				</div>
				<div class="bold">
					<AnimHandler :text="headings.bold" />
					<div class="italic">
						<AnimHandler :text="headings.italic" />
					</div>
				</div>
			</h2>
			<hr />
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu tempor sit nec ut. Sapien posuere sed donec facilisis vitae tincidunt gravida a.</p>
		</section>
		<section class="about">
			<div class="profile">
				<img src="https://source.boringavatars.com/marble/160/MaryRoebling?colors=7E949E,AEC2AB,EBCEA0,FC7765,FF335F" alt="Profile picture" />
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
			</div>
			<hr />
			<div class="intro">
				<h1>{{ trl('Je donne vie à vos projets par le design et le web') }}</h1>
				<p>
					{{
						trl(
							"Ma passion pour le design et le développement web, me permet de mener à bien tous vos projet web de la conception à la réalisation. Le tout en étant à l'affut des dernières tendances et technologies, pour un rendu original et pixel perfect."
						)
					}}
				</p>
				<!-- <LinkSite label="A propos" target="/work" fill icon /> -->
			</div>
		</section>
		<section class="work">
			<h2 class="subtitle" v-html="trl('Projets <em>récents</em>')"></h2>
			<hr />
			<ProjectLink v-for="project in projects" :key="project.id" :project="project" :target="'/work/' + project.slug" />
			<LinkSite :label="trl('Plus de projets')" target="/work" fill />
		</section>
		<section class="skills">
			<h2 class="subtitle" v-html="trl('Je peux <em>vous aider</em> avec')"></h2>
			<hr />
			<div class="flex">
				<div class="skill design">
					<h3>Design</h3>
					<p>
						{{ trl('Avec un souci du détail et de qualité, je fournis des designs solides et conviviaux. Une image de marque solide et cohérente est la base de tout site web réussi.') }}
					</p>
					<h4>Adobe</h4>
					<ul>
						<li>Illustrator</li>
						<li>Photoshop</li>
						<li>Premier Pro</li>
						<li>After Effect</li>
						<li>InDesign</li>
					</ul>
					<h4>{{ trl('Prototypage') }}</h4>
					<ul>
						<li>Figma</li>
					</ul>
				</div>
				<hr />
				<div class="skill development">
					<h3>{{ trl('Développement') }}</h3>
					<p>
						{{
							trl(
								"Je crée des sites web évolutifs à partir de zéro qui s'intègrent parfaitement au design. Je me concentre sur les micro animations, les transitions et l'interaction. Pour la gestion du contenu, j'utilise Strapi CMS."
							)
						}}
					</p>
					<h4>CMS</h4>
					<ul>
						<li>Strapi</li>
						<li>Wordpress</li>
					</ul>
					<h4>Framework</h4>
					<ul>
						<li>Vue JS</li>
						<li>Laravel</li>
					</ul>
					<h4>Style</h4>
					<ul>
						<li>SASS</li>
						<li>Atomic design</li>
					</ul>
				</div>
			</div>
		</section>
		<section class="contact">
			<h2 class="subtitle" v-html="trl('Me <em>contacter</em>')"></h2>
			<hr />
			<form name="contact" ref="form" @submit.prevent="send" netlify>
				<div class="overlay" v-show="info.length > 0">
					<span>{{ info }}</span>
				</div>
				<div class="flex">
					<div class="field">
						<label for="last_name">{{ trl('Nom') }}</label>
						<input type="text" name="last_name" id="last_name" required />
					</div>
					<div class="field">
						<label for="first_name">{{ trl('Prénom') }}</label>
						<input type="text" name="first_name" id="first_name" />
					</div>
				</div>
				<div class="field">
					<label for="email">Email</label>
					<input type="email" name="email" id="email" required />
				</div>
				<div class="field">
					<label for="message">Message</label>
					<textarea name="message" id="message" cols="30" rows="10" required></textarea>
				</div>
				<LinkSite :label="trl('Envoyer')" button fill type="submit" plane />
			</form>
			<hr />
			<span>rige.theo.pro[at]gmail.com</span>
			<span>06.47.37.33.46</span>
		</section>
	</main>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

import { supabase } from '@/supabase'
import anime from 'animejs/lib/anime.es.js'
import { useTranslate } from '../plugins/translate'
import { Gradient } from '@/gradient'

import AnimHandler from '../components/AnimHandler.vue'
import LinkSite from '../components/LinkSite.vue'
import ProjectLink from '../components/ProjectLink.vue'

const projects = ref({})
// const form = reactive({
// 	last_name: '',
// 	first_name: '',
// 	email: '',
// 	message: '',
// })
const form = ref(null)
const info = ref('')

const getProjects = async () => {
	try {
		let { data, error } = await supabase.from('projects').select().order('date', { ascending: false }).limit(3)

		if (error) throw error

		if (data) {
			projects.value = data
		}
	} catch (error) {
		console.error('home.projects', error.message)
	}
}

const send = async () => {
	// try {
	// 	let { error } = await supabase.from('messages').insert([form])

	// 	if (error) {
	// 		throw error
	// 	} else {
	// 		info.value = trl('Votre message à bien été envoyé')
	// 	}
	// } catch (error) {
	// 	console.error('home.message', error.message)
	// 	info.value = trl('Une erreur est survenue')
	// }

	let formData = new FormData(form.value)
	fetch('/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(formData).toString(),
	})
		.then(() => (info.value = trl('Votre message à bien été envoyé')))
		.catch((error) => alert(error))
}

const trl = useTranslate()

const gradient = new Gradient()

const headings = reactive({
	name: 'Théo RIGÉ',
	light: trl('DEVELOPPEUR ET'),
	bold: trl('DESIGNER '),
	italic: trl('WEB'),
})

const letters = computed(() => {
	let count = 0
	for (const heading in headings) {
		count += headings[heading].length
	}
	return count
})

const delay = 40

onMounted(() => {
	gradient.initGradient('#gradient')

	getProjects()

	anime
		.timeline()
		.add({
			targets: '.hero',
			easing: 'easeInCubic',
			delay: 2400,
			clipPath: [
				{ value: 'inset(calc(50% - 80px) calc(50% - 80px))', duration: 0 },
				{ value: 'inset(calc(50% - 80px) calc(0% - 80px))', duration: 800 },
				{ value: 'inset(calc(0% - 80px) calc(0% - 80px))', duration: 800, delay: 100 },
			],
		})
		.add({
			targets: '.letter',
			duration: 600,
			delay: anime.stagger(delay, { start: 200 }),
			easing: 'easeOutQuint',
			translateY: ['800%', '0%'],
			opacity: [
				{ value: 0, easing: 'linear' },
				{ value: 1, easing: 'linear' },
			],
		})
		.add(
			{
				targets: '.hero hr',
				duration: letters.value * delay,
				easing: 'easeInCubic',
				width: ['0%', '100%'],
			},
			'-=' + letters.value * delay
		)
})
</script>

<style lang="scss">
section:not(.hero) {
	padding: space(20) calc((100% - 1200px) / 2) 0 calc((100% - 1200px) / 2);
}

.home {
	.hero {
		height: calc(100vh - 2 * $main-space);
		position: relative;
		justify-content: center;
		color: $dark-text-color;
		overflow: hidden;
		clip-path: inset(calc(50% - 80px) calc(50% - 80px));

		#gradient {
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			--gradient-color-1: #ad98d5;
			--gradient-color-2: #b1ead6;
			--gradient-color-3: #f2a069;
			--gradient-color-4: #98d2fd;
		}

		.name {
			font-style: italic;
			font-size: 1.5rem;
			font-weight: 800;
		}

		h2 {
			all: unset;
			margin-block-start: 0;
			margin-block-end: 0;
			margin-inline-start: 0;
			margin-inline-end: 0;
			font-size: 7.5rem;
			font-weight: 200;
			display: flex;
			flex-direction: column;
			transform: translateX(-8px);

			.bold {
				font-weight: 900;

				.italic {
					font-style: italic;
					display: inline-block;
				}
			}
		}

		hr {
			width: 0%;
			height: 1px;
			background: #dedfe280;
		}

		p {
			font-size: 1.5rem;
			font-weight: 400;
			max-width: 800px;
			opacity: 0;
			display: none;
		}
	}

	.about {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: space(5);

		.profile {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			height: space(20);
			width: space(20);
			overflow: hidden;
			flex-shrink: 0;

			svg {
				position: absolute;
				height: space(5);
			}

			img {
				position: absolute;
			}
		}

		hr {
			width: 1px;
			height: space(20);
		}

		.intro {
			display: flex;
			flex-direction: column;
			gap: space(3);

			h1 {
				font-size: 2rem;
				// margin-bottom: space(3);
			}

			p {
				font-size: 1.125rem;
				line-height: 1.5rem;
			}
		}
	}

	.work {
		align-items: center;

		hr {
			height: 1px;
			width: 100%;
		}

		.fill {
			margin-top: space(5);
		}
	}

	.skills {
		margin-bottom: space(10);

		hr {
			height: 1px;
			width: 100%;
		}

		.flex {
			margin-top: space(5);
			display: flex;
			gap: 40px;

			.skill {
				h3 {
					font-size: 2rem;
					width: fit-content;
					margin-bottom: space(2);
				}

				p {
					font-size: 1.25rem;
					font-weight: 200;
					line-height: 150%;
				}

				h4 {
					margin-top: space(4);
					padding-bottom: space(2);
					border-bottom-width: 2px;
					border-bottom-style: solid;
					font-size: 1.25rem;
					font-weight: 500;
				}

				ul {
					list-style-image: var(--star);
					padding-left: space(3);

					li {
						font-size: 1.25rem;
						margin-top: space(2);
						padding-left: space(2);

						&::marker {
							font-size: inherit;
							color: red !important;
						}
					}
				}

				&.development {
					h3 {
						background: linear-gradient(90deg, #334899 0%, #b1ead6 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						background-clip: text;
					}

					h4 {
						border-image: linear-gradient(-90deg, #334899 0%, #b1ead6 100%) 1;
					}
				}

				&.design {
					h3 {
						background: linear-gradient(90deg, #f96046 0%, #61609d 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						background-clip: text;
					}

					h4 {
						border-image: linear-gradient(-90deg, #f96046 0%, #61609d 100%) 1;
					}
				}
			}

			hr {
				width: 1px;
				height: auto;
				flex-shrink: 0;
			}
		}
	}

	section.contact {
		align-items: center;
		background: $dark-bkg-color;
		padding: space(10) calc((100% - 1200px) / 2) space(10) calc((100% - 1200px) / 2);
		color: $dark-text-color;

		hr {
			height: 1px;
			width: 100%;
			background: $dark-border-color;
		}

		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: space(5);
			margin: space(5) 0;
			width: 100%;
			position: relative;

			.overlay {
				position: absolute;
				inset: 0;
				background: var(--bkg-color);
				justify-content: center;
				display: flex;
				align-items: center;
				padding: space(5);
			}

			.flex {
				display: flex;
				justify-content: space-between;
				gap: space(5);
				width: 100%;
			}

			.field {
				display: flex;
				flex-direction: column;
				gap: space(1);
				flex-grow: 1;
				width: 100%;

				label {
					font-size: 1.25rem;
					font-weight: 500;
				}

				input {
					all: unset;
					height: space(5);
					caret-color: var(--text-color);
					border-bottom: 1px solid $dark-border-color;
				}

				textarea {
					all: unset;
					padding: space(2);
					caret-color: $dark-text-color;
					margin-top: space(1);
					border: 1px solid $dark-border-color;
				}

				.fill {
					background: $dark-text-color !important;
				}
			}
		}

		span {
			margin-top: space(5);
		}
	}
}
</style>
