import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import * as ui from '../../shared/ui.actions';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  isLoading$: Subscription;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.isLoading$ = this.store.select('ui').subscribe(uiState => {
                        this.isLoading = uiState.isLoading;
                      });
  }

  ngOnDestroy() {
    this.isLoading$.unsubscribe();
  }

  registerUser() {
    if (this.registerForm.invalid) { return; }

    /*Swal.fire({
      title: 'Registro',
      text: 'Estamos registrándole para acceder al panel de control...',
      willOpen: () => {
        Swal.showLoading();
      }
    });*/

    this.store.dispatch(ui.isLoading());

    const {name, email, password} = this.registerForm.value;
    this.authService.registerUser(name, email, password)
    .then(credentials => {
        console.log(credentials);
        this.store.dispatch(ui.stopLoading());
    //    Swal.close();
        this.route.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
