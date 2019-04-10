import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'Firebase';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  database: AngularFirestore;
  stocks: Observable<any[]>;
  myStockData = [];
  constructor(public db: AngularFirestore) 
  {
      var modelid = "IVuuyq410mqKPHQBERkH";
      this.database = db;
      console.log("Loading saved data");
      this.stocks = db.collection("stocks",ref => ref.where('modelid', '==', modelid)).valueChanges();
      console.log(this.stocks);
      
  }

  GetStockData(){ //load my orders
    return this.stocks;
  }
}
