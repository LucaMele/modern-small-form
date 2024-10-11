import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwind from '../../_shared/tailwind.css?inline';
import { LanguageAwareComponent } from '../../_shared/LanguageAwareComponent';

const TOTAL_STEPS = 3;

import './parts/step';
@customElement('wage-form')
export class CustomForm extends LanguageAwareComponent {
    static styles = css`
        ${unsafeCSS(tailwind)}
        /* Show the error message when the input is invalid and dirty */
        .dirty:invalid + span {
            display: block;
        }
        span {
            display: none;
        }
    `;

    @state()
    private formElement!: HTMLFormElement;

    @state()
    private formDisabled: boolean = true;

    @state()
    private selectedValue = '';

    private handleStepValidated(event: CustomEvent) {
        const { step, isValid } = event.detail;

        // At the moment radios dont validate as is in nextStep logic. needs adaption. cheap out in consider
        // last step always valid
        if ((TOTAL_STEPS - 1 === +step && isValid) || !this.selectedValue) {
            this.formDisabled = false;
        } else {
            this.formDisabled = true;
        }
    }

    handleInputChange(e: Event) {
        const input = e.target as HTMLInputElement;
        input.classList.add('dirty');
    }

    handleRadioChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.selectedValue = target.value;
    }

    firstUpdated() {
        this.formElement = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    }

    handleSubmit(e: Event) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        if (form.checkValidity()) {
            this.dispatchEvent(
                new CustomEvent('form-submit', {
                    detail: { formData: Object.fromEntries(formData.entries()) },
                    bubbles: true,
                    composed: true,
                })
            );
        } else {
            form.reportValidity();
        }
    }

    render() {
        return html`
            <form @submit="${this.handleSubmit}" @step-validated="${this.handleStepValidated}">
                <wage-form-step .language=${this.language} .formElement=${this.formElement} .totalStep=${TOTAL_STEPS}>
                    <div slot="step1">
                        <label for="start_date" class="block mb-2 text-sm font-medium text-gray-600"
                            >${this.t('form.startDate')}</label
                        >
                        <div class="relative">
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                min="2024-06-10"
                                max="2024-08-05"
                                required
                                class="w-full p-3 border border-gray-300 rounded-md mb-1 text-gray-700"
                                @input="${this.handleInputChange}"
                            />
                            <span class="text-red-500 text-sm">${this.t('form.validation.startDateRequired')}</span>
                        </div>

                        <label for="location" class="block mb-2 text-sm font-medium text-gray-600"
                            >${this.t('form.location')}</label
                        >
                        <input
                            type="text"
                            id="location"
                            name="location"
                            pattern="^d{4,5}$|^[A-Za-z]{2,}$"
                            required
                            class="w-full p-3 border border-gray-300 rounded-md mb-1 text-gray-700"
                            placeholder="${this.t('form.locationPlaceholder')}"
                            @input="${this.handleInputChange}"
                        />
                        <span class="text-red-500 text-sm">${this.t('form.validation.locationPattern')}</span>
                    </div>
                    <div slot="step2">
                        <label for="birthday_date" class="block mb-2 text-sm font-medium">Birthday Date</label>
                        <input
                            type="date"
                            id="birthday_date"
                            name="birthday_date"
                            max="${new Date().toISOString().split('T')[0]}"
                            required
                            class="w-full p-3 mb-4 border border-gray-300 rounded"
                        />
                    </div>
                    <div slot="step3">
                        <!-- TODO: get functions from server -->
                        <div class="flex items-center mb-4">
                            <input
                                type="radio"
                                @change="${this.handleRadioChange}"
                                id="function1"
                                name="functions"
                                value="Bricklayer"
                                class="mr-2"
                                required
                            />
                            <label for="function1" class="text-sm">Bricklayer</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="radio"
                                id="function2"
                                @change="${this.handleRadioChange}"
                                name="functions"
                                value="Plumber"
                                class="mr-2"
                                required
                            />
                            <label for="function2" class="text-sm">Plumber</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="radio"
                                @change="${this.handleRadioChange}"
                                id="function3"
                                name="functions"
                                value="Electrician"
                                class="mr-2"
                                required
                            />
                            <label for="function3" class="text-sm">Electrician</label>
                        </div>
                    </div>
                </wage-form-step>

                <button
                    type="submit"
                    class="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                    ?disabled="${this.formDisabled}"
                >
                    Submit
                </button>
            </form>
        `;
    }
}
