export const factorDate = date => {
  let [year, month, day] = date.split('-');
  //POPRAVITI
  day = day.split('T')[0];
  let monthName;
  switch (month) {
    case '01':
      monthName = 'januar';
      break;
    case '02':
      monthName = 'februar';
      break;
    case '03':
      monthName = 'mart';
      break;
    case '04':
      monthName = 'april';
      break;
    case '05':
      monthName = 'maj';
      break;
    case '06':
      monthName = 'juni';
      break;
    case '07':
      monthName = 'juli';
      break;
    case '08':
      monthName = 'august';
      break;
    case '09':
      monthName = 'septembar';
      break;
    case '10':
      monthName = 'octobar';
      break;
    case '11':
      monthName = 'novembar';
      break;
    case '12':
      monthName = 'decembar';
      break;
    default:
      monthName = 'UNDEFINED';
  }
  let string = `${day}. ${monthName} ${year}`;
  return string;
};
