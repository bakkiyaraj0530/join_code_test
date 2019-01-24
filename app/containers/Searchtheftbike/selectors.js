/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBike = state => state.get('searchbike', initialState);

const makeSelectBike = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('bikelistResponse'));

const makeSelectPageNo = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('pageno'));

export { selectBike, makeSelectBike, makeSelectPageNo };
