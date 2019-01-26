/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_BIKELIST } from './constants';
import { getbikedetailsSuccess, getbikedetailsFailure } from './actions';

import request from 'utils/request';
import { makeSelectPageNo, selectBike } from 'containers/Searchtheftbike/selectors';

/**
 * Github repos request/response handler
 */
export function* getBikelist(action) {
  let requestURL = `https://bikewise.org:443/api/v2/incidents?page=${action.payload.pageno}&per_page=10&proximity_square=100`;

  //https://bikewise.org:443/api/v2/incidents?page=1&per_page=10&occurred_before=1548423269&occurred_after=1548387272&proximity_square=100&query=Several%20children

  requestURL = (action.payload && action.payload.bikedesc) ? `${requestURL}&query=${action.payload.bikedesc}` : requestURL;
  requestURL = (action.payload && action.payload.fromdatevalue) ? `${requestURL}&occurred_after=${action.payload.fromdatevalue}` : requestURL;
  requestURL = (action.payload && action.payload.toDatevalue) ? `${requestURL}&occurred_before=${action.payload.toDatevalue}` : requestURL;

  const finalURL = `https://bikewise.org:443/api/v2/incidents?page=1&per_page=10&proximity_square=100&query=${action.payload.bikedesc}`;
  try {
    // Call our request helper (see 'utils/request')
    const bikeresponse = yield call(request, requestURL);
    // alert('saga inside');
    yield put(getbikedetailsSuccess(bikeresponse['incidents']));
  } catch (err) {
    yield put(getbikedetailsFailure('Failed'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* fetchBikes() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_BIKELIST, getBikelist);
}
