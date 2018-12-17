import { GET_MEMOS, ON_GET_MEMOS_SUCCESS, ON_GET_MEMOS_FAILURE } from './actionTypes';

export const history = (state = { data: [], error: null, isLoading: false }, { type, payload }) => {
  switch (type) {
    case GET_MEMOS:
      return {
        ...state,
        isLoading: true
      };
    case ON_GET_MEMOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload
      };
    case ON_GET_MEMOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
};
