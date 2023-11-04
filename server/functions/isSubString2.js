
const isSubString2 = (stringToBeComparedWith) => {

  const regex = /fuck/ig;


  return (stringToBeComparedWith).match(regex);
};

console.log(isSubString2("fuck you fuck fuck is wrong with you this fuck is a capital letter Fuck "))


