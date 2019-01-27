/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_CASEDETAILS_ID } from './constants';
import { getcasedetailsByIdsuccess, getbikedetailsFailure } from './actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getCasedetails(action) {
  let requestURL = `https://bikewise.org:443/api/v2/incidents/${action.Id}`; 
  try {
    // Call our request helper (see 'utils/request')
    const casedetailsresponse = yield call(request, requestURL);
    yield put(getcasedetailsByIdsuccess(casedetailsresponse['incident']));
  } catch (err) {
    yield put(getbikedetailsFailure('Failed'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* caseDetails() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_CASEDETAILS_ID, getCasedetails)
}
