// input >> "i am good boy"

// Q. Write code that, for the above input string, generates the following outputs:

// output 1 > i ma doog yob
// output 2 > yob doog ma i
// output 3 > boy good am i

// My Code:
let str = "i am good boy"
let op2 = "";

for (let val of str) {
    op2 = val + op2
}
console.log(op2); // yob doog ma i

let revStr = str.split(" ").reverse().join(" ");
console.log(revStr) // boy good am i

let revStr2 = str.split(" ")
let newArr = []

// for (let val of revStr2) {
//     newArr.push(revWord(val))
// }

// Q. Remove above for-loop and use the map() method and generate same output
revStr2.map((el) => {
    newArr.push(revWord(el))
})

function revWord(...word) {
    let reversedWord = ""
    // for (let val of word) {
    //     reversedWord = val + reversedWord
    // }
    // Q. Remove above for-loop and use the map() method and generate same output
    word.map((el) => {
        reversedWord = el + reversedWord
    })
    return reversedWord
}
let op1 = newArr.join(" ");
console.log(op1) // i ma doog yob

/*
By above code have disscussion like:
Im getting output -> i, ma, doog, yob  AND  boy, good, am, i

Q. Why commas in output?
Q. What is join() method? By what changes needed in join() method to remove comma.
I did the changes and getting correct output
*/