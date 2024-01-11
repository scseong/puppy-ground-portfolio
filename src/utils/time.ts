import moment from 'moment';
import 'moment/locale/ko';

// timestemp: 2024-01-10T02:13:44+00:0
export const getStringFromNow = (timestamp: string) => {
  return moment(timestamp).fromNow();
};
