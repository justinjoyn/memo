import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { ofType } from 'redux-observable';

import { GET_MEMOS } from './actionTypes';
import { onGetMemosSuccess, onGetMemosFailure } from './actions';
import { handleResponse } from '../../common/utils';
import { getMemos$$ } from './api';

export const getMemos$ = action$ => {
  return action$.pipe(
    ofType(GET_MEMOS),
    switchMap(payload => {
      return fromPromise(getMemos$$(payload)).pipe(
        tap(console.log),
        map(response => handleResponse(response, onGetMemosSuccess, onGetMemosFailure)),
        catchError(err => of(onGetMemosFailure(err)))
      );
    })
  );
};
