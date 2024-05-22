let { Lexer, CstParser } = require("chevrotain");

// Lexer definitions (replace with your keywords and operators)
const MyLangLexer = new Lexer();

MyLangLexer.defineToken({
  name: "Keyword",
  pattern: /class|constructor|function|if|else|for|while|return/i,
  categories: Lexer.TOKEN_CATEGORIES.KEYWORD,
});

MyLangLexer.defineToken({
  name: "Identifier",
  pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
  categories: Lexer.TOKEN_CATEGORIES.IDENTIFIER,
});

MyLangLexer.defineToken({
  name: "Integer",
  pattern: /\d+/,
  categories: Lexer.TOKEN_CATEGORIES.NUMBER,
});

// Parser definitions (replace with grammar rules)
class MyLangParser extends CstParser {
  constructor() {
    super();
    this.RULE("program", () => {
      this.MANY(() => {
        this.OR([
          this.RULE("classDefinition"),
          // Add rules for other statements (functions, variables)
        ]);
      });
    });
    this.RULE("classDefinition", () => {
      this.CONSUME(this.TOKEN.CLASS);
      this.CONSUME(this.TOKEN.Identifier, { LABEL: "className" });
      this.CONSUME(this.SYMBOL, "{");
      this.MANY(() => this.OR([
          this.RULE("methodDefinition"),
          this.RULE("attributeDefinition"),
        ]), { LABEL: "classBody" });
      this.CONSUME(this.SYMBOL, "}");
    });
    this.RULE("methodDefinition", () => {
      this.CONSUME(this.TOKEN.Keyword, { LABEL: "methodType" });  // Capture method type (constructor, function)
      this.CONSUME(this.TOKEN.Identifier, { LABEL: "methodName" });
      this.CONSUME(this.SYMBOL, "(");
      this.OPTION(() => {
        this.MANY(() => this.RULE("parameter"));
      });
      this.CONSUME(this.SYMBOL, ")");
      this.CONSUME(this.SYMBOL, "{");
      this.MANY(() => this.RULE("statement"));
      this.CONSUME(this.SYMBOL, "}");
    });
    this.RULE("attributeDefinition", () => {
      this.CONSUME(this.TOKEN.Identifier, { LABEL: "attributeName" });
      this.CONSUME(this.SYMBOL, ":");
      this.CONSUME(this.AT_LEAST_ONE(() => this.OR([
        this.TOKEN.Identifier,
        this.TOKEN.Integer,
      ])));
    });
    // Add more rules for statements (if, for, while), expressions etc.
  }

  // Transpilation functions (replace with your Bend-lang generation logic)
  transpileToBendLang(cstNode) {
    switch (cstNode.name) {
      case "program":
        let bendLangCode = "";
        for (const node of cstNode.children) {
          bendLangCode += this.transpileStatement(node) + "\n";
        }
        return bendLangCode;
      case "classDefinition":
        const className = cstNode.children[1].image;
        let classCode = `def ${className}():\n`;
        for (const member of cstNode.children[3].children) {
          classCode += this.transpileMember(member) + "\n";
        }
        classCode += "  pass\n";  // Add empty "pass" statement to terminate the function body in Bend-lang
        return classCode;
      // Add transpilation logic for other grammar rules
      default:
        return "";
    }
  }

  transpileMember(cstNode) {
    switch (cstNode.name) {
      case "methodDefinition":
        const methodName = cstNode.children[1].image;
        let methodParams = "";
        if (cstNode.children[3].children.length > 0) {
          methodParams = cstNode.children[3].children.map(param => param.children[0].image).join(", ");
        }
        let methodBody = this.transpileBlock(cstNode.children[5]);
        return `  def ${methodName}(${methodParams}):\n${methodBody}`;
      case "attributeDefinition":
        const attributeName = cstNode.children[0].image;
        // No direct attribute definition in Bend-lang, so we can comment it out
        // return `  # ${attributeName}\n`;
        return "";
      default:
        return "";
    }
  }

  transpileBlock(cstNode) {
    let blockCode = "";
    for (const statement of cstNode.children) {
      blockCode += this.transpileStatement(statement) + "\n";
    }
    return blockCode;
  }

  // Add more transpilation logic for statements (if, for, while), expressions etc.
}

// Create a combined parser
const parser = new MyLangParser();

// Parse input code and generate Bend-lang code
function compileToBendLang(code) {
  const lexResult = MyLangLexer.tokenize(code);
  parser.input = lexResult.tokens;
  const cstOutput = parser.program();
  if (parser.errors.length > 0) {
    // Handle parsing errors
    console.error("Parsing Errors:", parser.errors);
    return "";
  }
  return parser.transpileToBendLang(cstOutput);
}

// Example usage
const sampleCode = `
  class Point {
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    distanceTo(other: Point): number {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
`;

const bendLangCode = compileToBendLang(sampleCode);
console.log(bendLangCode);