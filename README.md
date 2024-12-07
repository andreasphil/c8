<h1 align="center">
  C8 🧩
</h1>

<p align="center">
  <strong>Lightweight base class for custom elements</strong>
</p>

- 💥 Opinionated, consistent structure for markup, styles and registration
- 🗺️ Typed template refs for easy DOM access
- 🔁 Automatic attribute value conversion and reflection
- 🎭 Declarative event binding
- 🌒 Shadow and light DOM support
- 👌 Fully typed and tested
- 🐛 Tiny (~1kb min+gzip) footprint with no runtime dependencies

## Installation

From a CDN:

```js
import { C8 } from "https://esm.sh/gh/andreasphil/c8@<tag>";
```

With a package manager:

```sh
npm i github:andreasphil/c8#<tag>
```

## Usage

For the most basic component, extend `C8` and specify a `tag` and `template`. You can also add styles:

```js
import { C8, html, css } from "c8";

class HelloWorld extends C8 {
  static tag = "hello-world";

  get template() {
    return html`<span>Hello world!</span>`;
  }

  get styles() {
    return css`
      span {
        font-weight: bold;
      }
    `;
  }
}

HelloWorld.define();
```

### Template refs

In your template, annotate an element with `data-ref` to get access to it via the ref helpers:

```js
class Name extends C8 {
  // ...

  get template() {
    return html`<span data-ref="firstname"></span>
      <span data-ref="lastname"></span>`;
  }

  update() {
    // Either get all refs at once ...
    const { firstname, lastname } = this.refs();

    // Or access a ref when you're sure it exists—this will throw if the
    // element is not found!
    this.ref("firstname").innerText = "Foo";

    // Or access a ref that might not exist
    if (this.maybeRef("lastname")) this.maybeRef("lastname").innerText = "Bar";
  }
}
```

### Attributes

If you override the static `attrs` property, C8 will use that information to automatically read attributes, parse them into other data types, and sync changes back to the attribute value:

```js
class Counter extends C8 {
  // ...

  static attrs = {
    count: { parse: Number, default: () => "1" },
  };

  increment() {
    this.attrs.count += 1;
    this.update();
  }
}
```

### Declarative event binding

Annotate elements in your template with `data-on:<eventname>` to get automatic event binding. This only supports very basic use cases, but saves you quite a bit of boilerplate if "basic" is what you need:

```js
class Counter extends C8 {
  // ...

  static events = ["click"];

  get template() {
    return html`<button data-on:click="increment">Increment</button>`;
  }

  increment() {
    this.attrs.count += 1;
    this.update();
  }
}
```

### Shadow and light DOM

C8 elements will use shadow DOM encapsulation in `open` mode by default. Use the [static `disabledFeatures` property](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#disabling_shadow_dom) to switch to light DOM:

```js
class LightDom extends C8 {
  // ...

  static disabledFeatures = ["shadow"];
}
```

Note that `get styles()` must return `undefined` when light DOM is used, since this feature uses adopted stylesheets on the shadow DOM.

### TypeScript

C8 is fully typed and comes with a few helpers to make working with TypeScript even easier:

```ts
// Use the generic C8 type to define details about your attributes, refs, and
// events:

type ExampleAttrs = { value: string };

type ExampleRefs = { input: HTMLInputElement };

type ExampleEvents = { valueChange: string };

class Example extends C8<ExampleAttrs, ExampleRefs, ExampleEvents> {
  // ...

  // Static attributes don't have access to class generics, but you can use
  // the Attrs<T> helper type to prevent mismatches.
  static attrs: Attrs<ExampleAttrs> = {
    // `defineAttr` is a helper that only adds type inference
    value: defineAttr({ parse: String }),
  };

  emitUpdate() {
    // Event name, payload and ref will be typed according to the generic
    this.emit("valueChange", this.ref("input").value);
  }
}
```

### API

See [lib.d.ts](./dist/lib.d.ts) for all available methods and docs, our check out the [demos](./src/demo.js).

## Development

This library is built with [esbuild](https://esbuild.github.io). Packages are managed by [pnpm](https://pnpm.io). Tests are powered by [Node.js' test runner](https://nodejs.org/en/learn/test-runner/introduction). The following commands are available:

```sh
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
pnpm build        # Typecheck, emit declarations and bundle
```

## Credits

This library uses a number of open source packages listed in [package.json](package.json).

Thanks 🙏
