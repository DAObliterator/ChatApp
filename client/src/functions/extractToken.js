export const extractToken = (name) => {

    /*document.cookie = `jwtToken=${encodeURIComponent(token)}; SameSite=Strict; Max-Age=3600`*/
    let tokenArr = document.cookie.split(';');

    let tokenArr2 =   tokenArr.map((element) => element.trim());

   for (const cookie of tokenArr2) {
     if (cookie.startsWith(name + "=")) {
       const token = cookie.substring(name.length + 1);

       return token;
     }
   }

}