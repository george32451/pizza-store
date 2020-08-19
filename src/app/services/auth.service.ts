import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

import { User } from 'models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user$ = firebaseAuth.authState.pipe(
      map(user => {
        if (user) {
          return {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName
          };
        }
        return null;
      })
    );
  }

  public signup(email: string, password: string, displayName: string): void {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => userCredential.user.updateProfile({ displayName }))
      .then(() => console.log('Success!'))
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
  }

  public signin(email: string, password: string): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  public authorizeWithGoogle(): void {
    this.socialAuth(new auth.GoogleAuthProvider());
  }

  public logout(): void {
    this.firebaseAuth.signOut();
  }

  private socialAuth(provider): void {
    this.firebaseAuth.signInWithPopup(provider)
      .then(() => {
        console.log('You have been successfully logged in!');
      }).catch((error) => {
      console.log(error);
    });
  }
}
