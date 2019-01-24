/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_BIKELIST } from './constants';
import { getbikedetailsSuccess, getbikedetailsFailure } from './actions';

import request from 'utils/request';
// import { makeSelectBike } from './selectors';
import { makeSelectPageNo, selectBike } from 'containers/Searchtheftbike/selectors';

/**
 * Github repos request/response handler
 */
export function* getBikelist() {
  // Select username from store
  const pageNo = yield select(makeSelectPageNo()) | 1;
  // const fromDate = yield select(makeSelectFromDate());
  // const toDate = yield select(makeSelectTodate());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  const requestURL = `https://bikewise.org:443/api/v2/incidents?page=${pageNo}&per_page=10&proximity_square=100`;
  try {
    // Call our request helper (see 'utils/request')
    const bikeresponse = yield call(request, requestURL);
    // alert('saga inside');
    yield put(getbikedetailsSuccess(bikeresponse['incidents']));
  } catch (err) {
    yield put(getbikedetailsFailure(err));
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
