const multiplyList = function (dice1, dice2, dice3) {
  const sum = dice1 + dice2 + dice3;

  if (dice1 === 6 && dice2 === 6 && dice3 === 6) {
    return 66;
  }

  if (dice1 === 3 && dice2 === 3 && dice3 === 3) {
    return 33;
  }

  //25%
  if (sum === 4 || sum === 8 || sum === 12 || sum === 16) {
    return 2;
  }

  //43%

  // if(sum === 5 || sum === 10 || sum === 15){
  //   return 2;
  // }

  // if((dice1 + dice2 + dice3) === 7 || (dice1 + dice2 + dice3) === 14){
  //   return 2;
  // }

  return null;
};
export default multiplyList;
