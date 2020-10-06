import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { AuthService } from '../../service/auth.service';
import { AppState } from '../../app.reducer';

import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  isLoading: boolean = false;

  isLoading$: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
      , password: ['', [Validators.required]]
    });

    this.isLoading$ = this.store.select('ui').subscribe(uiState => {
                        this.isLoading = uiState.isLoading;
                      });
  }

  ngOnDestroy() {
    this.isLoading$.unsubscribe();
  }

  logUserIn() {
    if (this.loginForm.invalid) { return; }
    /*Swal.fire({
      title: 'Comprobando identidad',
      text: 'Estamos comprobando si Ud. tiene permisos para acceder al panel de control...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });*/
    this.store.dispatch(ui.isLoading());

    const {email, password} = this.loginForm.value;
    this.authService.logUserIn(email, password)
    .then(credentials => {
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    }).catch(err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });
  }

}
