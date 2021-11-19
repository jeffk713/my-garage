export const getConvertedDate = originDate => {
  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const shortDate = originDate.split('T')[0];
  const dateParts = shortDate.split('-');
  const convertedDate = `${monthArr[Number(dateParts[1]) - 1]} ${
    dateParts[2]
  } ${dateParts[0]}`;
  return convertedDate;
};

export const getDateFormat = originDate => originDate.split('T')[0];
