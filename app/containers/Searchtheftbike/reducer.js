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

import { GET_BIKELIST, GET_BIKELISTS_SUCCESS, GET_BIKELISTS_FAIL, GET_CASECOUNT_SUCCESS } from './constants';

// The initial state of the App
export const initialState = fromJS({
  showErrorMessage: null,
  bikePayload: null,
  bikelistResponse: null,
  // benefitLimitsResponse: null,
});

function searchbikeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BIKELIST:
      return state.set('payload', action.payload);
  case GET_BIKELISTS_SUCCESS:
    return state.set('bikelistResponse', action.bikeResponse);
    // return state.merge({
    //   bikelistResponse: action.bikeResponse,
    // });

  case GET_CASECOUNT_SUCCESS: 
   return state.set('response', action.response);
  case GET_BIKELISTS_FAIL:
     return state.set('showErrorMessage', action.showErrorMessage);
    // return state.merge({
    //   showErrorMessage: action.showErrorMessage,
    //   error: true,
    // });
    // case GET_BIKELIST:
    //   // Delete prefixed '@' from the github username
    //   return state.set('username', action.name.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default searchbikeReducer;
