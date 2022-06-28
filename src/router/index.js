import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: { title: 'Accueil | Théo Rigé', fr: 'Accueil', en: 'Home' },
	},
	{
		path: '/work',
		name: 'work',
		component: () => import('../views/WorkView.vue'),
		meta: { title: 'Projets | Théo Rigé', fr: 'Projets', en: 'Work' },
	},
	{
		path: '/work/:name',
		name: 'project',
		component: () => import('../views/ProjectView.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.meta.title !== undefined) {
		document.title = to.meta.title
	} else {
		document.title = to.params.name.charAt(0).toUpperCase() + to.params.name.slice(1) + ' - Théo Rigé'
	}

	next()
})

export default router
