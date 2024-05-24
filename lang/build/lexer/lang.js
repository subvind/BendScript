"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lexer = exports.allTokens = exports.WhiteSpace = exports.StringLiteral = exports.SemiColon = exports.Return = exports.RParen = exports.RBrace = exports.Plus = exports.NumberLiteral = exports.Multiplication = exports.Minus = exports.LParen = exports.LBrace = exports.Identifier = exports.Function = exports.Division = exports.Comma = exports.Assign = void 0;
var _chevrotain = require("chevrotain");
const WhiteSpace = exports.WhiteSpace = (0, _chevrotain.createToken)({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: _chevrotain.Lexer.SKIPPED
});
const Function = exports.Function = (0, _chevrotain.createToken)({
  name: "Function",
  pattern: /function/
});
const Return = exports.Return = (0, _chevrotain.createToken)({
  name: "Return",
  pattern: /return/
});
const Identifier = exports.Identifier = (0, _chevrotain.createToken)({
  name: "Identifier",
  pattern: /[a-zA-Z_]\w*/
});
const NumberLiteral = exports.NumberLiteral = (0, _chevrotain.createToken)({
  name: "NumberLiteral",
  pattern: /\d+/
});
const StringLiteral = exports.StringLiteral = (0, _chevrotain.createToken)({
  name: "StringLiteral",
  pattern: /"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'/
});
const LParen = exports.LParen = (0, _chevrotain.createToken)({
  name: "LParen",
  pattern: /\(/
});
const RParen = exports.RParen = (0, _chevrotain.createToken)({
  name: "RParen",
  pattern: /\)/
});
const LBrace = exports.LBrace = (0, _chevrotain.createToken)({
  name: "LBrace",
  pattern: /\{/
});
const RBrace = exports.RBrace = (0, _chevrotain.createToken)({
  name: "RBrace",
  pattern: /\}/
});
const Comma = exports.Comma = (0, _chevrotain.createToken)({
  name: "Comma",
  pattern: /,/
});
const Plus = exports.Plus = (0, _chevrotain.createToken)({
  name: "Plus",
  pattern: /\+/
});
const Minus = exports.Minus = (0, _chevrotain.createToken)({
  name: "Minus",
  pattern: /-/
});
const Multiplication = exports.Multiplication = (0, _chevrotain.createToken)({
  name: "Multiplication",
  pattern: /\*/
});
const Division = exports.Division = (0, _chevrotain.createToken)({
  name: "Division",
  pattern: /\//
});
const Assign = exports.Assign = (0, _chevrotain.createToken)({
  name: "Assign",
  pattern: /=/
});
const SemiColon = exports.SemiColon = (0, _chevrotain.createToken)({
  name: "SemiColon",
  pattern: /;/
});
const allTokens = exports.allTokens = [WhiteSpace, Function, Return, Identifier, NumberLiteral, StringLiteral, LParen, RParen, LBrace, RBrace, Comma, Plus, Minus, Multiplication, Division, Assign, SemiColon];
const lexer = exports.lexer = new _chevrotain.Lexer(allTokens);