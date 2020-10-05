import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { FirebaseUser } from '../models/firebaseUser.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private fireStore: AngularFirestore) { }

  authListener() {
    return this.auth.authState.subscribe(firebaseUser => {
      console.log(firebaseUser);
      console.log(firebaseUser?.uid);
      console.log(firebaseUser?.email);
    });
  }

  registerUser(name: string, email: string, password: string){
    console.log(name);
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      const newUser = new FirebaseUser(user.uid, name, email);

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


