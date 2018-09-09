import { FETCH_FIRST_STEP_INFO, FETCH_SECOND_STEP_INFO } from '../constants';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FIRST_STEP_INFO:
      return {...state, ...action.payload}
    
    case FETCH_SECOND_STEP_INFO:
      return {...state, ...action.payload}

    default:
      return state;
  }
}
