export const factorDate = date => {
  let [year, month, day] = date.split('-');
  day = day.split('T')[0];
  let monthName;
  switch (month) {
    case '01':
      monthName = 'Januar';
      break;
    case '02':
      monthName = 'Februar';
      break;
    case '03':
      monthName = 'Mart';
      break;
    case '04':
      monthName = 'April';
      break;
    case '05':
      monthName = 'Maj';
      break;
    case '06':
      monthName = 'Juni';
      break;
    case '07':
      monthName = 'Juli';
      break;
    case '08':
      monthName = 'August';
      break;
    case '09':
      monthName = 'Septembar';
      break;
    case '10':
      monthName = 'Octobar';
      break;
    case '11':
      monthName = 'Novembar';
      break;
    case '12':
      monthName = 'Decembar';
      break;
    default:
      monthName = 'UNDEFINED';
  }
  let string = `${day}. ${monthName} ${year}`;
  return string;
};
