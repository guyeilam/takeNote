export const formatDateTime = (dateTime) => {
  // const dateTime = '2019-01-30T14:43:50.407Z';
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const noteDay = parseInt(dateTime.substring(8, 10));
  const noteMonth = parseInt(dateTime.substring(5, 7));
  
  if ((todayMonth === noteMonth) && (todayDay === noteDay)) {
    return 'Earlier today';
  } else if ((todayMonth === noteMonth) && (todayDay > noteDay)) {
    return 'Over a day ago';
  } else if (todayMonth > noteMonth) {
    return 'Over a month ago';
  } else {
    return 'Too long ago';
  }
}
