// //
// var date=new Date();
// console.log(date.getMonth());

const moment=require('moment');
//
// var date=moment();
// date.add(100,'year').subtract(9,'months')
// console.log(date.format('MMM Do, YYYY'));
// //

console.log(moment().valueOf());//time stamp
var createAt=1234;
var date=moment(createAt);
console.log(date.format('h:mm a'));
