import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  signinRequest: ['username', 'password'],
  signinSuccess: ['user'],

  signOut: null,
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  user: localStorage.getItem('@User:id') || null,
  signin: !!localStorage.getItem('@User:id'),
});

/* Reducers */

export const success = (state, { user }) => state.merge({ user, signin: true });
export const logout = state => state.merge({ signin: false });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN_REQUEST]: success,
  [Types.SIGN_OUT]: logout,
});
