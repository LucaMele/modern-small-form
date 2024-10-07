import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface CalculationData {
  dateOfBirth: string;
  jobType: string;
  location: string;
  applicationDate: string;
}

@customElement('minimum-wage-app')
export class MinimumWageApp extends LitElement {
  
  private _language: string = 'en';

  @state()
  private minimumWageResult: number | null = null;  // To store the wage result

  get language() {
    return this._language;
  }
  
  @property({ type: String })
  set language(value: string) {
    const oldValue = this._language;
    this._language = value;
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

  // Method to calculate the wage and update the result state
  async handleCalculateWage() {
    const calculationData: CalculationData = {
      dateOfBirth: (this.shadowRoot?.getElementById('dob') as HTMLInputElement)?.value,
      jobType: (this.shadowRoot?.getElementById('jobType') as HTMLInputElement)?.value,
      location: (this.shadowRoot?.getElementById('location') as HTMLInputElement)?.value,
      applicationDate: (this.shadowRoot?.getElementById('applicationDate') as HTMLInputElement)?.value
    };

    const minimumWage = await this.calculateWage(calculationData);
    this.minimumWageResult = minimumWage; // Store the result in the state
  }

  // API call for wage calculation
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

        <!-- Form inputs for wage calculation -->
        <div>
          <label>Date of Birth:</label>
          <input type="date" id="dob" />
        </div>
        <div>
          <label>Job Type:</label>
          <input type="text" id="jobType" />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" id="location" />
        </div>
        <div>
          <label>Application Date:</label>
          <input type="date" id="applicationDate" />
        </div>

        <button @click="${this.handleCalculateWage}">Calculate Minimum Wage</button>

        <!-- Display the wage result -->
        ${this.minimumWageResult !== null
          ? html`<p>Minimum Wage: $${this.minimumWageResult}</p>`
          : html`<p>Enter details to calculate the minimum wage.</p>`
        }
      </div>
    `;
  }
}
