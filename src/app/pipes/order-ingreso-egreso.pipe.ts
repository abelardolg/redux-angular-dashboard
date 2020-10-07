import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from '../models/ingresoEgreso.model';
import { IngresoEgresoEnum } from '../enums/IngresoEgreso.enum';

@Pipe({
  name: 'orderIngresoEgreso'
})
export class OrderIngresoEgresoPipe implements PipeTransform {

  transform(ingresosEgresosColeccion: IngresoEgresoModel[]): IngresoEgresoModel[] {
    return ingresosEgresosColeccion.slice().sort((a, b) => {
      if (a.operationType === IngresoEgresoEnum.INGRESO)
      {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
