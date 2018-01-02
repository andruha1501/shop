import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject  } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';


@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({ // добвалення юзера до бази
      name: user.displayName,
      email: user.email
    });
   }

   get(uid: string): AngularFireObject<AppUser> { // отримання юзера з бази
     return this.db.object('/users/' + uid);
   }
}
