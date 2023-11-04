
 export const pathToUrlConverter = (dummyString) => {

    const baseUrl = `http://localhost:6012/`;

    const regex = /\\/g;

    const newString = dummyString.replace(regex, "/");

   const finalUrl = baseUrl.concat(newString);

   console.log( finalUrl , " --- finalUrl \n");

   return finalUrl;

}

