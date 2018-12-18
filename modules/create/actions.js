import { actionCreator } from '../../common/utils';
import {
  EDIT_MEMO,
  NEW_MEMO,
  ON_EDIT_MEMO_FAILURE,
  ON_EDIT_MEMO_SUCCESS,
  ON_NEW_MEMO_FAILURE,
  ON_NEW_MEMO_SUCCESS,
  ON_UPLOAD_IMAGE_FAILURE,
  ON_UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE
} from './actionTypes';

export const newMemo = actionCreator(NEW_MEMO);
export const onNewMemoSucess = actionCreator(ON_NEW_MEMO_SUCCESS);
export const onNewMemoFailure = actionCreator(ON_NEW_MEMO_FAILURE);

export const editMemo = actionCreator(EDIT_MEMO);
export const onEditMemoSucess = actionCreator(ON_EDIT_MEMO_SUCCESS);
export const onEditMemoFailure = actionCreator(ON_EDIT_MEMO_FAILURE);

export const uploadImage = actionCreator(UPLOAD_IMAGE);
export const onUploadImageSucess = actionCreator(ON_UPLOAD_IMAGE_SUCCESS);
export const onUploadImageFailure = actionCreator(ON_UPLOAD_IMAGE_FAILURE);
