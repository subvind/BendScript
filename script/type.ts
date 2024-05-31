class Type {
  name: string

  constructor() {
    return this
  }

  loop (name: string) {
    this.name = name;
    return this;
  }

  branch (name: String, branches: any[] | []) {
    return this
  }
}

export {
  Type
}