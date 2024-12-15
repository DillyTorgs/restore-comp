import { LitElement, html, css } from 'lit';
import './components/filter-sidebar.js';
import './components/hax-use-case-card.js';
import useCaseData from './lib/use-case-data.json' assert { type: 'json' };

export class HaxUseCaseApp extends LitElement {
  static properties = {
    useCases: { type: Array },
    activeFilters: { type: Array },
    selectedUseCase: { type: String },
    searchQuery: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .header {
      background: #333;
      color: white;
      padding: 1rem;
    }

    .header h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .main-content {
      display: grid;
      grid-template-columns: 250px 1fr;
      height: calc(100vh - 64px);
    }

    .cards-container {
      padding: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      overflow-y: auto;
    }
  `;

  constructor() {
    super();
    this.useCases = useCaseData.data;
    this.activeFilters = [];
    this.selectedUseCase = null;
    this.searchQuery = '';
  }

  handleFilterToggle(e) {
    const tag = e.detail;
    this.activeFilters = this.activeFilters.includes(tag)
      ? this.activeFilters.filter(t => t !== tag)
      : [...this.activeFilters, tag];
  }

  handleSearch(e) {
    this.searchQuery = e.detail;
  }

  handleUseCaseSelect(e) {
    this.selectedUseCase = e.detail;
  }

  getFilteredUseCases() {
    let filtered = this.useCases;
    
    if (this.activeFilters.length > 0) {
      filtered = filtered.filter(useCase => 
        useCase.tags.some(tag => this.activeFilters.includes(tag))
      );
    }
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(useCase => 
        useCase.title.toLowerCase().includes(query) ||
        useCase.description.toLowerCase().includes(query) ||
        useCase.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }

  getAvailableTags() {
    const tags = new Set();
    this.useCases.forEach(useCase => {
      useCase.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }

  render() {
    const availableTags = this.getAvailableTags();
    const filteredUseCases = this.getFilteredUseCases();

    return html`
      <div class="header">
        <h1>HAX Use Cases</h1>
      </div>

      <div class="main-content">
        <filter-sidebar
          .availableTags=${availableTags}
          .activeFilters=${this.activeFilters}
          @filter-toggle=${this.handleFilterToggle}
          @search=${this.handleSearch}
        ></filter-sidebar>

        <div class="cards-container">
          ${filteredUseCases.map(useCase => html`
            <hax-use-case-card
              .useCase=${useCase}
              ?selected=${this.selectedUseCase === useCase.id}
              @select-use-case=${this.handleUseCaseSelect}
            ></hax-use-case-card>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('hax-use-case-app', HaxUseCaseApp);