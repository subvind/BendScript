
class Fold {
  init: string

  constructor() {
    return this;
  }

  script (init: string) {
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