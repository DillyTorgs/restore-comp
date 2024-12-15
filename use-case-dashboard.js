import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";

class UseCaseDashboard extends DDDSuper(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        font-family: var(--ddd-font-navigation, Arial, sans-serif);
        background-color: var(--ddd-theme-default-creekMaxLight);
        color: var(--ddd-theme-default-limestoneGray);
        min-height: 100vh;
        box-sizing: border-box;
      }

      /* Header Styles */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--ddd-theme-default-navy80);
        padding: 16px 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header .logo {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .header .logo img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .header .nav-links {
        display: flex;
        gap: 32px;
        font-size: 30px;
        font-weight: bold;
        color: var(--ddd-theme-default-slateLight);
      }

      .header .nav-links a {
        text-decoration: none;
        color: inherit;
        transition: color 0.3s;
        color: var(--ddd-theme-default-slateLight);
      }

      .header .nav-links a:hover {
        color: var(--ddd-theme-default-accent);
      }

      .header .account {
        font-size: 10px;
        font-weight: bold;
        color: var(--ddd-theme-default-slateLight);
      }

      /* Dashboard Layout */
      .dashboard {
        display: flex;
        flex: 1;
        padding: 36px;
        gap: 24px;
        overflow-y: auto;
        box-sizing: border-box;
      }

      .filters {
        flex: 1;
        background: var(--ddd-theme-default-slateMaxLight);
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        
      }

      .filters h2 {
        margin: 0 0 16px;
        font-size: 18px;
        color: var(--ddd-theme-default-potential50);
        border-bottom: 1px solid var(--ddd-theme-default-slateMaxLight);
        padding-bottom: 8px;
      }

      .filters label {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
        cursor: pointer;
      }

      .filters input[type="checkbox"] {
        margin-right: 8px;
      }

      .cards {
        flex: 3;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }

      use-case-card {
        background: var(--ddd-theme-default-potential0);
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
      }

      use-case-card:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
      }
    `;
  }

  static get properties() {
    return {
      useCases: { type: Array },
      filteredUseCases: { type: Array },
      selectedFilters: { type: Array },
      results: { type: Number },
    };
  }

  constructor() {
    super();
    this.useCases = [];
    this.filteredUseCases = [];
    this.selectedFilters = [];
    this.results = 0;
    this.loadUseCaseData();
  }

  async loadUseCaseData() {
    try {
      const response = await fetch(new URL("./lib/use-case-data.json", import.meta.url).href);
      if (response.ok) {
        const data = await response.json();
        this.useCases = data.data;
        this.filteredUseCases = [...this.useCases];
        this.results = this.filteredUseCases.length;
      }
    } catch (error) {
      console.error("Error fetching use-case data:", error);
    }
  }

  filterUseCases() {
    this.filteredUseCases = this.selectedFilters.length
      ? this.useCases.filter((useCase) =>
          this.selectedFilters.every((filter) => useCase.tags?.includes(filter))
        )
      : [...this.useCases];

    this.results = this.filteredUseCases.length;
  }

  handleFilterChange(event) {
    const filter = event.target.value;
    this.selectedFilters = event.target.checked
      ? [...this.selectedFilters, filter]
      : this.selectedFilters.filter((f) => f !== filter);

    this.filterUseCases();
  }

  generateFilters() {
    const uniqueTags = [...new Set(this.useCases.flatMap((useCase) => useCase.tags || []))];
    return uniqueTags.map(
      (tag) => html`
        <label>
          <input
            type="checkbox"
            value="${tag}"
            @change="${this.handleFilterChange}"
          />
          ${tag}
        </label>
      `
    );
  }

  render() {
    return html`
      <!-- Header Section -->
      <div class="header">
        <div class="logo">
          <img src="https://avatars.githubusercontent.com/u/170651362?s=200&v=4" alt="HAX Logo" />
          <span>Hax it</span>
        </div>

        <div class="nav-links">
          <a href="#">Merlin</a>
          <a href="#">Search Sites</a>
        </div>

        <div class="account">Account Name</div>
      </div>

      <!-- Main Dashboard -->
      <div class="filters"></div>
      <div class="dashboard"> 
        <h1>--Start your Journey--</h1>
        
          <h2>Filter</h2>
          ${this.generateFilters()}
        </div>

        <div class="cards">
          ${this.filteredUseCases.map(
            (useCase) => html`
              <use-case-card
                title="${useCase.name}"
                description="${useCase.description}"
                demoLink="${useCase.demo_link}"
              ></use-case-card>
            `
          )}
        </div>
      </div>
    `;
  }

  static get tag() {
    return "use-case-dashboard";
  }
}

customElements.define(UseCaseDashboard.tag, UseCaseDashboard);
