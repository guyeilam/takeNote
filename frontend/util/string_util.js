export const truncateStr = (str, numChars) => {
  let truncStr;
  if (str.length >= numChars) {
     truncStr = `${str.substring(0,numChars)} ...`;
     return truncStr;
  } else {
    return str;
  }
}

export const getFirstChar = (str) => {
  let truncStr;
  truncStr = str.substring(0, 1);
  return truncStr;
}