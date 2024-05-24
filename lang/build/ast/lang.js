"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAST = createAST;
exports.parseInput = parseInput;
var _lang = require("../lexer/lang.js");
var _lang2 = require("../parser/lang.js");
function parseInput(input) {
  const lexingResult = _lang.lexer.tokenize(input);
  _lang2.parser.input = lexingResult.tokens;
  const cst = _lang2.parser.program();
  if (_lang2.parser.errors.length > 0) {
    throw new Error("Parsing errors detected");
  }
  return cst;
}
function createAST(cst) {
  // Convert CST to AST (simplified example)
  function convert(node) {
    if (!node) return null;
    if (node.name === "program") {
      return node.children.functionDeclaration.map(convert);
    }
    if (node.name === "functionDeclaration") {
      return {
        type: "FunctionDeclaration",
        name: node.children.Identifier[0].image,
        params: node.children.Identifier.slice(1).map(id => id.image),
        body: convert(node.children.block[0])
      };
    }
    if (node.name === "block") {
      return node.children.statement.map(convert);
    }
    if (node.name === "assignment") {
      return {
        type: "AssignmentExpression",
        left: node.children.Identifier[0].image,
        right: convert(node.children.expression[0])
      };
    }
    if (node.name === "returnStatement") {
      return {
        type: "ReturnStatement",
        argument: convert(node.children.expression[0])
      };
    }
    if (node.name === "expressionStatement") {
      return convert(node.children.expression[0]);
    }
    if (node.name === "expression" || node.name === "additionExpression" || node.name === "multiplicationExpression") {
      if (node.children.length === 1) {
        return convert(node.children[0]);
      }
      return {
        type: node.name === "additionExpression" ? "BinaryExpression" : "BinaryExpression",
        operator: node.children[1].image,
        left: convert(node.children[0]),
        right: convert(node.children[2])
      };
    }
    if (node.name === "atomicExpression") {
      const token = node.children[0];
      if (token.tokenType.name === "NumberLiteral" || token.tokenType.name === "StringLiteral") {
        return {
          type: "Literal",
          value: token.image
        };
      }
      if (token.tokenType.name === "Identifier") {
        return {
          type: "Identifier",
          name: token.image
        };
      }
      return convert(node.children.expression);
    }
  }
  return convert(cst);
}