import { ofType } from 'redux-observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { handleResponse } from '../../common/utils';
import {
  onEditMemoFailure,
  onEditMemoSucess,
  onNewMemoFailure,
  onNewMemoSucess,
  onUploadImageFailure,
  onUploadImageSucess
} from './actions';
import { EDIT_MEMO, NEW_MEMO, UPLOAD_IMAGE } from './actionTypes';
import { editMemo$$, newMemo$$, uploadImage$$ } from './api';

export const newMemo$ = action$ => {
  return action$.pipe(
    ofType(NEW_MEMO),
    switchMap(payload => {
      return fromPromise(newMemo$$(payload)).pipe(
        tap(console.log),
        map(response => handleResponse(response, onNewMemoSucess, onNewMemoFailure)),
        catchError(err => of(onNewMemoFailure(err)))
      );
    })
  );
};

export const editMemo$ = action$ => {
  return action$.pipe(
    ofType(EDIT_MEMO),
    switchMap(payload => {
      return fromPromise(editMemo$$(payload)).pipe(
        tap(console.log),
        map(response => handleResponse(response, onEditMemoSucess, onEditMemoFailure)),
        catchError(err => of(onEditMemoFailure(err)))
      );
    })
  );
};

export const uploadImage$ = action$ => {
  return action$.pipe(
    ofType(UPLOAD_IMAGE),
    switchMap(payload => {
      return fromPromise(uploadImage$$(payload)).pipe(
        tap(console.log),
        map(response => handleResponse(response, onUploadImageSucess, onUploadImageFailure)),
        catchError(err => of(onUploadImageFailure(err)))
      );
    })
  );
};
