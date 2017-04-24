const Person = require('./person.js');
const Elevator = require('./elevator.js');

const elev1 = new Elevator();

const person1 = new Person("Albert", 4, 7);
const person2 = new Person("Julia", 10, 2);

elev1.call(person1);
elev1.call(person2);

