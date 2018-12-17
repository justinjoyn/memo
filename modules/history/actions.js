import { actionCreator } from '../../common/utils';
import { GET_MEMOS, ON_GET_MEMOS_FAILURE, ON_GET_MEMOS_SUCCESS } from './actionTypes';

export const getMemos = actionCreator(GET_MEMOS);
export const onGetMemosFailure = actionCreator(ON_GET_MEMOS_FAILURE);
export const onGetMemosSuccess = actionCreator(ON_GET_MEMOS_SUCCESS);
