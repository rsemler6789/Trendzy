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
  stocks2: Observable<any[]>;
  myStockData = [];

  models:Observable<any[]>;
  myModels = [];
  quotes: Observable<any[]>;

  constructor(public db: AngularFirestore) 
  {
      var modelid = "IVuuyq410mqKPHQBERkH";
      this.database = db;
      console.log("Loading saved data");
      this.stocks = db.collection("stocks",ref => ref.where('modelid', '==', modelid)).valueChanges();
	  this.stocks2 = db.collection("stocks",ref => ref.where('modelid', '==', modelid)).valueChanges();
      console.log(this.stocks);

      this.loadModels();
   
      //adding random data to stocks
      // for(var i=0;i<100;i++){
      //   var price = Math.random()*100;
      //   this.db.collection('/stocks').doc('BmJyTofyDcHeN9NxbOpw').collection("quotes").add({
      //     "price": price, 
      //     "date":Date.now(), 
      //   });
      // }
      
    

  }

  loadModels(){ //load my orders
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
  
  GetStockDataAgain() {
	return this.stocks2;
  }

 GetStockQuote(symbol){
  symbol="3l27FrBiSRD8JwmWn8dQ";
  // this.quotes = this.db.collection("stocks",ref => ref.where('symbol', '==', symbol)).valueChanges();
  this.quotes = this.db.collection("stocks").doc(symbol).collection('quotes').valueChanges();
   console.log('getting symbols' + this.quotes);
   return this.quotes;

 }


}
