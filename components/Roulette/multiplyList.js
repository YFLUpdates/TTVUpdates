const multiplyList = function (data) {
  let multiply;
  switch (data) {
    case "black":
      multiply = 2;
      break;
    case "red":
      multiply = 2;
      break;
    case "green":
      multiply = 14;
      break;
    case "blue":
      multiply = 3;
      break;
    case "orange":
      multiply = 5;
      break;
    default:
      multiply = 2;
  }
  return multiply;
};
export default multiplyList;
