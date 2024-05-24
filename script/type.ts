class Type {
  name: string
  callback: Function

  constructor(name: string, callback: Function) {
    this.name = name
    this.callback = callback

    this.callback(this)
  }

  branch (name: String, callback: Function) {
    callback().bind(this)
    return this
  }
}

export {
  Type
}