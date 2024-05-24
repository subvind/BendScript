"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json = json;
exports.lang = lang;
var _json = require("../lexer/json.js");
var _json2 = require("../parser/json.js");
var _json3 = require("../interpreter/json.js");
var _lang = require("../ast/lang.js");
var _lang2 = require("../visitor/lang.js");
function json(text) {
  // 1. Tokenize the input.
  const lexResult = _json.lexer.tokenize(text);

  // 2. Parse the Tokens vector.
  // setting a new input will RESET the parser instance's state.
  _json2.parser.input = lexResult.tokens;

  // any top level rule may be used as an entry point
  const cst = _json2.parser.json();

  // 3. Perform semantics using a CstVisitor.
  // Note that separation of concerns between the syntactic analysis (parsing) and the semantics.
  const value = _json3.interpreter.visit(cst);
  return {
    value: value,
    lexErrors: lexResult.errors,
    parseErrors: _json2.parser.errors
  };
}
function lang(text) {
  // const input = `
  // function add(a, b) {
  //   let c = a + b;
  //   return c;
  // }
  // `;

  const cst = (0, _lang.parseInput)(text);
  const ast = (0, _lang.createAST)(cst);
  const visitor = new _lang2.ASTVisitor();
  const bendCode = ast.map(node => visitor.visit(node)).join("\n");
  return bendCode;
}