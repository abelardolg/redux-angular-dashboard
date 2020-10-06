import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as authActions from '../auth/auth.action';
import { AppState } from '../app.reducer';
import { AuthUser } from '../models/authUser.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUserSubscription: Subscription;

  constructor(private auth: AngularFireAuth,
              private fireStore: AngularFirestore,
              private store: Store<AppState>) { }

  authListener() {
    return this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        // Sí existe
        this.authUserSubscription = this.fireStore.doc(`${firebaseUser.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser: any) => {
          const authUser = AuthUser.fromFirestore(firestoreUser);
          this.store.dispatch(authActions.setAuthUser({authUser}));
        });
      } else {
        // No existe
        this.authUserSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetAuthUser());
      }
    });
  }

  registerUser(name: string, email: string, password: string){
    console.log(name);
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      const newUser = new AuthUser(user.uid, name, email);

      return this.fireStore.doc(`${user.uid}/usuario`).set({...newUser});

    })
  }

  logUserIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(user => user !== null)
    );
  }
}


