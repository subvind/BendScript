
interface _Init_ {
  [propName: string]: Number;
}

class Bend {
  init: any
  callback: Function

  constructor(init: _Init_, callback: Function) {
    this.callback = callback

    for (const iterator in init) {
      this.init[iterator] = init
    }

    this.callback(this)
  }

  when (_case: String, callback: Function) {
    callback(this.init).bind(this)
    return this
  }

  else (callback: Function) {
    callback(this.init).bind(this)
    return this
  }
}

export {
  Bend
}