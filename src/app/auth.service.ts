import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';




@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    // tslint:disable-next-line:max-line-length
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';  // отримання url під час спроби доступу до сторінки без авторизації
    localStorage.setItem('returnUrl', returnUrl); // добавлення url до локал сторедж
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        // tslint:disable-next-line:curly
        if (user) return this.userService.get(user.uid).valueChanges();
        return Observable.of(null);
      });
  }
}
