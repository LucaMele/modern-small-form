import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwind from '../_shared/tailwind.css?inline';
import i18next from 'i18next';
import '../components/form';
import '../components/summary';

@customElement('minimum-wage-app')
export class MinimumWageApp extends LitElement {
    static styles = css`
        ${unsafeCSS(tailwind)}
    `;

    @state()
    private _language: string = 'en';

    @state()
    private _formData = null;

    get language() {
        return this._language;
    }

    @property({ type: String })
    set language(value: string) {
        const oldValue = this._language;
        this._language = value;
        this.requestUpdate('language', oldValue);
    }

    handleFormSubmit(event: CustomEvent) {
        const { formData } = event.detail;
        this._formData = formData;
    }

    async setLanguage(lang: string) {
        this.language = lang;
        i18next.changeLanguage(lang);
    }

    render() {
        return html`
            <div class="animate-fade-in min-h-screen flex min-w-72 flex-col justify-center w-full items-center bg-gray-100 ">
                <header
                    class="animate-drop-in w-full flex justify-between items-center  shadow-md bg-gradient-to-r from-[#73B01E] to-[#55742A] p-4"
                >
                    <img
                        src="https://www.enovetic.ch/wp-content/uploads/2023/11/f13da824aed7ccb4d28bff6e8158b58d-e1700759022261.png"
                        alt="Logo"
                        class="h-4"
                    />
                    <div class="flex space-x-4">
                        <button @click="${() => this.setLanguage('en')}" class="text-white font-semibold">
                            ${i18next.t('language.en')}
                        </button>
                        <button @click="${() => this.setLanguage('de')}" class="text-white font-semibold">
                            ${i18next.t('language.de')}
                        </button>
                        <button @click="${() => this.setLanguage('fr')}" class="text-white font-semibold">
                            ${i18next.t('language.fr')}
                        </button>
                        <button @click="${() => this.setLanguage('it')}" class="text-white font-semibold">
                            ${i18next.t('language.it')}
                        </button>
                    </div>
                </header>

                <div class="w-full min-w-72 bg-[#F9F9F4] shadow-lg rounded-lg p-6 mt-6 animate-drop-in" @form-submit="${
                    this.handleFormSubmit
                }">
                    ${!this._formData ? html`<wage-form .language=${this._language}></wage-form>` : ''}
                    ${this._formData ? html`<wage-summary .formData=${this._formData}></wage-summary>` : ''}
                </div>
                </div>
            </div>
        `;
    }
}
