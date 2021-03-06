/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_BIKELIST = 'app/SearchBike/GET_BIKELIST';
export const GET_BIKELISTS_SUCCESS = 'app/SearchBike/GET_BIKELISTS_SUCCESS';
export const GET_BIKELISTS_FAIL = 'app/SearchBike/GET_BIKELISTS_FAIL';
export const CLEAR_FILTER = 'app/SearchBike/CLEAR_FILTER';
export const GET_CASECOUNT = 'app/SearchBike/GET_CASECOUNT';
export const GET_CASECOUNT_SUCCESS = 'app/SearchBike/GET_CASECOUNT_SUCCESS';





