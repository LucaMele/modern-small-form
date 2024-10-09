import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwind from '../../_shared/tailwind.css?inline';
import { LanguageAwareComponent } from '../../_shared/LanguageAwareComponent';

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
    private currentStep = 1;

    private isGroupOneValid() {
        const startDate = this.shadowRoot?.getElementById('start_date') as HTMLInputElement;
        const location = this.shadowRoot?.getElementById('location') as HTMLInputElement;

        if (startDate === null || location === null) return false;

        return startDate.checkValidity() && location.checkValidity();
    }

    private isGroupTwoValid() {
        const birthday = this.shadowRoot?.getElementById('birthday_date') as HTMLInputElement;
        if (birthday === null) return false;
        return birthday.checkValidity();
    }

    private isGroupThreeValid() {
        const functions = this.shadowRoot?.querySelector('input[name="functions"]:checked');
        if (functions === null) return false;
        return functions !== null;
    }

    handleInputChange(e: Event) {
        const input = e.target as HTMLInputElement;
        input.classList.add('dirty'); // Mark the field as "dirty" after the first change
    }

    private nextStep() {
        if (this.currentStep === 1 && this.isGroupOneValid()) {
            this.currentStep = 2;
        } else if (this.currentStep === 2 && this.isGroupTwoValid()) {
            this.currentStep = 3;
        } else {
            // Report validity to show errors for the current group
            const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;
            form.reportValidity();
        }
    }

    private prevStep() {
        this.currentStep = this.currentStep - 1;
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
        console.log(this.isGroupOneValid() && this.isGroupTwoValid() && this.isGroupThreeValid());
        return this.isGroupOneValid() && this.isGroupTwoValid() && this.isGroupThreeValid();
    }

    render() {
        console.log(this.currentStep === 1);

        return html`
            <form
                @submit="${this.handleSubmit}"
                class="bg-[#F9F9F4] shadow-lg rounded-lg p-6 w-full mt-6 animate-drop-in"
                novalidate
            >
                ${(this.currentStep === 1 &&
                    html`<div class="animate-drop-in">
                        <h2 class="text-lg font-semibold mb-4 text-gray-700">${this.t('form.title1')}</h2>
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
                            <span class="text-red-500 text-sm">Please provide a valid start date.</span>
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
                        <span class="text-red-500 text-sm"
                            >Please enter a valid ZIP code or name (min. 2 characters).</span
                        >

                        <div class="grid-cols-2 grid gap-8">
                            <button
                                type="button"
                                class="bg-blue-500 col-span-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                                @click="${this.nextStep}"
                            >
                                Next
                            </button>
                        </div>
                    </div>`) ||
                ''}
                ${(this.currentStep === 2 &&
                    html`<div class="animate-drop-in">
                        <h2 class="text-lg font-semibold mb-4 text-gray-700">${this.t('form.title2')}</h2>
                        <label for="birthday_date" class="block mb-2 text-sm font-medium">Birthday Date</label>
                        <input
                            type="date"
                            id="birthday_date"
                            max="${new Date().toISOString().split('T')[0]}"
                            required
                            class="w-full p-3 mb-4 border border-gray-300 rounded"
                        />
                        <span class="text-red-500 text-sm"
                            >Please enter a valid ZIP code or name (min. 2 characters).</span
                        >

                        <div class="grid-cols-2 grid gap-8">
                            <button
                                type="button"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                                @click="${this.prevStep}"
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                                @click="${this.nextStep}"
                            >
                                Next
                            </button>
                        </div>
                    </div>`) ||
                ''}
                ${(this.currentStep === 3 &&
                    html`<div class="animate-drop-in">
                        <h2 class="text-lg font-semibold mb-4 text-gray-700">${this.t('form.title3')}</h2>
                        <label class="block mb-2 text-sm font-medium">Functions</label>
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
                        <button
                            type="button"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                            @click="${this.prevStep}"
                        >
                            Prev
                        </button>
                    </div>`) ||
                ''}
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
