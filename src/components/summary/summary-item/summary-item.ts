import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import tailwind from '../../../_shared/tailwind.css?inline';

@customElement('wage-summary-item')
export class WageItem extends LitElement {
    static styles = css`
        ${unsafeCSS(tailwind)}
    `;

    render() {
        return html`
            <li class="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                    <slot name="title"></slot>
                    <slot name="subtitle"></slot>
                </div>

                <div class="flex items-center space-x-2">
                    <slot name="value"></slot>
                    <slot name="edit-icon"></slot>
                </div>
            </li>
        `;
    }
}
