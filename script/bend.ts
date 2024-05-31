
interface _Init_ {
  [propName: string]: Number;
}

class Bend {
  init: any

  constructor() {
    return this;
  }

  loop (init: _Init_) {
    this.init = init;
    return this;
  }

  when (_case: String, callback: Function) {
    callback(this.init).bind(this);
    return this;
  }

  else (callback: Function) {
    callback(this.init).bind(this);
    return this;
  }
}

export {
  Bend
}