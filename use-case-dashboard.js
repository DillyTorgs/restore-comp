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
        flex-direction: column;
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

      .continue-button {
        padding: 12px 24px;
        font-size: 16px;
        color: white;
        background-color: var(--ddd-theme-default-potential50);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
        align-self: center;
      }

      .continue-button:hover {
        background-color: var(--ddd-theme-default-potential60);
      }

      .continue-button:disabled {
        background-color: var(--ddd-theme-default-limestoneGray);
        cursor: not-allowed;
      }
    `;
  }

  static get properties() {
    return {
      useCases: { type: Array },
      filteredUseCases: { type: Array },
      selectedFilters: { type: Array },
      searchTerm: { type: String },
      selectedCard: { type: Object },
    };
  }

  constructor() {
    super();
    this.useCases = [];
    this.filteredUseCases = [];
    this.selectedFilters = [];
    this.searchTerm = "";
    this.selectedCard = null;
    this.loadUseCaseData();
  }

  async loadUseCaseData() {
    try {
      const response = await fetch(new URL("./lib/use-case-data.json", import.meta.url).href);
      if (response.ok) {
        const data = await response.json();
        this.useCases = data.data;
        this.filteredUseCases = [...this.useCases];
      }
    } catch (error) {
      console.error("Error fetching use-case data:", error);
    }
  }

  handleCardSelected(e) {
    const { selected, title, description } = e.detail;
    if (selected) {
      this.selectedCard = { name: title, description };
    } else if (this.selectedCard?.name === title) {
      this.selectedCard = null;
    }
    this.requestUpdate();
  }

  handleContinue() {
    if (this.selectedCard) {
      alert(`You selected: ${this.selectedCard.name}`);
    }
  }

  handleSearchTermChanged(e) {
    this.searchTerm = e.detail.searchTerm;
    this.updateFilteredUseCases();
  }

  handleFiltersChanged(e) {
    this.selectedFilters = e.detail.selectedFilters;
    this.updateFilteredUseCases();
  }

  updateFilteredUseCases() {
    let filtered = [...this.useCases];

    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(useCase => 
        useCase.name.toLowerCase().includes(searchLower) ||
        useCase.description.toLowerCase().includes(searchLower)
      );
    }

    if (this.selectedFilters.length > 0) {
      filtered = filtered.filter(useCase =>
        this.selectedFilters.every(filter => useCase.tags?.includes(filter))
      );
    }

    this.filteredUseCases = filtered;
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

      <div class="dashboard">
        <div class="filters">
          <use-case-filter
            .filters="${[...new Set(this.useCases.flatMap((useCase) => useCase.tags || []))]}"
            .selectedFilters="${this.selectedFilters}"
            @filters-changed="${this.handleFiltersChanged}"
            @search-term-changed="${this.handleSearchTermChanged}"
          ></use-case-filter>
        </div>

        <div class="cards">
          ${this.filteredUseCases.map(
            (useCase) => html`
              <use-case-card
                title="${useCase.name}"
                description="${useCase.description}"
                imageURL="${useCase.imageURL}"
                .selected="${this.selectedCard?.name === useCase.name}"
                @card-selected="${this.handleCardSelected}"
              ></use-case-card>
            `
          )}
        </div>

        <button
          class="continue-button"
          ?disabled="${!this.selectedCard}"
          @click="${this.handleContinue}"
        >
          Continue
        </button>
      </div>
    `;
  }

  static get tag() {
    return "use-case-dashboard";
  }
}

customElements.define(UseCaseDashboard.tag, UseCaseDashboard);