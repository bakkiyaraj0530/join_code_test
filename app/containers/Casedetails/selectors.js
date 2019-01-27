/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBike = state => state.get('casedetails', initialState);

const makeSelectCaseDetails = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('casedetails'));
const makeSelectcaseError = () =>
  createSelector(selectBike, searchbikeState => searchbikeState.get('showErrorMessage'));

export { selectBike, makeSelectCaseDetails, makeSelectPageNo, makeSelectcaseError, makeSelecttotalCount };
