"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lexer = exports.allTokens = exports.WhiteSpace = exports.True = exports.To = exports.StringLiteral = exports.SemiColon = exports.RSquare = exports.RCurly = exports.NumberLiteral = exports.Null = exports.LSquare = exports.LCurly = exports.From = exports.False = exports.Comma = exports.Colon = void 0;
var _chevrotain = require("chevrotain");
// ----------------- lexer -----------------
const True = exports.True = (0, _chevrotain.createToken)({
  name: "True",
  pattern: /true/
});
const False = exports.False = (0, _chevrotain.createToken)({
  name: "False",
  pattern: /false/
});
const Null = exports.Null = (0, _chevrotain.createToken)({
  name: "Null",
  pattern: /null/
});
const LCurly = exports.LCurly = (0, _chevrotain.createToken)({
  name: "LCurly",
  pattern: /\{/
});
const RCurly = exports.RCurly = (0, _chevrotain.createToken)({
  name: "RCurly",
  pattern: /\}/
});
const LSquare = exports.LSquare = (0, _chevrotain.createToken)({
  name: "LSquare",
  pattern: /\[/
});
const RSquare = exports.RSquare = (0, _chevrotain.createToken)({
  name: "RSquare",
  pattern: /\]/
});
const Comma = exports.Comma = (0, _chevrotain.createToken)({
  name: "Comma",
  pattern: /,/
});
const Colon = exports.Colon = (0, _chevrotain.createToken)({
  name: "Colon",
  pattern: /\:/
});
const SemiColon = exports.SemiColon = (0, _chevrotain.createToken)({
  name: "SemiColon",
  pattern: /\;/
});
const From = exports.From = (0, _chevrotain.createToken)({
  name: "From",
  pattern: /from/
});
const To = exports.To = (0, _chevrotain.createToken)({
  name: "To",
  pattern: /to/
});
const StringLiteral = exports.StringLiteral = (0, _chevrotain.createToken)({
  name: "StringLiteral",
  pattern: /"(?:[^\\"]|\\(?:[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
});
const NumberLiteral = exports.NumberLiteral = (0, _chevrotain.createToken)({
  name: "NumberLiteral",
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
});
const WhiteSpace = exports.WhiteSpace = (0, _chevrotain.createToken)({
  name: "WhiteSpace",
  pattern: /[ \t\n\r]+/,
  // ignore whitespace
  group: _chevrotain.Lexer.SKIPPED
});
const allTokens = exports.allTokens = [WhiteSpace, NumberLiteral, StringLiteral, LCurly, RCurly, LSquare, RSquare, Comma, Colon, SemiColon, True, False, Null];
const lexer = exports.lexer = new _chevrotain.Lexer(allTokens);