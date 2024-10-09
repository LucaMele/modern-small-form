import { html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

    handleInputChange(e: Event) {
        const input = e.target as HTMLInputElement;
        input.classList.add('dirty'); // Mark the field as "dirty" after the first change
    }

    handleSubmit(e: Event) {
        e.preventDefault();

        const form = this.shadowRoot?.querySelector('form') as HTMLFormElement;

        // Check if the form is valid natively
        if (form.checkValidity()) {
            const formData = new FormData(form);
            console.log('Form Data:', Object.fromEntries(formData.entries()));
        } else {
            console.error('Form is invalid');
            form.reportValidity(); // Show browser validation messages
        }
    }

    render() {
        return html`
            <form
                @submit="${this.handleSubmit}"
                class="bg-[#F9F9F4] shadow-lg rounded-lg p-6 w-full mt-6 animate-drop-in"
                novalidate
            >
                <!-- Title -->
                <h2 class="text-lg font-semibold mb-4 text-gray-700">${this.t('form.title')}</h2>

                <!-- Start Date Input -->
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
                    <!-- Error message (shown only if invalid) -->
                    <span class="text-red-500 text-sm">Please provide a valid start date.</span>
                </div>

                <!-- Location Input -->
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
                <!-- Error message (shown only if invalid) -->
                <span class="text-red-500 text-sm">Please enter a valid ZIP code or name (min. 2 characters).</span>

                <!-- Submit Button -->
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        `;
    }
}
