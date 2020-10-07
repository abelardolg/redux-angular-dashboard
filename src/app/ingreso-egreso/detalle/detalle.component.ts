import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from '../../models/ingresoEgreso.model';

import * as ingresoEgresoActions from '../../actions/ingresoEgreso.actions';
import { IngresoEgresoEnum } from '../../enums/IngresoEgreso.enum';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy{

  public IngresoEgresoEnum: typeof IngresoEgresoEnum = IngresoEgresoEnum;

  ingresosEgresosColeccion: IngresoEgresoModel[] = [];
  ingresoEgresoSuscription: Subscription;

  constructor(private store: Store<AppState>
            , private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoEgresoSuscription = this.store.select('ingresosEgresos')
    .subscribe(({ingresosEgresos}) => {
      this.ingresosEgresosColeccion = ingresosEgresos;
    });
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSuscription.unsubscribe();
  }

  delete(uid: string): void {
    this.ingresoEgresoService.deleteIngresoEgreso(uid)
    .then( _ => Swal.fire('Confirmación del borrado', 'Operación borrada', 'info'))
    .catch( err => Swal.fire('Error', 'La operación no fue borrada. Contacte con el administrador', 'error'));

  }

}
