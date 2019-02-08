/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  GET_CASEDETAILS_ID,
  GET_CASEDETAILS_ID_SUCCESS,
  GET_CASEDETAILS_FAIL,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  showErrorMessage: null,
  casedetails: null,
});

function casedetailsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CASEDETAILS_ID:
      return state.set('Id', action.Id);
    case GET_CASEDETAILS_ID_SUCCESS:
      return state.set('casedetails', action.casedetails);
    case GET_CASEDETAILS_FAIL:
      return state.set('showErrorMessage', action.showErrorMessage);
    default:
      return state;
  }
}

export default casedetailsReducer;
