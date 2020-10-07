import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoActions from '../actions/ingresoEgreso.actions';
import { IngresoEgresoModel } from '../models/ingresoEgreso.model';

export interface State {
    ingresosEgresos: IngresoEgresoModel[];
}

export const initialState: State = {
   ingresosEgresos: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(ingresoEgresoActions.setIngresoEgresoCollection,
        (state, {ingresosEgresos}) => ({ ...state, ingresosEgresos: [...ingresosEgresos] })),
    on(ingresoEgresoActions.emptyIngresoEgresoCollection, state => ({ ...state, ingresosEgresos: []})),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
