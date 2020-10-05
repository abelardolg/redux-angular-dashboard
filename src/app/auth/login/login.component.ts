import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
      , password: ['', [Validators.required]]
    });
  }

  logUserIn() {
    if (this.loginForm.invalid) { return; }

    Swal.fire({
      title: 'Comprobando identidad',
      text: 'Estamos comprobando si Ud. tiene permisos para acceder al panel de control...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const {email, password} = this.loginForm.value;

    this.authService.logUserIn(email, password)
    .then(credentials => {

      console.log(credentials);

      Swal.close();

      this.router.navigate(['/']);

    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    });
  }

}
