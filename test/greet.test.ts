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

it("handle two names", () => {
  expect(greet(["Bob", "Alice"])).to.equal("Hello, Bob and Alice");
  expect(greet(["Peter", "Alice"])).to.equal("Hello, Peter and Alice");
});