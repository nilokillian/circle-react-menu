export const getDirectionalHint = (
  currentX: number
): 0 | 1 | 2 | 12 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 13 => {
  //rightCenter : 12
  //leftCenter ; 9

  return currentX >= 780 ? 12 : 9;
};
