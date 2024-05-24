import { CstParser } from "chevrotain";
import { 
  allTokens,
  WhiteSpace,
  FunctionKeyword,
  Return,
  LetKeyword,
  Identifier,
  NumberLiteral,
  StringLiteral,
  LParen,
  RParen,
  LBrace,
  RBrace,
  Comma,
  Plus,
  Minus,
  Multiplication,
  Division,
  Assign,
  SemiColon,
} from "../lexer/lang.js";

class BendScriptParser extends CstParser {
  constructor() {
    super(allTokens);

    const $ = this;

    $.RULE("program", () => {
      $.MANY(() => {
        $.SUBRULE($.functionDeclaration);
      });
    });

    $.RULE("functionDeclaration", () => {
      $.CONSUME(FunctionKeyword);
      $.CONSUME(Identifier);
      $.CONSUME(LParen);
      $.MANY_SEP({
        SEP: Comma,
        DEF: () => {
          $.CONSUME2(Identifier);
        },
      });
      $.CONSUME(RParen);
      $.CONSUME(LBrace);
      $.SUBRULE($.block);
      $.CONSUME(RBrace);
    });

    $.RULE("block", () => {
      $.MANY(() => {
        $.SUBRULE($.statement);
      });
    });

    $.RULE("statement", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.variableDeclaration) },
        { ALT: () => $.SUBRULE($.returnStatement) },
        { ALT: () => $.SUBRULE($.expressionStatement) },
      ]);
    });

    $.RULE("variableDeclaration", () => {
      $.CONSUME(LetKeyword);
      $.CONSUME(Identifier);
      $.CONSUME(Assign);
      $.SUBRULE($.expression);
      $.CONSUME(SemiColon);
    });

    $.RULE("assignment", () => {
      $.CONSUME(Identifier);
      $.CONSUME(Assign);
      $.SUBRULE($.expression);
      $.CONSUME(SemiColon);
    });

    $.RULE("returnStatement", () => {
      $.CONSUME(Return);
      $.SUBRULE($.expression);
      $.CONSUME(SemiColon);
    });

    $.RULE("expressionStatement", () => {
      $.SUBRULE($.expression);
      $.CONSUME(SemiColon);
    });

    $.RULE("expression", () => {
      $.SUBRULE($.additionExpression);
    });

    $.RULE("additionExpression", () => {
      $.SUBRULE($.multiplicationExpression);
      $.MANY(() => {
        $.CONSUME(Plus);
        $.SUBRULE2($.multiplicationExpression);
      });
    });

    $.RULE("multiplicationExpression", () => {
      $.SUBRULE($.atomicExpression);
      $.MANY(() => {
        $.CONSUME(Multiplication);
        $.SUBRULE2($.atomicExpression);
      });
    });

    $.RULE("atomicExpression", () => {
      $.OR([
        { ALT: () => $.CONSUME(NumberLiteral) },
        { ALT: () => $.CONSUME(StringLiteral) },
        { ALT: () => $.CONSUME(Identifier) },
        {
          ALT: () => {
            $.CONSUME(LParen);
            $.SUBRULE($.expression);
            $.CONSUME(RParen);
          },
        },
      ]);
    });

    this.performSelfAnalysis();
  }
}

const parser = new BendScriptParser();

export { 
  parser
};
