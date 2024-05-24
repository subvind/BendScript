
interface _Init_ {
  [propName: string]: Number;
}

class Switch {
  init: any

  constructor() {
    return this;
  }

  ch (init: _Init_) {
    this.init = init;
    return this;
  }

  case (instance: String, callback: Function) {
    callback(this.init).bind(this)
    return this
  }
}

export {
  Switch
}