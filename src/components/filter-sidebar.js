import { LitElement, html, css } from 'lit';

export class FilterSidebar extends LitElement {
  static properties = {
    availableTags: { type: Array },
    activeFilters: { type: Array },
    searchQuery: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .sidebar {
      background: white;
      padding: 1rem;
      border-right: 1px solid #eee;
      height: 100%;
    }

    .filter-title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .search-container {
      margin-bottom: 1rem;
    }

    .search-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.9rem;
      box-sizing: border-box;
    }

    .search-input:focus {
      outline: none;
      border-color: #0066cc;
      box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
    }

    .filter-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-item {
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .filter-item:hover {
      background: #f5f5f5;
    }

    .filter-item.active {
      background: #e6f0ff;
      color: #0066cc;
    }
  `;

  constructor() {
    super();
    this.searchQuery = '';
  }

  handleFilterClick(tag) {
    this.dispatchEvent(new CustomEvent('filter-toggle', { detail: tag }));
  }

  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.dispatchEvent(new CustomEvent('search', { 
      detail: this.searchQuery 
    }));
  }

  render() {
    return html`
      <div class="sidebar">
        <h2 class="filter-title">Filters</h2>
        
        <div class="search-container">
          <input
            type="text"
            class="search-input"
            placeholder="Search use cases..."
            .value=${this.searchQuery}
            @input=${this.handleSearch}
          >
        </div>

        <div class="filter-list">
          ${this.availableTags.map(tag => html`
            <div 
              class="filter-item ${this.activeFilters?.includes(tag) ? 'active' : ''}"
              @click=${() => this.handleFilterClick(tag)}
            >
              ${tag}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('filter-sidebar', FilterSidebar);