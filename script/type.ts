class Type {
  name: string

  constructor() {
    return this
  }

  tree (name: string) {
    this.name = name;
    return this;
  }

  branch (name: String, callback: Function) {
    callback().bind(this)
    return this
  }
}

export {
  Type
}