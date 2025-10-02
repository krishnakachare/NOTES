// Q. What is recursive function
// Q. Find factorial by using recursive function

function findFactorial(no) {
    if (no == 0 || no == 1) {
        return 1
    } else {
        return no * findFactorial(no - 1);
    };
};
console.log(findFactorial(5));