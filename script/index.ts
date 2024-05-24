import { Fold } from './fold'
import { Bend } from './bend'
import { Switch } from './switch'
import { Type } from './type'
import { Branch } from './branch'

let fold = new Fold();
let bend = new Bend();
let swit = new Switch();
let type = new Type();
let branch = new Branch();
function recursive(name: string) {
  // noop
}

export {
  fold,
  bend,
  swit,
  type,
  branch,
  recursive,
}