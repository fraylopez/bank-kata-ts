import { expect } from "chai";
import { greet } from "../src/greet.ts";


it("interpolates name", () => {
  expect(greet("Alice")).to.equal("Hello, Alice.");
});

it("handle null", () => {
  expect(greet(null)).to.equal("Hello, my friend.");
});

it("handle shouting", () => {
  expect(greet("ALICE")).to.equal("HELLO ALICE!");
});

it("handle two names", () => {
  expect(greet(["Bob", "Alice"])).to.equal("Hello, Bob and Alice.");
  expect(greet(["Peter", "Alice"])).to.equal("Hello, Peter and Alice.");
});

it("handle three names", () => {
  expect(greet(["Peter", "Alice", "Bob"])).to.equal("Hello, Peter, Alice and Bob.");
});

it("handle shouting and normal greeting", () => {
  expect(greet(["Peter", "ALICE", "Bob"])).to.equal("Hello, Peter and Bob. AND HELLO ALICE!");
  expect(greet(["Peter", "ALICE"])).to.equal("Hello, Peter. AND HELLO ALICE!");
  expect(greet(["PETER", "Alice"])).to.equal("Hello, Alice. AND HELLO PETER!");
});

it("handle composed greeting", () => {
  expect(greet(["Peter", "Alice, Bob"])).to.equal("Hello, Peter, Alice and Bob.");
});

it("handle escaped grouping", () => {
  expect(greet(["\"Alice, Bob\"", "Charlie"])).to.equal("Hello, Alice and Bob, Charlie.");
});