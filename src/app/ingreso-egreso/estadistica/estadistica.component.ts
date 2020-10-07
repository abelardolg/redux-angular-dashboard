import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MultiDataSet, Label } from 'ng2-charts';

import { StatisticalDataInterface, computeStatisticalDataIngresosEgresos } from '../../statistics/ingresoEgreso.statistics';
import { IngresoEgresoModel } from '../../models/ingresoEgreso.model';
import { AppState } from '../../app.reducer';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresoEgresoSubscription: Subscription;

  statisticalData: StatisticalDataInterface = {
    totalIngresos: 0,
    totalEgresos: 0,
    numIngresos: 0,
    numEgresos: 0
  };

   // Doughnut
   public labels: Label[] = ['Ingresos', 'Egresos'];
   public data: MultiDataSet = [[]];

  constructor(private ingresosEgresosStore: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoEgresoSubscription = this.ingresosEgresosStore.select('ingresosEgresos')
    .subscribe( ({ingresosEgresos}) => {
      if (ingresosEgresos.length > 0) {
        const ingresosEgresosColeccion = ingresosEgresos.map( it => {
          return IngresoEgresoModel.fromFirebaseStore(it.uid, it.description, it.amount, it.operationType);
        });
        this.updateStatisticalData(ingresosEgresosColeccion);
      }
    });
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  private updateStatisticalData(ingresosEgresosColeccion): void {
    this.statisticalData = computeStatisticalDataIngresosEgresos(ingresosEgresosColeccion);
    this.data = [[this.statisticalData.totalIngresos, this.statisticalData.totalEgresos]];
  }
}
