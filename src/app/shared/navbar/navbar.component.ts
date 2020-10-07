import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  authUserName: string = '';
  authUserSuscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authUserSuscription = this.store.select('auth')
    .pipe(
      filter(({ authUser }) => authUser !== null)
    )
    .subscribe(
      ({authUser}) => {
        this.authUserName = authUser.name;
    });

  }

  ngOnDestroy(): void {
    this.authUserSuscription.unsubscribe();
  }

}
