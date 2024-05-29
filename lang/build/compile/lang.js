"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compile = void 0;
var acorn = _interopRequireWildcard(require("acorn"));
var walk = _interopRequireWildcard(require("acorn-walk"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class Compile {
  constructor(ast) {
    this.ast = ast;
    this.script = '';
    this.indentLevel = 0;
    this.generate();
    return this.script;
  }
  generate() {
    walk.simple(this.ast, {
      Program: node => this.program(node),
      FunctionDeclaration: node => this.functionDeclaration(node),
      BlockStatement: node => this.blockStatement(node),
      VariableDeclaration: node => this.variableDeclaration(node),
      VariableDeclarator: node => this.variableDeclarator(node),
      BinaryExpression: node => this.binaryExpression(node),
      ReturnStatement: node => this.returnStatement(node),
      Identifier: node => this.identifier(node),
      Literal: node => this.literal(node)
    });
  }
  program(node) {
    this.script = '';
    node.body.forEach(statement => this.generateNode(statement));
  }
  functionDeclaration(node) {
    const params = node.params.map(param => param.name).join(', ');
    this.script += `def ${node.id.name}(${params}):\n`;
    this.indentLevel++;
    this.generateNode(node.body);
    this.indentLevel--;
  }
  blockStatement(node) {
    node.body.forEach(statement => {
      this.script += ' '.repeat(this.indentLevel);
      this.generateNode(statement);
    });
  }
  variableDeclaration(node) {
    node.declarations.forEach(declarator => {
      this.script += ' '.repeat(this.indentLevel);
      this.generateNode(declarator);
      this.script += '\n';
    });
  }
  variableDeclarator(node) {
    this.script += `${node.id.name} = `;
    this.generateNode(node.init);
  }
  binaryExpression(node) {
    this.generateNode(node.left);
    this.script += ` ${node.operator} `;
    this.generateNode(node.right);
  }
  returnStatement(node) {
    this.script += ' '.repeat(this.indentLevel);
    this.script += 'return ';
    this.generateNode(node.argument);
    this.script += '\n';
  }
  identifier(node) {
    this.script += node.name;
  }
  literal(node) {
    this.script += node.raw;
  }
  generateNode(node) {
    switch (node.type) {
      case 'Program':
        this.program(node);
        break;
      case 'Identifier':
        this.identifier(node);
        break;
      case 'Literal':
        this.literal(node);
        break;
      case 'BinaryExpression':
        this.binaryExpression(node);
        break;
      case 'VariableDeclaration':
        this.variableDeclaration(node);
        break;
      case 'VariableDeclarator':
        this.variableDeclarator(node);
        break;
      case 'ReturnStatement':
        this.returnStatement(node);
        break;
      case 'BlockStatement':
        this.blockStatement(node);
        break;
      case 'FunctionDeclaration':
        this.functionDeclaration(node);
        break;
      default:
        throw new Error(`Unhandled node type: ${node.type}`);
    }
  }
}
exports.Compile = Compile;