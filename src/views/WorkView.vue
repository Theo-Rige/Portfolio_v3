<template>
	<main data-simplebar class="work">
		<section class="head">
			<h1 v-html="trl('Mes <em>projets</em>')"></h1>
		</section>
		<section class="projects">
			<div class="filters">
				<LinkSite :label="trl('Tout')" button line @click="filter(-1)" :class="{ active: category == -1 }" />
				<LinkSite label="D&D" button line @click="filter(0)" :class="{ active: category == 0 }" />
				<LinkSite label="Design" button line @click="filter(1)" :class="{ active: category == 1 }" />
				<LinkSite :label="trl('Développement')" button line @click="filter(2)" :class="{ active: category == 2 }" />
			</div>
			<hr />
			<TransitionGroup name="list" tag="ul">
				<ProjectLink v-for="project in list" :key="project.id" :project="project" :target="'/work/' + project.slug" full />
			</TransitionGroup>
		</section>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { supabase } from '@/supabase'
import { useTranslate } from '../plugins/translate'

import LinkSite from '../components/LinkSite.vue'
import ProjectLink from '../components/ProjectLink.vue'

const projects = ref({})
const list = ref({})
const category = ref(-1)

const getProjects = async () => {
	try {
		let { data, error } = await supabase.from('projects').select().order('date', { ascending: false })

		if (error) throw error

		if (data) {
			list.value = projects.value = data
		}
	} catch (error) {
		console.error('work.projects', error.message)
	}
}

const trl = useTranslate()

const filter = (id) => {
	category.value = id
	list.value = id < 0 ? projects.value : projects.value.filter((project) => project.category == id)
}

onMounted(() => {
	getProjects()
})
</script>

<style lang="scss">
.work {
	.head {
		h1 {
			font-size: 4rem;
			font-weight: 200;
			text-transform: uppercase;
			width: 100%;

			em {
				font-weight: 600;
			}
		}
	}

	.projects {
		margin-bottom: space(10);

		.filters {
			display: flex;
			align-items: center;
			gap: space(5);
			margin-bottom: space(5);
		}

		hr {
			height: 1px;
			width: 100%;
		}
	}
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
	position: absolute;
}
</style>
