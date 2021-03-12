const getDateMinusNMonths = ( month = 1 ) => {
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * ( 30 * month ) );
  return [start, end];
}
const shortCuts = [
  { text: 'Last month', monthMinus: 1 },
  { text: 'Last 2 month', monthMinus: 2 },
  { text: 'Last 3 month', monthMinus: 3 },
  { text: 'Last 4 month', monthMinus: 4 },
  { text: 'Last 5 month', monthMinus: 5 },
  { text: 'Last 6 month', monthMinus: 6 },
  { text: 'Last year', monthMinus: 12 }
];
const arr = shortCuts.map( shortCut => {
  return {
    text: shortCut.text,
    onClick: ( picker ) => {
      picker.$emit( 'pick', getDateMinusNMonths( shortCut.monthMinus ) );
    }
  }
});

export default arr;