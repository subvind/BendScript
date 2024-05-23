# Define a record for Person
def Person(name: String, age: Int):
  let _name = name
  let _age = age

  def greet(): String
    return f"Hello, {_name}!"

  return {
    name: _name,
    age: _age,
    greet: greet,
  }

# Create a Person record
let person1 = Person(name="Alice", age=30)
let person2 = Person(name="Bob", age=33)

# Start
def main():
  return f"{person1/greet()} and {person2/greet()}"