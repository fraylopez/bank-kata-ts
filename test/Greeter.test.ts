import { expect } from "chai";
import { Greeter } from "../src/Greeter.ts";

const greeter = new Greeter();

it("interpolates name", () => {
  expect(greeter.greet("Alice")).to.equal("Hello, Alice.");
});

it("handle null", () => {
  expect(greeter.greet(null)).to.equal("Hello, my friend.");
});

it("handle shouting", () => {
  expect(greeter.greet("ALICE")).to.equal("HELLO, ALICE!");
});
