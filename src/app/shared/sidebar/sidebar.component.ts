import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { AuthUser } from '../../models/authUser.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  authUserName: string = '';
  authUserSuscription: Subscription;

  constructor(private authService: AuthService
              , private router: Router
              , private store: Store<AppState>) { }

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

  signOut(): void {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }

}
