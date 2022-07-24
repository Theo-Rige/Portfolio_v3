<template>
	<main data-simplebar class="project">
		<section class="head">
			<div class="back" @click="router.back()">
				<div class="flex">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path fill="none" d="M0 0h24v24H0z" />
						<path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" />
					</svg>
				</div>
			</div>
			<h1>{{ project.name }}</h1>
			<em>{{ project.type }}</em>
			<hr />
		</section>
		<section class="meta">
			<p>{{ trl(project.description) }}</p>
			<LinkSite :label="trl('Visiter le site')" :target="project.link" link fill />
			<h2 class="subtitle" v-html="trl('Technos <em>utilisées</em>')"></h2>
			<ul>
				<li v-for="techno in project.technos" :key="techno">{{ techno }}</li>
			</ul>
		</section>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { supabase } from '@/supabase'
import { useTranslate } from '../plugins/translate'

import LinkSite from '../components/LinkSite.vue'

const route = useRoute()
const router = useRouter()
const project = ref({})

const getProject = async (name) => {
	try {
		let { data, error } = await supabase.from('projects').select().eq('slug', name).single()

		if (error) throw error

		if (data) {
			project.value = data
		}
	} catch (error) {
		console.error('work.project', error.message)
	}
}

const trl = useTranslate()

onMounted(() => {
	getProject(route.params.name)
})
</script>

<style lang="scss">
.project {
	.head {
		position: relative;
		display: flex;
		flex-direction: column;

		.back {
			height: space(3);
			width: space(3);
			overflow: hidden;
			position: absolute;
			top: space(10);

			.flex {
				position: absolute;
				display: flex;
				gap: space(1);
				-webkit-transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
				transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}

			&:hover {
				cursor: pointer;

				.flex {
					transform: translateX(-50%);
				}
			}
		}

		h1 {
			font-size: 4rem;
			font-weight: 200;
			text-transform: uppercase;
			width: 100%;
			margin-bottom: space(2);
		}

		em {
			font-size: 1.5rem;
		}

		hr {
			width: 100%;
			height: 1px;
			margin-top: space(5);
		}
	}

	.meta {
		padding-top: space(5);
		margin-bottom: space(10);
		display: flex;
		flex-direction: column;
		gap: space(3);

		p {
			font-size: 1.25rem;
		}

		h2 {
			margin: space(7) 0 0 0;
		}

		ul {
			list-style-image: var(--star);
			padding-left: space(3);

			li {
				font-size: 1.25rem;
				margin-bottom: space(2);
				padding-left: space(2);

				&::marker {
					font-size: inherit;
					color: red !important;
				}
			}
		}
	}
}
</style>
