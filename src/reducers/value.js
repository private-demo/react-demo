import {
  SET_A,
} from '../constants';

export default function(state = {value: 89}, action) {
  switch(action.type) {
    case SET_A:
      return {
        ...state,
        value: action.payload,
      }
      default:
        return state;
  }
}