import { wrap } from "./wrappers";
import type { SvelteComponent } from "svelte";

export function fixture(Component: typeof SvelteComponent, props: any) {
  const element = wrap();
  return new Component({ target: element, props });
}
