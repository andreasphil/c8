import { JSDOM } from "jsdom";
import assert from "node:assert/strict";
import { afterEach, before, describe, mock, test } from "node:test";

describe("C8", () => {
  /** @type {import("jsdom").DOMWindow} */
  let window;

  /** @type {typeof import("./lib.js").C8} */
  let TestC8;

  /**
   * @param {typeof import("./lib.js").C8} component
   * @param {string} html
   * @returns {{ container: HTMLBodyElement, el: import("./lib.js").C8 }}
   */
  function render(component, html) {
    const container = window.document.querySelector("body");
    if (!window.customElements.get(component.tag)) component.define();
    container.innerHTML = html;

    return { container, el: container.querySelector(component.tag) };
  }

  before(async () => {
    const dom = new JSDOM("<!DOCTYPE html><body></body>");
    window = dom.window;

    globalThis.HTMLElement = dom.window.HTMLElement;
    globalThis.customElements = dom.window.customElements;
    globalThis.document = dom.window.document;

    const { C8 } = await import("./lib.js");
    TestC8 = C8;
  });

  afterEach(() => {
    window.document.querySelector("body").innerHTML = "";
  });

  test("renders", async () => {
    class HelloWorld extends TestC8 {
      static tag = "c8-hello-world";
      static disabledFeatures = ["shadow"];
      get template() {
        return "<h1>Hello world</h1>";
      }
    }

    const { el } = render(HelloWorld, `<c8-hello-world></c8-hello-world>`);

    assert.equal(el.querySelector("h1").textContent, "Hello world");
  });

  describe("definition", () => {
    test("is defined", () => {
      class DefineTest extends TestC8 {
        static tag = "c8-test";
      }

      assert(!window.customElements.get("c8-test"));
      DefineTest.define();
      assert(window.customElements.get("c8-test"));
    });

    test("throws if tag name is missing", () => {
      class Test extends TestC8 {}

      assert.throws(() => Test.define());
    });
  });

  describe("attributes", () => {
    let AttributesTest;

    before(() => {
      AttributesTest = class AttributesTest extends TestC8 {
        static tag = "c8-attributes";
        static attrs = {
          foo: {},
          bar: { parse: Number, stringify: (val) => val.toFixed(2) },
          baz: { default: () => "test" },
        };
        get template() {
          return `<span></span>`;
        }
      };

      AttributesTest.define();
    });

    test("returns observed attributes", () => {
      assert.deepEqual(AttributesTest.observedAttributes, [
        "foo",
        "bar",
        "baz",
      ]);
    });

    test("reads string attributes by default", () => {
      const { el } = render(
        AttributesTest,
        `<c8-attributes foo="bar"></c8-attributes>`
      );

      assert.equal(el.attrs.foo, "bar");
    });

    test("reflects string attributes by default", () => {
      const { el } = render(
        AttributesTest,
        `<c8-attributes foo="bar"></c8-attributes>`
      );

      el.attrs.foo = "baz";
      assert.equal(el.getAttribute("foo"), "baz");
    });

    test("reads attributes with a custom parser", () => {
      const { el } = render(
        AttributesTest,
        `<c8-attributes bar="1"></c8-attributes>`
      );

      assert.equal(el.attrs.bar, 1);
    });

    test("reflects attributes with a custom serializer", () => {
      const { el } = render(
        AttributesTest,
        `<c8-attributes bar="1"></c8-attributes>`
      );

      el.attrs.bar = 2;
      assert.equal(el.getAttribute("bar"), "2.00");
    });

    test("sets a default value", () => {
      const { el } = render(AttributesTest, `<c8-attributes></c8-attributes>`);
      assert.equal(el.getAttribute("baz"), "test");
    });
  });

  describe("events", () => {
    let EventsTest;
    const handler = mock.fn();

    before(() => {
      EventsTest = class EventsTest extends TestC8 {
        static tag = "c8-events";
        static disabledFeatures = ["shadow"];
        static events = ["click"];
        get template() {
          return `<button data-on:click="handleClick">Click <span>me</span></button>`;
        }
        handleClick() {
          handler();
        }
      };

      EventsTest.define();
    });

    test("handles a direct event on an element with a handler", () => {
      const { el } = render(EventsTest, `<c8-events></c8-events>`);
      el.querySelector("button").click();
      assert.equal(handler.mock.callCount(), 1);
    });

    test.todo("ignores undeclared events");

    test.todo("handles an event on a child of an element with a handler");

    test.todo("handles events on elementes inserted after initalization");
  });

  describe.todo("styles");

  describe("template", () => {
    test.todo("renders an inline template");

    test.todo("renders a template via ID");

    test.todo("throws if no template is specified");

    test.todo("throws if a referenced template could not be found");
  });

  describe("refs", () => {
    test.todo("returns a required ref");

    test.todo("throws if a required ref is not found");

    test.todo("returns an optional ref");

    test.todo("returns undefined if an optional ref is not found");

    test.todo("returns all refs");
  });

  describe("emit", () => {
    test.todo("emits an event");
  });
});
