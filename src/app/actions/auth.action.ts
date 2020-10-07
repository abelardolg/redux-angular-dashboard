import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../models/authUser.model';

export const setAuthUser = createAction(
    '[AuthUser] setAuthUser'
    , props<{ authUser: AuthUser }>()
);

export const unsetAuthUser = createAction(
    '[AuthUser] unsetAuthUser'
);