import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import tailwind from '../../../_shared/tailwind.css?inline';
import { LanguageAwareComponent } from '../../../_shared/LanguageAwareComponent';

@customElement('wage-form-step')
export class CustomForm extends LanguageAwareComponent {
    static styles = css`
        ${unsafeCSS(tailwind)}
    `;

    @property({ type: Object })
    formElement!: HTMLFormElement;

    @state()
    private currentStep = 1;

    @state()
    private showAllSteps = false;

    private timeoutId: NodeJS.Timeout | undefined;

    @property({ type: Number })
    totalStep = 1;

    private prevStep() {
        this.currentStep = this.currentStep - 1;
    }

    private reportFullFormValidity() {
        this.showAllSteps = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.formElement.reportValidity();
            this.showAllSteps = false;
        }, 1);
    }

    private validateStep() {
        const stepSlot = this.shadowRoot?.querySelector(`slot[name="step${this.currentStep}"]`) as HTMLSlotElement;
        if (!stepSlot) return false;
        const assignedElements = stepSlot.assignedElements({ flatten: true });
        let isValid = true;
        assignedElements.forEach((element) => {
            if (element.tagName === 'DIV') {
                const inputElements = element.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
                inputElements.forEach((input) => {
                    if (!input.checkValidity()) {
                        isValid = false;
                    }
                });
            }
        });

        this.dispatchEvent(
            new CustomEvent('step-validated', {
                detail: { step: this.currentStep, isValid },
                bubbles: true,
                composed: true,
            })
        );

        return isValid;
    }

    private nextStep() {
        if (this.validateStep()) {
            this.currentStep = this.currentStep + 1;
        } else {
            this.reportFullFormValidity();
        }
    }

    private getStepSlots() {
        return Array.from({ length: this.totalStep }, (_, i) => i + 1);
    }

    render() {
        console.log(this.currentStep);
        return html`
            <div>
                <h2 class="text-lg font-semibold mb-4 text-gray-700">${this.t(`form.title${this.currentStep}`)}</h2>
                ${this.getStepSlots().map(
                    (step) =>
                        html`
                            <slot
                                name="step${step}"
                                class="animate-drop-in"
                                ?hidden="${this.currentStep !== step && !this.showAllSteps}"
                            ></slot>
                        `
                )}
                <div class="grid-cols-2 grid gap-8">
                    ${this.currentStep > 1
                        ? html` <button
                              type="button"
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                              @click="${this.prevStep}"
                          >
                              Prev
                          </button>`
                        : ''}
                    ${this.currentStep < this.totalStep
                        ? html`<button
                              type="button"
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4 ${this
                                  .currentStep === 1
                                  ? 'col-span-2'
                                  : ''}"
                              @click="${this.nextStep}"
                          >
                              Next
                          </button>`
                        : ''}
                </div>
            </div>
        `;
    }
}
