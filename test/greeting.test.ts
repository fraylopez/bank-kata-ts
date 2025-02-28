import { expect } from "chai";


it("interpolates name", () => {
  expect(greet("Alice")).to.equal("Hello, Alice.");
});

function greet(who: string) {
  return `Hello, ${who}.`;
}
