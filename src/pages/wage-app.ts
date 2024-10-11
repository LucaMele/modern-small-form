import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwind from '../_shared/tailwind.css?inline';
import i18next from 'i18next';
import '../components/form';
import '../components/summary';

// interface CalculationData {
//     dateOfBirth: string;
//     jobType: string;
//     location: string;
//     applicationDate: string;
// }

@customElement('minimum-wage-app')
export class MinimumWageApp extends LitElement {
    static styles = css`
        ${unsafeCSS(tailwind)}
    `;

    @state()
    private _language: string = 'en';

    // @state()
    // private minimumWageResult: number | null = null;

    get language() {
        return this._language;
    }

    @property({ type: String })
    set language(value: string) {
        const oldValue = this._language;
        this._language = value;
        this.requestUpdate('language', oldValue);
    }

    async setLanguage(lang: string) {
        this.language = lang;
        i18next.changeLanguage(lang);
    }

    // async handleCalculateWage() {
    //     const calculationData: CalculationData = {
    //         dateOfBirth: (this.shadowRoot?.getElementById('dob') as HTMLInputElement)?.value,
    //         jobType: (this.shadowRoot?.getElementById('jobType') as HTMLInputElement)?.value,
    //         location: (this.shadowRoot?.getElementById('location') as HTMLInputElement)?.value,
    //         applicationDate: (this.shadowRoot?.getElementById('applicationDate') as HTMLInputElement)?.value,
    //     };

    //     const minimumWage = await this.calculateWage(calculationData);
    //     this.minimumWageResult = minimumWage;
    // }

    // async calculateWage(data: CalculationData) {
    //     const response = await fetch('/api/calculate-minimum-wage', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });
    //     const result = await response.json();
    //     return result.minimumWage;
    // }

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

                <div class="w-full min-w-72">
                    <wage-form .language=${this._language}></wage-form>
                    <wage-summary></wage-summary>
                </div>
                </div>
            </div>
        `;
    }
}
