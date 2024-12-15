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

      h3 {
        margin: 0 0 12px;
        font-size: 16px;
        font-weight: bold;
        color: var(--ddd-theme-default-skyBlue);
        border-bottom: 2px solid var(--ddd-theme-default-link);
        padding-bottom: 6px;
      }

      .search-bar {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
      }

      .search-bar input {
        flex: 1;
        padding: 8px;
        font-size: 14px;
        border: 1px solid var(--ddd-theme-default-slateMaxLight);
        border-radius: 5px;
      }

      .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
        margin-top: 12px;
      }

      .filter-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: var(--ddd-theme-default-navy80);
        cursor: pointer;
      }

      .filter-item input[type="checkbox"] {
        margin: 0;
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
    this.searchTerm = ""; // Tracks the user's search input
  }

  handleSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.dispatchEvent(
      new CustomEvent("search-term-changed", {
        detail: { searchTerm },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div>
        <h3>Available Filters</h3>
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search cards..."
            @input="${this.handleSearchInput}" <!-- Emit search-term-changed -->
          />
        </div>
        <div class="filters">
          ${this.filters.map(
            (filter) => html`
              <div class="filter-item">
                <input
                  type="checkbox"
                  value="${filter}"
                  ?checked="${this.selectedFilters.includes(filter)}"
                  @change="${(event) =>
                    this.dispatchEvent(
                      new CustomEvent("filters-changed", {
                        detail: {
                          selectedFilters: event.target.checked
                            ? [...this.selectedFilters, filter]
                            : this.selectedFilters.filter((f) => f !== filter),
                        },
                        bubbles: true,
                        composed: true,
                      })
                    )}"
                />
                <label>${filter}</label>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("use-case-filter", UseCaseFilter);
