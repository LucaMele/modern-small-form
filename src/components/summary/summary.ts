import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import tailwind from '../../_shared/tailwind.css?inline';

@customElement('wage-summary')
export class WageList extends LitElement {
    static styles = css`
        ${unsafeCSS(tailwind)}
    `;

    render() {
        return html`
            <wage-item>
                <span slot="title" class="text-gray-800 font-semibold">Grundlohn</span>
                <span slot="value" class="text-gray-800 font-semibold">27.95</span>
                <svg
                    slot="edit-icon"
                    class="w-5 h-5 text-green-600"
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
            </wage-item>

            <wage-item>
                <span slot="title" class="text-gray-800 font-semibold">Ferienentschädigung</span>
                <span slot="subtitle" class="text-gray-500 text-sm">10.64%</span>
                <span slot="value" class="text-gray-800 font-semibold">2.97</span>
                <svg
                    slot="edit-icon"
                    class="w-5 h-5 text-green-600"
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
            </wage-item>

            <wage-item>
                <span slot="title" class="text-gray-800 font-semibold">Feiertagsentschädigung</span>
                <span slot="subtitle" class="text-gray-500 text-sm">3.17%</span>
                <span slot="value" class="text-gray-800 font-semibold">0.89</span>
                <svg
                    slot="edit-icon"
                    class="w-5 h-5 text-green-600"
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
            </wage-item>

            <wage-item>
                <span slot="title" class="text-gray-800 font-semibold">Anteil 13. Monatslohn</span>
                <span slot="subtitle" class="text-gray-500 text-sm">8.33%</span>
                <span slot="value" class="text-gray-800 font-semibold">2.65</span>
                <svg
                    slot="edit-icon"
                    class="w-5 h-5 text-gray-400"
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
            </wage-item>
        `;
    }
}
