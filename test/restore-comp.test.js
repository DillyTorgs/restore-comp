import { html, fixture, expect } from '@open-wc/testing';
import "../restore-comp.js";

describe("RestoreComp test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <restore-comp
        title="title"
      ></restore-comp>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
