import { expect } from "chai";
import { HelloWorld } from "../src/HelloWorld.ts";

it("hello world", () => {
  expect(new HelloWorld().sayHello()).to.equal("Hello World!");
});

