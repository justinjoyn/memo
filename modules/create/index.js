import Create from './components/Create';
import * as epics from './epics';
import * as reducers from './reducers';
import { combineReducers } from 'redux';

export const createEpics = Object.values(epics);

export const create = combineReducers({
  ...reducers
});

export { Create };
