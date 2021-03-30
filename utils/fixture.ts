import { fixtureCleanup } from "./wrappers";

export { fixture } from "./fixture-no-side-effects";

try {
  // we should not assume that our users load mocha types globally
  // @ts-ignore
  if ("afterEach" in window) {
    // @ts-ignore
    afterEach(() => {
      fixtureCleanup();
    });
  }
  // @ts-ignore
  if ("teardown" in window) {
    // @ts-ignore
    teardown(() => {
      fixtureCleanup();
    });
  }
} catch (error) {
  /* do nothing */
}
