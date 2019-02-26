export const truncateStr = (str, numChars) => {
  let truncStr;
  if (str.length >= numChars) {
     truncStr = `${str.substring(0,numChars)} ...`;
     return truncStr;
  } else {
    return str;
  }
}