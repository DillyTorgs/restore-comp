import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class UseCaseCard extends DDDSuper(LitElement) {
  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.imageURL = "";
    this.demo = "";
  }

  static get properties() {
    return {
      id: { type: String },
      tag: { type: String },
      title: { type: String },
      description: { type: String },
      imageURL: { type: String },
      demo: { type: String },
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
          background-color: var(--ddd-theme-default-infoLight);
          border: 2px solid var(--ddd-theme-default-slateMaxLight);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          border-color: var(--ddd-theme-default-potential50);
        }

        .card img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          background-color: var(--ddd-theme-default-infoLight);
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
          margin-top: auto;
          display: flex;
          justify-content: center;
          padding: 12px 16px;
          background-color: var(--ddd-theme-default-skyMaxLight);
          border-top: 1px solid var(--ddd-theme-default-slateMaxLight);
        }

        .actions a {
          text-decoration: none;
          background-color: var(--ddd-theme-default-potential50);
          color: white;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .actions a:hover {
          background-color: var(--ddd-theme-default-potential60);
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card">
        <img src="${this.imageURL}" alt="${this.title}" />
        <div class="content">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
        </div>
        <div class="actions">
          <a href="${this.demo}" target="_blank" rel="noopener">Select</a>
        </div>
      </div>
    `;
  }

  static get tag() {
    return "use-case-card";
  }
}

customElements.define(UseCaseCard.tag, UseCaseCard);