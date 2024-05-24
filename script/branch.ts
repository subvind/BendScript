class Branch {
  name: string
  values: any

  constructor() {
    return this;
  }

  grow (name: string, values: any) {
    this.name = name
    this.values = values
    return this;
  }
}

export {
  Branch
}