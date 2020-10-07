import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.action';
import { AuthUser } from '../models/authUser.model';

export interface State {
    authUser: AuthUser;
}

export const initialAuthUser: State = {
   authUser: null
}

const _authReducer = createReducer(initialAuthUser,

    on(authActions.setAuthUser, (state, { authUser }) => ({ ...state, authUser: { ...authUser }})),
    on(authActions.unsetAuthUser, (state) => ({ ...state, authUser: null})),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}