import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './reducers/auth.reducer';
import * as ingresoEgreso from './reducers/ingresoEgreso.reducer';


export interface AppState {
   ui: ui.State;
   auth: auth.State;
   ingresosEgresos: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer
   , auth: auth.authReducer
   , ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
};

