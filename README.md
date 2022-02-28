# full-copy :white_check_mark: :ballot_box_with_check:

This package is capable of copying any value in JavaScript. Specifically it is intended to copy objects that have nested other objects, methods, getters and setters.

It contains three functions:

* ***FullCopy(value)***: It receives a value and returns its copy.

* ***TypeCheck(value)***: It receives any value and returns a two-position array. In position zero it has the type and in position one it has the name of the prototype of which the object is an instance. Example: ``` ['number', 'Number'] ```

* ***CopyObj(object)***: It receives an object and returns its copy.

## Install :wrench:

```npm
npm i full-copy
```

# Usage :pencil:

Given a complex object as follows:

```javascript

import { FullCopy, TypeCheck, CopyObj } from 'full-copy'

const Person = {
	_name: 'John',
	lastName: 'Doe',
	age: 29,
	things: [ 't-shirt', 'tv', ['shoe', 'smartphone'] ],
	friends: {
		name: 'Rose',
		age: 30,
		book: {
			title: 'Game of JS',
			pages: 10,
		},
	},
	greeting() {
		return 'Hello, how are you?'
	},
	get name() {
		return this._name
	},
	set name(newValue) {
		this._name = newValue
	},
}

```
Let's make a copy of the previous object and analyze the results.

```javascript
let newPerson = FullCopy(Person) // if you are sure that Person is an object you can use CopyObj(Person) instead of FullCopy

newPerson.name = 'Robert'
newPerson.things.push('xbox')
newPerson.friends.book.title = 'Type Wow Script'

console.log( Person )

console.log( newPerson )

console.log( newPerson.greeting(), newPerson.name ) // return: Hello, how are you? Robert

console.log( TypeCheck( Person ) ) // return: ['object', 'Object']
console.log( TypeCheck( [1,2,3] ) ) // return: ['array', 'Array']

```

```javascript
// Person
{
  _name: 'John',
  lastName: 'Doe',
  age: 29,
  things: [ 't-shirt', 'tv', [ 'shoe', 'smartphone' ] ],
  friends: { name: 'Rose', age: 30, book: { title: 'Game of JS', pages: 10 } },
  greeting: [Function: greeting],
  name: [Getter/Setter]
}

// newPerson
{
  _name: 'Robert',
  lastName: 'Doe',
  age: 29,
  things: [ 't-shirt', 'tv', [ 'shoe', 'smartphone' ], 'xbox' ],
  friends: {
    name: 'Rose',
    age: 30,
    book: { title: 'Type Wow Script', pages: 10 }
  },
  greeting: [Function: greeting],
  name: [Getter/Setter]
}

```
As you can see we modified newPerson and the original object was not altered. In the same way you can check that if the original is modified the copy is not modified.

# Contributing :raising_hand:
If someone wants to add or improve something, I invite you to collaborate directly in this repository: [full-copy](https://github.com/ChristBM/full-copy)

# License :unlock:
full-copy is released under the [MIT License](https://opensource.org/licenses/MIT).