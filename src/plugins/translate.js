import { reactive, ref, watch, inject } from 'vue'
import { supabase } from '@/supabase'
// import translations from '@/languages/en.json'

const keyTranslate = Symbol('translate')
const keyLocale = Symbol('locale')

const translations = reactive(new Map())

export const useTranslate = () => inject(keyTranslate)
export const useLocale = () => inject(keyLocale)

const getTranslations = async () => {
	try {
		let { data, error, status } = await supabase.from('locales').select()

		if (error && status !== 406) throw error

		if (data) {
			data.forEach((string) => {
				translations.set(string.fr, string.en)
			})
		}
	} catch (error) {
		console.error('translate.locales', error.message)
	}
}

export default {
	async install(app) {
		const locale = ref('fr')

		const cookies = decodeURIComponent(document.cookie).split(';')
		for (const cookie in cookies) {
			const values = cookies[cookie].split('=')
			if (values[0] === 'locale' && values[1] != undefined) {
				locale.value = values[1]
			}
		}

		getTranslations()

		const translate = (text) => {
			if (!translations.has(text)) {
				return text
			} else {
				if (locale.value == 'fr') {
					return text
				} else {
					return translations.get(text)
				}
			}
		}

		watch(locale, (newLocale) => {
			document.cookie = 'locale=' + newLocale
		})

		app.config.globalProperties.locale = locale
		app.config.globalProperties.$t = translate
		app.provide(keyLocale, locale)
		app.provide(keyTranslate, translate)
	},
}
