'use strict'

var evens = [1,2,3,4,5];
var odds = evens.map(v => v + 1);
console.log(odds);


class Person {
  constructor (name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }

  get getName() {
    return this.name;
  }

  set setName(name) {
    this.name = name;
  }

  static defaultName() {
  }
}
var p = new Person('Bob');
console.log(Person);
console.log(p);
console.log(p.__proto__);


