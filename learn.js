/* The || operator will return the value to its left 
when that value can be converted to true and will return the value on its right otherwise. */
console.log(null || "user")
// → user
console.log("Agnes" || "user")
// → Agnes



/* The ?? operator resembles ||,
but returns the value on the right only if the one on the left is null or undefined */
console.log(0 ?? 100);
// → 0
console.log(null ?? 100);
// → 100



let x = 10;   // global
if (true) {
    let y = 20; // local to block
    var z = 30; // also global
}



/* With a slight change, we can turn the previous example into a way to create functions
that multiply by an arbitrary amount: */
function multiplier(factor) {
    return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));
// → 10



/* The delete operator cuts off a tentacle from such an octopus.
It is a unary operator that, when applied to an object property,
will remove the named property from the object. This is not a common thing to do,
but it is possible. */
let anObject = { left: 1, right: 2 };
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true



/* There’s an Object.assign function that copies all properties from one object into another: */
let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });
console.log(objectA);
// → {a: 1, b: 3, c: 4}



/* We saw push and pop, which add and remove elements at the end of an array, earlier in this chapter. 
The corresponding methods for adding and removing things at the start of an array are called unshift and shift. */
let todoList = [];
function remember(task) {
    todoList.push(task);
}
function getTask() {
    return todoList.shift();
}
function rememberUrgently(task) {
    todoList.unshift(task);
}



/* The following example shows both concat and slice in action. It takes an array 
and an index and returns a new array that is a copy of the original array with the element at the given index removed: */
function remove(array, index) {
    return array.slice(0, index)
        .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]



/* The trim method removes whitespace (spaces, newlines, tabs, and similar characters)
from the start and end of a string: */
console.log("  okay \n ".trim());
// → okay



/* padStart takes the desired length and padding character as arguments: */
console.log(String(6).padStart(3, "0"));
// → 006



/* A string can be repeated with the repeat method,
which creates a new string containing multiple copies of the original string, glued together: */
console.log("LA".repeat(3));
// → LALALA



/* This “spreads” out the array into the function call, passing its elements as separate arguments. */
function max(...numbers) {
    let result = -Infinity;
    for (let number of numbers) {
        if (number > result) result = number;
    }
    return result;
}
console.log(max(4, 1, 9, -2));
// → 9

let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7

let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]



/* When you aren’t sure whether a given value produces an object
but still want to read a property from it when it does,
you can use a variant of the dot notation: object?.property. */
function city(object) {
    return object.address?.city;
}
console.log(city({ address: { city: "Toronto" } }));
// → Toronto
console.log(city({ name: "Vera" }));
// → undefined



/* JavaScript gives us the functions JSON.stringify and JSON.parse to convert data to and from this format.
The first takes a JavaScript value and returns a JSON-encoded string.
The second takes such a string and converts it to the value it encodes: */
let string = JSON.stringify({
    squirrel: false,
    events: ["weekend"]
});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]



