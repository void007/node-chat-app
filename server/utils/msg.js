var moment=require('moment');

var generateMsg = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};
var generateLocationMsg=(from,latitude,longitude)=>{
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};
module.exports = {generateMsg,generateLocationMsg};
