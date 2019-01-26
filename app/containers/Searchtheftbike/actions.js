/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { GET_BIKELIST, GET_BIKELISTS_SUCCESS, GET_BIKELISTS_FAIL } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function getbikedetails(payload) {
  return {
    type: GET_BIKELIST,
    payload,
  };
}
export function getbikedetailsSuccess(bikeResponse) {
  return {
    type: GET_BIKELISTS_SUCCESS,
    bikeResponse,
  };
}
export function getbikedetailsFailure(showErrorMessage) {
  return {
    type: GET_BIKELISTS_FAIL,
    showErrorMessage,
  };
}
