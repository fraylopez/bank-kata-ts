import { expect } from "chai";


it("interpolates name", () => {
  expect(greet("Alice")).to.equal("Hello, Alice.");
});

it("handle null", () => {
  expect(greet(null)).to.equal("Hello, my friend.");
});

function greet(who: string | null): string {
  if (who === null) {
    return "Hello, my friend.";
  }
  return `Hello, ${who}.`;
}
