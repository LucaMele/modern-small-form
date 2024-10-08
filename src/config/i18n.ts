import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Statically import the JSON translations
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';

i18n.use(LanguageDetector) // Detect language from browser or query parameters
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false, // Not needed for Lit
        },
        lng: 'en', // Set default language
        resources: {
            en: { translation: en },
            de: { translation: de },
            fr: { translation: fr },
            it: { translation: it },
        },
    });

export default i18n;
