class Grow {
  name: string
  branches: Function

  constructor(name: string, branches: any) {
    this.name = name
    this.branches = branches
  }
}

export {
  Grow
}