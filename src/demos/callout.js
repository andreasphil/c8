// @ts-check
import { C8, css, html } from "../lib.js";

export class Callout extends C8 {
  static tag = "c8-callout";

  static attrs = {
    title: { parse: String },
  };

  get styles() {
    return css`
      .callout {
        border-left: 4px solid skyblue;
        padding: 0.75rem 1rem;
        background: color-mix(in srgb, skyblue, transparent 80%);

        p {
          margin: 0;
        }

        .title {
          font-weight: bold;
          color: color-mix(in srgb, skyblue, black 50%);
        }
      }
    `;
  }

  get template() {
    return html`<div class="callout">
      <p class="title" data-ref="title"></p>
      <slot />
    </div>`;
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    this.ref("title").innerText = this.attrs.title;
    console.log("update");
  }
}

Callout.define();
