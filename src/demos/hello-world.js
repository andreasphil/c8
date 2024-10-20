// @ts-check
import { C8, css, html } from "../lib.js";

export class HelloWorld extends C8 {
  static tag = "c8-hello-world";

  static attrs = {
    name: { parse: String, default: () => "world" },
  };

  get styles() {
    return css`
      .name {
        font-weight: bold;
      }
    `;
  }

  get template() {
    return html`<span>
      Hello, <span class="name" data-ref="name"></span>!
    </span>`;
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  update() {
    this.ref("name").innerText = this.attrs.name;
  }
}

HelloWorld.define();
