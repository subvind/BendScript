class ASTVisitor {
  visit(node) {
    switch (node.type) {
      case "FunctionDeclaration":
        return this.visitFunctionDeclaration(node);
      case "VariableDeclaration":
        return this.visitVariableDeclaration(node);
      case "AssignmentExpression":
        return this.visitAssignmentExpression(node);
      case "ReturnStatement":
        return this.visitReturnStatement(node);
      case "BinaryExpression":
        return this.visitBinaryExpression(node);
      case "Literal":
        return this.visitLiteral(node);
      case "Identifier":
        return this.visitIdentifier(node);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  visitFunctionDeclaration(node) {
    const params = node.params.join(", ");
    const body = node.body.map((stmt) => `  ${this.visit(stmt)}`).join("\n");
    return `def ${node.name}(${params}):\n${body}`;
  }

  visitVariableDeclaration(node) {
    return `${node.name} = ${this.visit(node.init)}`;
  }

  visitAssignmentExpression(node) {
    return `${node.left} = ${this.visit(node.right)}`;
  }

  visitReturnStatement(node) {
    return `return ${this.visit(node.argument)}`;
  }

  visitBinaryExpression(node) {
    return `${this.visit(node.left)} ${node.operator} ${this.visit(node.right)}`;
  }

  visitLiteral(node) {
    return node.value;
  }

  visitIdentifier(node) {
    return node.name;
  }
}

export {
  ASTVisitor
}