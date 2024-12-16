import { LitElement, html, css } from "lit";

class UseCaseFilter extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-white);
        padding: 16px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 5px;
        font-family: var(--ddd-font-body, Arial, sans-serif);
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        color: var(--ddd-theme-default-skyBlue);
      }

      .reset-button {
        padding: 6px 12px;
        font-size: 14px;
        color: var(--ddd-theme-default-potential50);
        background: transparent;
        border: 1px solid var(--ddd-theme-default-potential50);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .reset-button:hover {
        background-color: var(--ddd-theme-default-potential50);
        color: white;
      }

      .search-bar {
        margin-bottom: 16px;
      }

      .search-bar input {
        width: 100%;
        padding: 8px 12px;
        font-size: 14px;
        border: 1px solid var(--ddd-theme-default-slateMaxLight);
        border-radius: 5px;
        transition: border-color 0.2s;
      }

      .search-bar input:focus {
        outline: none;
        border-color: var(--ddd-theme-default-potential50);
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .filter-button {
        padding: 6px 12px;
        font-size: 14px;
        border: 1px solid var(--ddd-theme-default-slateMaxLight);
        border-radius: 16px;
        background: transparent;
        color: var(--ddd-theme-default-navy80);
        cursor: pointer;
        transition: all 0.2s;
      }

      .filter-button:hover {
        background-color: var(--ddd-theme-default-potential10);
      }

      .filter-button.selected {
        background-color: var(--ddd-theme-default-potential50);
        color: white;
        border-color: var(--ddd-theme-default-potential50);
      }
    `;
  }

  static get properties() {
    return {
      filters: { type: Array },
      selectedFilters: { type: Array },
      searchTerm: { type: String },
    };
  }

  constructor() {
    super();
    this.filters = [];
    this.selectedFilters = [];
    this.searchTerm = "";
  }

  handleSearchInput(event) {
    this.searchTerm = event.target.value;
    this.dispatchEvent(
      new CustomEvent("search-term-changed", {
        detail: { searchTerm: this.searchTerm },
        bubbles: true,
        composed: true,
      })
    );
  }

  toggleFilter(filter) {
    const newSelectedFilters = this.selectedFilters.includes(filter)
      ? this.selectedFilters.filter(f => f !== filter)
      : [...this.selectedFilters, filter];

    this.selectedFilters = newSelectedFilters;
    this.dispatchEvent(
      new CustomEvent("filters-changed", {
        detail: { selectedFilters: newSelectedFilters },
        bubbles: true,
        composed: true,
      })
    );
  }

  resetFilters() {
    this.selectedFilters = [];
    this.searchTerm = "";
    const searchInput = this.shadowRoot.querySelector('input');
    if (searchInput) {
      searchInput.value = "";
    }
    
    this.dispatchEvent(
      new CustomEvent("filters-changed", {
        detail: { selectedFilters: [] },
        bubbles: true,
        composed: true,
      })
    );
    
    this.dispatchEvent(
      new CustomEvent("search-term-changed", {
        detail: { searchTerm: "" },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div>
        <div class="header">
          <h3>Available Filters</h3>
          <button class="reset-button" @click="${this.resetFilters}">
            Reset All
          </button>
        </div>
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search cards..."
            .value="${this.searchTerm}"
            @input="${this.handleSearchInput}"
          />
        </div>
        <div class="filters">
          ${this.filters.map(
            (filter) => html`
              <button
                class="filter-button ${this.selectedFilters.includes(filter) ? 'selected' : ''}"
                @click="${() => this.toggleFilter(filter)}"
              >
                ${filter}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("use-case-filter", UseCaseFilter);