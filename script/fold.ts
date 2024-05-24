
class Fold {
  init: string
  callback: Function

  constructor(init: string, callback: Function) {
    this.init = init;
    this.callback = callback

    this.callback(this)
  }

  case (instance: string, callback: Function) {
    callback(this.init).bind(this)
    return this
  }
}

export {
  Fold
}