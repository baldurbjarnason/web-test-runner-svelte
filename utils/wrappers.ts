export const wrappers: Array<Node> = [];

export function wrap() {
  const parent: Element = document.createElement("div");
  document.body.appendChild(parent);
  wrappers.push(parent);
  return parent;
}

export function fixtureCleanup() {
  for (const wrapper of wrappers) {
    document.body.removeChild(wrapper);
  }
  wrappers.length = 0;
}
