const rowNumber = function (
  pageNum: any,
  rowsPerPage: any,
  index: number
): number {
  let result = pageNum > 1 ? pageNum * rowsPerPage - rowsPerPage + 1 : 1;
  result += index;
  return result;
};

export { rowNumber };
