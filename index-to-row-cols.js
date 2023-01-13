const convertIndexToPageRowCol = (index) => {
  // each row has 3 cols
  // each page has 9 rows
  let i = 0;
  let j = index % 3;
  let page = 0;
  let rowItem = 0;
  let pageItem = 0;

  for (let k = 0; k <= index; k++) {
    rowItem += 1;
    if (rowItem > 3) {
      i += 1;
      // reset rowItem
      rowItem = 1;
    }
    if (i > 8) {
      // reset i
      i = 0;
    }
  }

  for (let k = 0; k <= index; k++) {
    pageItem += 1;
    if (pageItem > 27) {
      page += 1;
      // reset rowItem
      pageItem = 1;
    }
  }

  return { i, j, page };
};
for (let i = 0; i < 50; i++) {
  console.log(convertIndexToPageRowCol(i), i);
}
