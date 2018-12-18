import {
  NEW_MEMO,
  ON_NEW_MEMO_SUCCESS,
  ON_NEW_MEMO_FAILURE,
  EDIT_MEMO,
  ON_EDIT_MEMO_SUCCESS,
  ON_EDIT_MEMO_FAILURE,
  UPLOAD_IMAGE,
  ON_UPLOAD_IMAGE_SUCCESS,
  ON_UPLOAD_IMAGE_FAILURE
} from './actionTypes';

export const create = (
  state = {
    saveResponse: null,
    saveError: null,
    isSaving: false,
    uploadResponse: null,
    uploadError: null,
    isUploading: false
  },
  { type, payload }
) => {
  switch (type) {
    case NEW_MEMO:
    case EDIT_MEMO:
      return {
        ...state,
        isSaving: true,
        uploadResponse: null,
        uploadError: null
      };
    case ON_NEW_MEMO_SUCCESS:
    case ON_EDIT_MEMO_SUCCESS:
      return {
        ...state,
        isSaving: false,
        saveResponse: payload,
        uploadResponse: null,
        uploadError: null
      };
    case ON_NEW_MEMO_FAILURE:
    case ON_EDIT_MEMO_FAILURE:
      return {
        ...state,
        isSaving: false,
        saveError: payload,
        uploadResponse: null,
        uploadError: null
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        isUploading: true
      };
    case ON_UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        isUploading: false,
        uploadResponse: payload
      };
    case ON_UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        isUploading: false,
        uploadError: payload
      };
    default:
      return state;
  }
};
