import axios from 'axios';
import { BASE_URL, MEMO, IMAGE_UPLOAD } from '../../common/constants';

export const newMemo$$ = ({ payload }) => {
  let data = JSON.stringify({
    title: payload.title,
    description: payload.description,
    image: payload.image,
    with: payload.people
  });

  return axios({
    method: 'POST',
    url: BASE_URL + MEMO,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response)
    .catch(error => error);
};

export const editMemo$$ = ({ payload }) => {
  let data = JSON.stringify({
    title: payload.title,
    description: payload.description,
    image: payload.image,
    with: payload.people
  });

  return axios({
    method: 'PUT',
    url: BASE_URL + MEMO + `/${payload.id}`,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response)
    .catch(error => error);
};

export const uploadImage$$ = ({ payload }) => {
  let uri = payload.uri;
  let fileName = uri.split('/').pop();
  let fileType = fileName.split('.').pop();
  const formData = new FormData();
  formData.append('image', {
    uri,
    name: fileName,
    type: `image/${fileType}`
  });

  console.log(IMAGE_UPLOAD + fileName);
  return axios({
    method: 'POST',
    url: IMAGE_UPLOAD + fileName,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => response)
    .catch(error => error);
};
