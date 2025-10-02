// Q. Define 1 variable that assign your name and count each character occurance
// Q. How many ways we can define variable in js ?
// Q. Diff bt let, var, const

// My Code:
let str = "shrikrishna kachare"
let carCount = {};

for (let val of str) {
    // console.log(carCount.hasOwnProperty(val))
    if (!carCount.hasOwnProperty(val)) {
        carCount[val] = 1
    } else {
        carCount[val] = carCount[val] + 1
    }
}
console.log(carCount);
//  { s: 2, h: 3, r: 3, i: 2, k: 2, n: 1, a: 3, ' ': 1, c: 1, e: 1 }