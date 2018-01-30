import { SET_FETCHING, UNSET_FETCHING } from './actionTypes';

/**
 *
 *  @returns {object} action
 *
 */
export const setFetching = () => ({
  type: SET_FETCHING
});

/**
 *
 * @returns {object} action
 *
 */
export const unsetFetching = () => ({
  type: UNSET_FETCHING
});
