import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

import * as ingresosEgresosActions from '../actions/ingresoEgreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  authUserSuscription: Subscription;
  ingresosEgresosSuscription: Subscription;

  constructor(private store: Store<AppState>
            , private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {

    this.authUserSuscription = this.store.select('auth')
    .pipe(
      filter(({ authUser }) => authUser !== null)
    )
    .subscribe(
      ({authUser}) => {
        this.ingresosEgresosSuscription = this.ingresoEgresoService.initIngresosEgresosListener(authUser.uid)
        .subscribe(ingresosEgresosColeccion => {
          this.store.dispatch(ingresosEgresosActions.setIngresoEgresoCollection({ingresosEgresos: ingresosEgresosColeccion}));
        });
      });
  }

  ngOnDestroy(): void{
    this.authUserSuscription.unsubscribe();
    this.ingresosEgresosSuscription.unsubscribe();
  }
}
