import { expect } from "@open-wc/testing";
import Test from "../Test.svelte";
import { fixture } from "../utils/fixture";

it("tests .svelte", async () => {
  const component = fixture(Test, {});
  expect(component).to.not.be.false;
  const paragraph = document.querySelector("p.Test");
  expect(paragraph).to.not.be.null;
  expect(paragraph?.textContent).to.equal("test");
});

it("correctly sets props", async () => {
  const component = fixture(Test, { foo: "foo" });
  expect(component).to.not.be.false;
  const paragraph = document.querySelector("p.Test");
  expect(paragraph).to.not.be.null;
  expect(paragraph?.textContent).to.equal("foo");
});
it("correctly loads styles", async () => {
  const component = fixture(Test, { foo: "foo" });
  expect(component).to.not.be.false;
  const paragraph = document.querySelector("p.Test");
  let styles;
  if (paragraph) {
    styles = window.getComputedStyle(paragraph);
    expect(styles.getPropertyValue("margin-top")).to.equal("32px");
  }
  expect(styles).to.not.be.null;
});

// it("tests .svelte without fixture", async () => {
//   const div = document.createElement("div");
//   document.body.appendChild(div);
//   const component = new Test({ target: div, props: {} });
//   expect(component).to.not.be.false;
//   const paragraph = document.querySelector("p.Test");
//   expect(paragraph).to.not.be.null;
//   expect(paragraph?.textContent).to.equal("test");
// });
