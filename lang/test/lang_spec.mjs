import assert from "assert"
import transpiler from "../transpiler/index.js"

const inputText = `function add(a, b) {
  let c = a + b;
  return c;
}`;
const outputText = `def add(a, b):
  c = a = b
  return c`;
describe("BendScript", () => {
  it("compiles js function to bend def", () => {
    const result = transpiler.eval.lang(inputText)

    console.log("errors:", result.parseErrors)

    assert.equal(result.lexErrors.length, 0)
    assert.equal(result.parseErrors.length, 0)
    assert.equal(outputText, result.value)

    console.log("errors:", result.lexErrors)
    console.log("inputText", inputText)
    console.log("outputText", result.value)
  })
})