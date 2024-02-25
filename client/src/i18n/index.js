import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import ptJson from './locales/pt.json'
import enJson from './locales/en.json'

const i18nConfig = {
    resources: {
        'pt': {...ptJson},
        'pt-BR': {...ptJson},
        'en': {...enJson},
        'en-US': {...enJson},
    }
  }

i18n.use(LanguageDetector).use(initReactI18next).init(i18nConfig)

export default i18n