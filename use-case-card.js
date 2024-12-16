import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class UseCaseCard extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.imageURL = "";
    this.selected = false;
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      imageURL: { type: String },
      selected: { type: Boolean },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-body, Arial, sans-serif);
        }

        .card {
          background-color: var(--ddd-theme-default-white);
          border: 2px solid var(--ddd-theme-default-slateMaxLight);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }

        .card.selected {
          border-color: var(--ddd-theme-default-potential50);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          width: 100%;
          height: 160px;
          overflow: hidden;
          position: relative;
          background-color: var(--ddd-theme-default-slateLight);
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .card:hover .image-container img {
          transform: scale(1.05);
        }

        .content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }

        .content h3 {
          font-size: 18px;
          font-weight: bold;
          color: var(--ddd-theme-default-navy80);
          margin: 0;
        }

        .content p {
          font-size: 14px;
          color: var(--ddd-theme-default-limestoneGray);
          margin: 0;
          line-height: 1.4;
        }

        .actions {
          padding: 12px 16px;
          display: flex;
          justify-content: center;
          background-color: var(--ddd-theme-default-slateMaxLight);
        }

        .select-button {
          padding: 8px 24px;
          font-size: 14px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background-color: var(--ddd-theme-default-potential50);
          color: white;
          transition: background-color 0.2s;
        }

        .select-button:hover {
          background-color: var(--ddd-theme-default-potential60);
        }

        .select-button.selected {
          background-color: var(--ddd-theme-default-navy80);
        }
      `,
    ];
  }

  handleSelect(e) {
    e.stopPropagation();
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent("card-selected", {
        detail: {
          selected: this.selected,
          title: this.title,
          description: this.description,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="card ${this.selected ? 'selected' : ''}">
        <div class="image-container">
          <img 
            src="${this.imageURL || 'https://images.phillypublishing.com/onwardstate/uploads/2015/10/Old-Main-terrace-1913-1740x1160.jpg'}" 
            alt="${this.title}"
          />
        </div>
        <div class="content">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
        </div>
        <div class="actions">
          <button 
            class="select-button ${this.selected ? 'selected' : ''}"
            @click="${this.handleSelect}"
          >
            ${this.selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    `;
  }

  static get tag() {
    return "use-case-card";
  }
}

customElements.define(UseCaseCard.tag, UseCaseCard);