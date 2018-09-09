import { FETCH_FIRST_STEP_INFO, FETCH_SECOND_STEP_INFO } from '../constants';

export const fetchFirstInfo = (payload) => ({
  type: FETCH_FIRST_STEP_INFO,
  payload
})

export const fetchSecondInfo = (payload) => ({
  type: FETCH_SECOND_STEP_INFO,
  payload
})