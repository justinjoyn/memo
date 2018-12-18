import axios from 'axios';
import { BASE_URL, MEMO } from '../../common/constants';

export const getMemos$$ = ({ payload }) => {
  let params = [
    'pageSize=' + payload.pageSize,
    'offset=' + payload.offset,
    'sortBy=' + payload.sortBy
  ];
  if (payload.where) params.push('where=' + payload.where);

  return axios({
    method: 'GET',
    url: BASE_URL + MEMO + `?${params.join('&')}`
  })
    .then(response => response)
    .catch(error => error);
};
