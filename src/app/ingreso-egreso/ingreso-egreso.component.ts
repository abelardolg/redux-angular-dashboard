import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IngresoEgresoEnum } from '../enums/IngresoEgreso.enum';
import { IngresoEgresoType } from '../types/IngresoEgreso.type';
import { IngresoEgresoModel } from '../models/ingresoEgreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

import * as uiActions from '../shared/ui.actions';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public IngresoEgresoEnum: typeof IngresoEgresoEnum = IngresoEgresoEnum;

  operationType: IngresoEgresoType = IngresoEgresoEnum.INGRESO;
  ingresoEgresoForm: FormGroup;
  public isLoading: boolean = false;

  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder
              , private ingresoEgresoService: IngresoEgresoService
              , private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required]
      , amount: ['', Validators.required]
    });

    this.loadingSubscription = this.store.select('ui').subscribe(
      ({isLoading}) => this.isLoading = isLoading
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  registerIngresoEgreso(): void {

    if (this.ingresoEgresoForm.invalid) { return; }

    this.store.dispatch(uiActions.isLoading());

    const { description, amount } = this.ingresoEgresoForm.value;
    const ingresoEgresoData = new IngresoEgresoModel(description, amount, this.operationType, '');

    this.ingresoEgresoService.registerIngresoEgreso(ingresoEgresoData)
    .then(() => {
       this.ingresoEgresoForm.reset();
       Swal.fire(`El ${this.operationType} fue realizado correctamente`, description, 'success');
       this.store.dispatch(uiActions.stopLoading());
    }).catch( err => {
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire('Error', err.message, 'error');
    });
  }
}
