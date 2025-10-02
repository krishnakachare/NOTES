// Q.Tell me output of below code:
let counter = 0;
for (var i = 1; i <= 10; i++) {
    counter += i;
}
console.log(counter); // 55
console.log(i); // 11
// Q. How getting the outputs, Explain?
//------------------------------------------
class Bird {
    constructor(name) {
      this.name = name;
    }
    speak() {
      console.log(`${this.name} makes a noise.`);
    }
  }
  class Crow extends Bird{
    speak() {
      super.speak();
      console.log(`${this.name} sings.`);
    }
  }
  const crow = new Crow("Tim");
  crow.speak();
    //Tim makes a noise.
    //Tim sings.
//-----------------------


