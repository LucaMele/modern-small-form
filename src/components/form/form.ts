import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwind from '../../_shared/tailwind.css?inline';
import { LanguageAwareComponent } from '../../_shared/LanguageAwareComponent';

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
    private currentStep = 1;

    private handleStepValidated(event: CustomEvent) {
        const { step, isValid } = event.detail;

        console.log(`Step ${step} valid: ${isValid}`);
    }

    handleInputChange(e: Event) {
        const input = e.target as HTMLInputElement;
        input.classList.add('dirty'); // Mark the field as "dirty" after the first change
    }

    firstUpdated() {
        // Store the form element reference when the component is first rendered
        this.formElement = this.shadowRoot?.querySelector('form') as HTMLFormElement;
    }

    handleSubmit(e: Event) {
        e.preventDefault();

        const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;

        if (form.checkValidity()) {
            const formData = new FormData(form);
            console.log('Form Data:', Object.fromEntries(formData.entries()));
        } else {
            console.error('Form is invalid');
            form.reportValidity();
        }
    }

    private canSubmit() {
        return true;
    }

    render() {
        return html`
            <form
                @submit="${this.handleSubmit}"
                @step-validated="${this.handleStepValidated}"
                class="bg-[#F9F9F4] shadow-lg rounded-lg p-6 w-full mt-6 animate-drop-in"
            >
                <wage-form-step .formElement=${this.formElement} .totalStep=${3}>
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
                        <div class="flex items-center mb-4">
                            <input
                                type="radio"
                                id="function1"
                                name="functions"
                                value="Bricklayer"
                                class="mr-2"
                                required
                            />
                            <label for="function1" class="text-sm">Bricklayer</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input type="radio" id="function2" name="functions" value="Plumber" class="mr-2" required />
                            <label for="function2" class="text-sm">Plumber</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input
                                type="radio"
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
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                    ?disabled="${!this.canSubmit()}"
                >
                    Submit
                </button>
            </form>
        `;
    }
}
