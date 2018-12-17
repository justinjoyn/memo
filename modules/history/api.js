import axios from 'axios';
import { BASE_URL, MEMO } from '../../common/constants';

export const getMemos$$ = ({ pageSize, offset, sortBy, where }) => {
  let params = [].join(',');

  return axios({
    method: 'GET',
    url: BASE_URL + MEMO + `?${params}`
  })
    .then(response => response)
    .catch(error => error);
};
