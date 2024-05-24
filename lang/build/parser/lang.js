"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parser = void 0;
var _chevrotain = require("chevrotain");
var _lang = require("../lexer/lang.js");
class JavaScriptParser extends _chevrotain.CstParser {
  constructor() {
    super(_lang.allTokens);
    const $ = this;
    $.RULE("program", () => {
      $.MANY(() => {
        $.SUBRULE($.functionDeclaration);
      });
    });
    $.RULE("functionDeclaration", () => {
      $.CONSUME(_lang.Function);
      $.CONSUME(_lang.Identifier);
      $.CONSUME(_lang.LParen);
      $.MANY_SEP({
        SEP: _lang.Comma,
        DEF: () => {
          $.CONSUME2(_lang.Identifier);
        }
      });
      $.CONSUME(_lang.RParen);
      $.CONSUME(_lang.LBrace);
      $.SUBRULE($.block);
      $.CONSUME(_lang.RBrace);
    });
    $.RULE("block", () => {
      $.MANY(() => {
        $.SUBRULE($.statement);
      });
    });
    $.RULE("statement", () => {
      $.OR([{
        ALT: () => $.SUBRULE($.assignment)
      }, {
        ALT: () => $.SUBRULE($.returnStatement)
      }, {
        ALT: () => $.SUBRULE($.expressionStatement)
      }]);
    });
    $.RULE("assignment", () => {
      $.CONSUME(_lang.Identifier);
      $.CONSUME(_lang.Assign);
      $.SUBRULE($.expression);
      $.CONSUME(_lang.SemiColon);
    });
    $.RULE("returnStatement", () => {
      $.CONSUME(_lang.Return);
      $.SUBRULE($.expression);
      $.CONSUME(_lang.SemiColon);
    });
    $.RULE("expressionStatement", () => {
      $.SUBRULE($.expression);
      $.CONSUME(_lang.SemiColon);
    });
    $.RULE("expression", () => {
      $.SUBRULE($.additionExpression);
    });
    $.RULE("additionExpression", () => {
      $.SUBRULE($.multiplicationExpression);
      $.MANY(() => {
        $.CONSUME(_lang.Plus);
        $.SUBRULE2($.multiplicationExpression);
      });
    });
    $.RULE("multiplicationExpression", () => {
      $.SUBRULE($.atomicExpression);
      $.MANY(() => {
        $.CONSUME(_lang.Multiplication);
        $.SUBRULE2($.atomicExpression);
      });
    });
    $.RULE("atomicExpression", () => {
      $.OR([{
        ALT: () => $.CONSUME(_lang.NumberLiteral)
      }, {
        ALT: () => $.CONSUME(_lang.StringLiteral)
      }, {
        ALT: () => $.CONSUME(_lang.Identifier)
      }, {
        ALT: () => {
          $.CONSUME(_lang.LParen);
          $.SUBRULE($.expression);
          $.CONSUME(_lang.RParen);
        }
      }]);
    });
    this.performSelfAnalysis();
  }
}
const parser = exports.parser = new JavaScriptParser();