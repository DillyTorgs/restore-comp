import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";
import "./use-case-filter.js";

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

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--ddd-theme-default-navy80);
        padding: 16px 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

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

      .cards {
        flex: 3;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }

      .nav-links a {
        color: var(--ddd-theme-default-skyBlue);
      }

      .nav-links a:hover {
        color: var(--ddd-theme-default-skyBlue);
      }

      .summary-section {
        background-color: var(--ddd-theme-default-slateMaxLight);
        color: var(--ddd-theme-default-limestoneGray);
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 24px;
        font-family: var(--ddd-font-body, Arial, sans-serif);
      }

      .summary-section h1 {
        font-size: 32px;
        margin-bottom: 16px;
        color: var(--ddd-theme-default-potential50);
      }

      .summary-section p {
        font-size: 16px;
        line-height: 1.5;
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
      searchTerm: { type: String },
      results: { type: Number },
    };
  }

  constructor() {
    super();
    this.useCases = [];
    this.filteredUseCases = [];
    this.selectedFilters = [];
    this.searchTerm = "";
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

  handleFiltersChanged(event) {
    this.selectedFilters = event.detail.selectedFilters;
    this.filterUseCases();
  }

  handleSearchTermChanged(event) {
    this.searchTerm = event.detail.searchTerm;
    this.filterUseCases();
  }

  filterUseCases() {
    this.filteredUseCases = this.useCases.filter((useCase) => {
      const matchesTags = this.selectedFilters.length
        ? this.selectedFilters.every((filter) => useCase.tags?.includes(filter))
        : true;

      const matchesSearch = this.searchTerm
        ? useCase.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          useCase.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchesTags && matchesSearch;
    });

    this.results = this.filteredUseCases.length;
  }

  render() {
    return html`
      <div class="header">
        <div class="logo">
          <img src="https://avatars.githubusercontent.com/u/170651362?s=200&v=4" alt="HAX Logo" />
        </div>
        <div class="nav-links">
          <a href="#">Merlin</a>
          <a href="#">Search Sites</a>
        </div>
        <div class="account">Account Name</div>
      </div>

      <!-- Summary Section -->
      <div class="summary-section">
        <h1>New Journey</h1>
        <p>
          Explore curated examples tailored to your needs. Use the filters and search 
          functionality to quickly find the perfect match for your next project or idea.
        </p>
      </div>

      <!-- Dashboard Section -->
      <div class="dashboard">
        <div class="filters">
          <use-case-filter
            .filters="${[...new Set(this.useCases.flatMap((useCase) => useCase.tags || []))]}"
            @filters-changed="${this.handleFiltersChanged}"
            @search-term-changed="${this.handleSearchTermChanged}" <!-- Add search event -->
          ></use-case-filter>
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
