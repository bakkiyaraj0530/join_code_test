/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBike = state => state.get('searchbike', initialState);

const makeSelectBike = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('bikelistResponse'));
const makeSelectError = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('showErrorMessage'));

const makeSelecttotalCount = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('response'));

const makeSelectPageNo = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('payload'));

export { selectBike, makeSelectBike, makeSelectPageNo, makeSelectError, makeSelecttotalCount };
