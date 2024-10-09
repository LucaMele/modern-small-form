import { LitElement } from 'lit';
import i18next from 'i18next';
import { state } from 'lit/decorators.js';

export class LanguageAwareComponent extends LitElement {
    @state()
    language = 'en';

    updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('language')) {
            this.requestUpdate();
        }
    }

    t(key: string) {
        return i18next.t(key);
    }
}
