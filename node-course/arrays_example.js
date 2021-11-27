var arr = [];
arr[0] = 1;
console.log(arr[0]);
console.log(arr.length);

// arr[1] = 2;
// console.log(arr[1]);
// console.log(arr.length);

arr[2] = {
    name: 'Marwan'
};
console.log(arr[2]);
console.log(arr.length);

arr[3] = 'Hello';
console.log(arr[3]);
console.log(arr.length);

// looping:
// for (let step = 0; step < 5; step++) {
//     // Runs 5 times, with values of step 0 through 4.
//     console.log('Walking east one step');
// }

// let i = 0;
// do {
//   i += 1;
//   console.log(i);
// } while (i < 5);

// let n = 0;
// let x = 0;
// while (n < 3) {
//   n++;
//   x += n;
// }

// goto: looping;

// for (let i = 0; i < a.length; i++) {
//     if (a[i] === theValue) {
//       break;
//     }
//   }

// let i = 0;
// let n = 0;
// while (i < 5) {
//   i++;
//   if (i === 3) {
//     continue;
//   }
//   n += i;
//   console.log(n);
// }

for (let i in arr) {
    console.log(i);
}