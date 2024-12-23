import { C8, css, html } from "./c8.js";

/* -------------------------------------------------- *
 * Hello world                                        *
 * -------------------------------------------------- */

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
    super.connectedCallback();
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

/* -------------------------------------------------- *
 * Callout                                            *
 * -------------------------------------------------- */

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
    super.connectedCallback();
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

/* -------------------------------------------------- *
 * Counter                                            *
 * -------------------------------------------------- */

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
    super.connectedCallback();
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

/* -------------------------------------------------- *
 * Event delegation                                   *
 * -------------------------------------------------- */

export class EventDelegation extends C8 {
  static tag = "c8-events";

  static events = ["keydown"];

  get template() {
    return html`
      <div data-on:keydown="logKeydown">
        <div>You pressed: <span data-ref="log">(no key pressed yet)</span></div>
        <input />
      </div>
    `;
  }

  /** @param {KeyboardEvent} event  */
  logKeydown(event) {
    console.log(event);
    this.ref("log").textContent = event.key;
  }
}

EventDelegation.define();
