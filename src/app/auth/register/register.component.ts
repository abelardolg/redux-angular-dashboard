import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  registerUser() {
    if (this.registerForm.invalid) { return; }

    Swal.fire({
      title: 'Registro',
      text: 'Estamos registrándole para acceder al panel de control...',
      willOpen: () => {
        Swal.showLoading();
      }
    });

    const {name, email, password} = this.registerForm.value;
    this.authService.registerUser(name, email, password)
    .then(credentials => {
        console.log(credentials);
        Swal.close();
        this.route.navigate(['/']);
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
