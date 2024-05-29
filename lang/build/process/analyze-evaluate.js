"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json = json;
exports.lang = lang;
var _acorn = require("acorn");
var _lang = require("../compile/lang.js");
var _json = require("../lexer/json.js");
var _json2 = require("../parser/json.js");
var _json3 = require("../interpreter/json.js");
// import acornJsx from 'acorn-jsx';
// import acornBigInt from 'acorn-bigint';

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
  const MyParser = _acorn.Parser.extend(
    // acornJsx(),
    // acornBigInt
  );
  let ast = MyParser.parse(text, {
    ecmaVersion: 'latest'
  });
  let bend = new _lang.Compile(ast);
  let bs = bend.script;
  return {
    value: bs,
    lexErrors: [],
    // Assuming you don't have lexical errors handling here
    parseErrors: [] // Assuming you don't have parsing errors handling here
  };
}