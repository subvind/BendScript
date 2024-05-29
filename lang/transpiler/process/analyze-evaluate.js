import { Parser } from "acorn";
import { Compile } from "../compile/lang.js"
// import acornJsx from 'acorn-jsx';
// import acornBigInt from 'acorn-bigint';

import { lexer } from "../lexer/json.js"
import { parser } from "../parser/json.js"
import { interpreter } from "../interpreter/json.js"

export function json (text) {
  // 1. Tokenize the input.
  const lexResult = lexer.tokenize(text)

  // 2. Parse the Tokens vector.
  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens

  // any top level rule may be used as an entry point
  const cst = parser.json()

  // 3. Perform semantics using a CstVisitor.
  // Note that separation of concerns between the syntactic analysis (parsing) and the semantics.
  const value = interpreter.visit(cst)

  return {
    value: value,
    lexErrors: lexResult.errors,
    parseErrors: parser.errors
  }
}

export function lang (text) {
  
  const MyParser = Parser.extend(
    // acornJsx(),
    // acornBigInt
  )
  let ast = MyParser.parse(text, {
    ecmaVersion: 'latest'
  });

  let bend = new Compile(ast);
  let bs = bend.script;

  return {
    value: bs,
    lexErrors: [], // Assuming you don't have lexical errors handling here
    parseErrors: [], // Assuming you don't have parsing errors handling here
  }
}