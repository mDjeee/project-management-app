import { User } from "../models/user.model"
import * as AuthActions from './auth.actions';
import { parseJwt } from './auth.effects';

export interface State {
  user: User | null,
  token: string | null,
  login: string | null,
  authError: string | null,
  loading: boolean,
}

const initialState: State = {
  user: null,
  token: null,
  login: null,
  authError: null,
  loading: false,
}

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch(action.type) {
    case AuthActions.SIGNUP_SUCCESS:
      const user = new User(
        action.payload.id,
        action.payload.name,
        action.payload.login
      )
      return {
        ...state,
        user: user,
        login: action.payload.login,
        authError: null,
        loading: false
      }
    case AuthActions.SIGNUP_START:
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.LOGIN_SUCCESS:
      const {userId, login, iat} = parseJwt(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        login: login,
        loading: false
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: null,
        login: null
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      }
    default:
      return state;
  }
}
