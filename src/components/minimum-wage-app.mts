import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface CalculationData {
  dateOfBirth: string;
  jobType: string;
  location: string;
  applicationDate: string;
}

@customElement('minimum-wage-app')
export class MinimumWageApp extends LitElement {
  
  private _language: string = 'en';

  get language() {
    return this._language;
  }
  
  @property({ type: String })
  set language(value: string) {
    const oldValue = this._language;
    this._language = value;
    // Notify Lit that the property has changed and trigger reactivity
    this.requestUpdate('language', oldValue);
  }


  constructor() {
    super();
  }

  static styles = css`
    /* Your styles here */
  `;

  // Method to change language and trigger an update
  async setLanguage(lang: string) {
    this.language = lang;
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
      <div>
        <button @click="${() => this.setLanguage('en')}">EN</button>
        <button @click="${() => this.setLanguage('de')}">DE</button>
        <h1>Welcome! Current language: ${this.language}</h1>
      </div>
    `;
  }
}
