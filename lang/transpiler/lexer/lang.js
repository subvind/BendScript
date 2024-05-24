import { createToken, Lexer } from "chevrotain";

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});
export const FunctionKeyword = createToken({ name: "FunctionKeyword", pattern: /function/ });
export const Return = createToken({ name: "Return", pattern: /return/ });
export const LetKeyword = createToken({ name: "LetKeyword", pattern: /let/ });
export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z_]\w*/ });
export const NumberLiteral = createToken({ name: "NumberLiteral", pattern: /\d+/ });
export const StringLiteral = createToken({ name: "StringLiteral", pattern: /"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'/ });
export const LParen = createToken({ name: "LParen", pattern: /\(/ });
export const RParen = createToken({ name: "RParen", pattern: /\)/ });
export const LBrace = createToken({ name: "LBrace", pattern: /\{/ });
export const RBrace = createToken({ name: "RBrace", pattern: /\}/ });
export const Comma = createToken({ name: "Comma", pattern: /,/ });
export const Plus = createToken({ name: "Plus", pattern: /\+/ });
export const Minus = createToken({ name: "Minus", pattern: /-/ });
export const Multiplication = createToken({ name: "Multiplication", pattern: /\*/ });
export const Division = createToken({ name: "Division", pattern: /\// });
export const Assign = createToken({ name: "Assign", pattern: /=/ });
export const SemiColon = createToken({ name: "SemiColon", pattern: /;/ });

const allTokens = [
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
];

const lexer = new Lexer(allTokens);

export { 
  lexer, 
  allTokens 
};
