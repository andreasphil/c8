// @ts-check
import { C8, css, html } from "../lib.js";

export class Counter extends C8 {
  static tag = "c8-counter";

  static events = ["click"];

  static attrs = {
    value: { parse: Number, default: () => "1" },
  };

  get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .counter {
        align-items: center;
        display: flex;
        gap: 1rem;
        background: color-mix(in srgb, gold, transparent 70%);
        border-radius: 0.5rem;
      }

      button {
        font: inherit;
        background: gold;
        border: none;
        padding: 0.5rem 1rem;

        &:first-child {
          border-radius: 0.5rem 0 0 0.5rem;
        }

        &:last-child {
          border-radius: 0 0.5rem 0.5rem 0;
        }
      }
    `;
  }

  get template() {
    return html`
      <div class="counter">
        <button data-on:click="decrement">Decrement</button>
        <output data-ref="output"></output>
        <button data-on:click="increment">Increment</button>
      </div>
    `;
  }

  connectedCallback() {
    this.update();
  }

  update() {
    this.ref("output").innerText = this.attrs.value;
  }

  increment() {
    this.attrs.value += 1;
    this.update();
    this.emit("increment", this.attrs.value);
  }

  decrement() {
    this.attrs.value -= 1;
    this.update();
    this.emit("decrement", this.attrs.value);
  }
}

Counter.define();
