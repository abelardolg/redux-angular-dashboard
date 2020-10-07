import { createAction, props } from '@ngrx/store';
import { IngresoEgresoModel } from '../models/ingresoEgreso.model';

export const setIngresoEgresoCollection = createAction(
    '[IngresoEgreso] Set Collection '
    , props<{ingresosEgresos: IngresoEgresoModel[]}>()
);
export const deleteIngresoEgreso = createAction(
    '[IngresoEgreso] Delete '
    , props<{uid: string}>()
);
export const emptyIngresoEgresoCollection = createAction(
    '[IngresoEgreso] Empty Collection '
    , props()
);
