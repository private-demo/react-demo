import { SET_A, VERSION_UPDATE } from '../constants';

export function setA(value) {
  return {
    type: SET_A,
    payload: value,
  }
}

export function versionUpdate(version = 0.1) {
  return {
    type    : VERSION_UPDATE,
    payload : version
  };
}