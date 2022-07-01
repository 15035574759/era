import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
import ts from './ts' //繁体中文
Vue.use(VueI18n)
const lang = 'en'
export const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || lang, // 语言标识,
    messages: {
      zh: {
        ...zh
      },
      en:{
        ...en
      },
      ts:{
        ...ts
      },
    },
    silentTranslationWarn:true
})
export function $changeLanguage(lang) {
  i18n.locale = lang
  localStorage.setItem('lang', lang)
}