import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategory() {
    return this.db.list('categories', ref => ref.orderByChild('name')).snapshotChanges(); // отримання категорій з бази, сортування по алфавіту
  }
}
