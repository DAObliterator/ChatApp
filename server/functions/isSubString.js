export const isSubString = (pattern , stringToBeComparedWith ) => {
  
  const regex = new RegExp([pattern], "g");
  
  console.log(
    ` ${pattern} --- pattern and ${stringToBeComparedWith} --- stringToBeComparedWith  ${regex.test(
      stringToBeComparedWith
    )} \n`
  );

  return regex.test(stringToBeComparedWith);


};


