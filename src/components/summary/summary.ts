import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwind from '../../_shared/tailwind.css?inline';

interface CalculationData {
    dateOfBirth: string;
    jobType: string;
    location: string;
    applicationDate: string;
}
@customElement('wage-summary')
export class WageList extends LitElement {
    static styles = css`
        ${unsafeCSS(tailwind)}
    `;

    @property({ type: Object })
    formData = null;

    @state()
    private minimumWageResult = [];

    async handleCalculateWage() {
        this.minimumWageResult = await this.calculateWage(this.formData).catch(() => {});

        // mock data for brocken EP
        this.minimumWageResult = [
            { title: 'Grundlohn', value: '27.95', editIconColor: 'text-green-600' },
            { title: 'Ferienentschädigung', subtitle: '10.64%', value: '2.97', editIconColor: 'text-green-600' },
            { title: 'Feiertagsentschädigung', subtitle: '3.17%', value: '0.89', editIconColor: 'text-green-600' },
            { title: 'Anteil 13. Monatslohn', subtitle: '8.33%', value: '2.65', editIconColor: 'text-gray-400' },
        ];
    }

    async calculateWage(data: CalculationData) {
        const response = await fetch('/api/calculate-minimum-wages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result.minimumWage;
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('formData')) {
            if (this.formData) {
                this.handleCalculateWage();
            }
        }
    }
    render() {
        return html`
            ${this.minimumWageResult.map(
                (item) => html`
                    <wage-item class="mt-2 grid grid-cols-3 gap-2 p-4 bg-white rounded-lg shadow-sm">
                        <span slot="title" class="text-gray-800 font-semibold text-lg col-span-2">${item.title}</span>
                        ${item.subtitle
                            ? html`<span slot="subtitle" class="text-gray-500 text-sm col-span-2"
                                  >${item.subtitle}</span
                              >`
                            : ''}
                        <span slot="value" class="text-gray-800 font-semibold text-lg">${item.value}</span>
                        <div class="col-span-3 flex justify-end">
                            <svg
                                slot="edit-icon"
                                class="w-6 h-6 ${item.editIconColor}"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536M9 11l5-5a1.414 1.414 0 011.414-1.414L18 7l-5 5-1.586-1.586a1 1 0 00-1.414 0L9 11l1.586 1.586z"
                                ></path>
                            </svg>
                        </div>
                    </wage-item>
                `
            )}
        `;
    }
}
