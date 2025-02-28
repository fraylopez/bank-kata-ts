import { expect } from "chai";
import { greet } from "../src/greet.ts";


it("interpolates name", () => {
  expect(greet("Alice")).to.equal("Hello, Alice.");
});

it("handle null", () => {
  expect(greet(null)).to.equal("Hello, my friend.");
});

it("handle shouting", () => {
  expect(greet("ALICE")).to.equal("HELLO, ALICE!");
});
