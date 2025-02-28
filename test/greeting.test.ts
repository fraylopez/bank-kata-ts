import { expect } from "chai";


it("interpolates name", () => {
  expect(greet("Alice")).to.equal("Hello, Alice.");
});

it("handle null", () => {
  expect(greet(null)).to.equal("Hello, my friend.");
});

function greet(who: string) {
  return `Hello, ${who}.`;
}
