import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { LitElement, html, css } from "lit";

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
        /* Cards */
        .use-case-card {
          background: var(--ddd-theme-default-white);
          border-radius: var(--ddd-radius-md);
          border: var(--ddd-border-xs) solid var(--ddd-primary-4);
          box-shadow: var(--ddd-boxShadow-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: var(--ddd-spacing-4);
          gap: var(--ddd-spacing-3);
        }
        .use-case-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          background: var(--ddd-accent-2);
        }
        .use-case-card h3 {
          font-size: var(--ddd-font-size-xxs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-primary-4);
          margin: var(--ddd-spacing-2) 0 0 0;
        }
        .use-case-card p {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-primary-5);
          line-height: var(--ddd-lh-150);
          margin: 0 0 var(--ddd-spacing-4) 0;
        }
        .use-case-card a {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-link);
          text-decoration: none;
          margin-bottom: var(--ddd-spacing-2);
        }
        .use-case-card a:hover {
          text-decoration: underline;
        }
        .use-case-card button {
          background-color: var(--ddd-primary-8);
          color: var(--ddd-theme-default-white);
          border: none;
          border-radius: var(--ddd-radius-xs);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-3xs);
          cursor: pointer;
        }
        .use-case-card button:hover {
          background-color: var(--ddd-primary-6);
        }
      `,
    ];
  }

  render() {
    return html`
        <div class="card">
          <img src="${this.imageURL}" alt="Image for ${this.title}">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <a href="${this.memo}" target="_blank">Select </a>
      </div>
    `;
  }

  static get tag() {
    return "use-case-card";
  }
}
customElements.define(UseCaseCard.tag, UseCaseCard);