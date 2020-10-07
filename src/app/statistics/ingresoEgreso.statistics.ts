import { IngresoEgresoModel } from '../models/ingresoEgreso.model';
import { filter, tap, scan } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { IngresoEgresoEnum } from '../enums/IngresoEgreso.enum';

export interface StatisticalDataInterface {
    totalIngresos: number;
    totalEgresos: number;
    numIngresos: number;
    numEgresos: number;
 }

export function computeStatisticalDataIngresosEgresos(ingresosEgresosColeccion: IngresoEgresoModel[]): StatisticalDataInterface {
    const data: StatisticalDataInterface = {
        totalIngresos: 0,
        totalEgresos: 0,
        numIngresos: 0,
        numEgresos: 0
    };
    from(ingresosEgresosColeccion)
    .pipe(
        filter(ingresoEgreso => ingresoEgreso.operationType === IngresoEgresoEnum.INGRESO),
        scan((acc, curr) => acc + curr.amount, 0),
    ).subscribe(totalIngresos => {
        data.numIngresos++;
        data.totalIngresos = totalIngresos;
    }).unsubscribe();

    from(ingresosEgresosColeccion)
    .pipe(
        filter(ingresoEgreso => ingresoEgreso.operationType === IngresoEgresoEnum.EGRESO),
        scan((acc, curr) => acc + curr.amount, 0),
    ).subscribe(totalEgresos => {
        data.numEgresos++;
        data.totalEgresos = totalEgresos;
    }).unsubscribe();

    console.log(data);

    return data;

}
