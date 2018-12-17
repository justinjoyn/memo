import History from './components/History';
import * as epics from './epics';
import * as reducers from './reducers';
import { combineReducers } from 'redux';

export const historyEpics = Object.values(epics);

export const history = combineReducers({
  ...reducers
});

export { History };
