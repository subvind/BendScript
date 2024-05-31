
class Fold {
  init: string

  constructor() {
    return this;
  }

  loop (init: string) {
    this.init = init;
    return this;
  }

  case (instance: string, callback: Function) {
    callback(this.init).bind(this)
    return this
  }
}

export {
  Fold
}