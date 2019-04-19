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

  models:Observable<any[]>;
  myModels = [];


  constructor(public db: AngularFirestore) 
  {
      var modelid = "IVuuyq410mqKPHQBERkH";
      this.database = db;
      console.log("Loading saved data");
      this.stocks = db.collection("stocks",ref => ref.where('modelid', '==', modelid)).valueChanges();
      console.log(this.stocks);

      this.loadModels();
   
      //adding random data to stocks
      for(var i=0;i<100;i++){
        var price = Math.random()*100;
        this.db.collection('/stocks').doc('m1RUNga5n51y6Hn8t3nJ').collection("quotes").add({
          "price": price, 
          "date":Date.now(), 
        });
      }
      
    

  }

  loadModels(){ //load my orders
   // var userid = firebase.auth().currentUser.uid;
    this.models = this.database.collection('FeaturedModels').valueChanges();
    return this.models;
  }

  GetModel(){
    console.log('getting models...' + this.models);
    return this.models;
  }

  GetStockData(){ //load my orders
    return this.stocks;
  }




}
