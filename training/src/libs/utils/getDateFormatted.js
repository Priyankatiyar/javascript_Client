import moment from 'moment';

function getDateFormatted(id) {
  return moment(id).format('dddd, MMMM Do YYYY, h:mm:ss a');
}

export { getDateFormatted };
