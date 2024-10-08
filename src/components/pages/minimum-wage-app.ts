import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import style from './minimum-wage-app.component.css?inline';

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
                <button @click="${() => this.setLanguage('en')}">EN</button>
                <button @click="${() => this.setLanguage('de')}">DE</button>
                <h1 class="text-2xl font-bold mb-4">Welcome! Current language: ${this.language}</h1>

                <!-- Form inputs for wage calculation -->
                <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <label class="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" id="dob" class="w-full p-2 border border-gray-300 rounded-md mb-4" />

                    <label class="block mb-2 text-sm font-medium text-gray-700">Job Type</label>
                    <input type="text" id="jobType" class="w-full p-2 border border-gray-300 rounded-md mb-4" />

                    <label class="block mb-2 text-sm font-medium text-gray-700">Location</label>
                    <input type="text" id="location" class="w-full p-2 border border-gray-300 rounded-md mb-4" />

                    <label class="block mb-2 text-sm font-medium text-gray-700">Application Date</label>
                    <input type="date" id="applicationDate" class="w-full p-2 border border-gray-300 rounded-md mb-4" />

                    <button
                        @click="${this.handleCalculateWage}"
                        class="bg-blue-500 text-white p-2 rounded-md w-full mt-4"
                    >
                        Calculate Minimum Wage
                    </button>
                </div>

                <!-- Display the wage result -->
                ${this.minimumWageResult !== null
                    ? html`<p class="mt-4 text-xl">Minimum Wage: $${this.minimumWageResult}</p>`
                    : html`<p class="mt-4">Enter details to calculate the minimum wage.</p>`}
            </div>
        `;
    }
}
