import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './minimum-wage-app.component.css?inline';
import i18next from 'i18next';

interface CalculationData {
    dateOfBirth: string;
    jobType: string;
    location: string;
    applicationDate: string;
}

@customElement('minimum-wage-app')
export class MinimumWageApp extends LitElement {
    static styles = css`
        ${unsafeCSS(style)}
    `;
    private _language: string = 'en';

    @state()
    private minimumWageResult: number | null = null;

    get language() {
        return this._language;
    }

    @property({ type: String })
    set language(value: string) {
        const oldValue = this._language;
        this._language = value;
        this.requestUpdate('language', oldValue);
    }

    // Method to change language and trigger an update
    async setLanguage(lang: string) {
        this.language = lang;
        i18next.changeLanguage(lang); // Change i18next language
    }

    // Method to calculate the wage and update the result state
    async handleCalculateWage() {
        const calculationData: CalculationData = {
            dateOfBirth: (this.shadowRoot?.getElementById('dob') as HTMLInputElement)?.value,
            jobType: (this.shadowRoot?.getElementById('jobType') as HTMLInputElement)?.value,
            location: (this.shadowRoot?.getElementById('location') as HTMLInputElement)?.value,
            applicationDate: (this.shadowRoot?.getElementById('applicationDate') as HTMLInputElement)?.value,
        };

        const minimumWage = await this.calculateWage(calculationData);
        this.minimumWageResult = minimumWage;
    }

    async calculateWage(data: CalculationData) {
        const response = await fetch('/api/calculate-minimum-wage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result.minimumWage;
    }

    render() {
        return html`
            <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
                <!-- Header with Logo and Language Selection -->
                <header
                    class="w-full max-w-md flex justify-between items-center  shadow-md bg-gradient-to-r from-[#73B01E] to-[#55742A] p-4"
                >
                    <img
                        src="https://www.enovetic.ch/wp-content/uploads/2023/11/f13da824aed7ccb4d28bff6e8158b58d-e1700759022261.png"
                        alt="Logo"
                        class="h-4"
                    />
                    <div class="flex space-x-4">
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

                <!-- Form Section -->
                <div class="bg-[#F9F9F4] shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
                    <!-- Title -->
                    <h2 class="text-lg font-semibold mb-4 text-gray-700">${i18next.t('form.title')}</h2>

                    <!-- Start Date Input -->
                    <label for="dob" class="block mb-2 text-sm font-medium text-gray-600"
                        >${i18next.t('form.startDate')}</label
                    >
                    <div class="relative">
                        <input
                            type="date"
                            id="dob"
                            class="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-700"
                        />
                    </div>

                    <!-- Location Input -->
                    <label for="location" class="block mb-2 text-sm font-medium text-gray-600"
                        >${i18next.t('form.location')}</label
                    >
                    <input
                        type="text"
                        id="location"
                        class="w-full p-3 border border-gray-300 rounded-md mb-4 text-gray-700"
                        placeholder="${i18next.t('form.locationPlaceholder')}"
                    />
                </div>
            </div>
        `;
    }
}
