import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {
  stocksObservable:Observable<any[]>;
  stocks:Array<any> = [];
  constructor(
    private router: Router,
    public itemService: ItemService)
    { 


    }

    ngOnInit() {
      // this.ordersObservable = this.itemService.getOrders();
      this.stocksObservable = this.itemService.GetStockData();
      
      this.stocksObservable.subscribe(stocks => {
        this.stocks = stocks;
        if(this.stocks != undefined) {
        console.log('There are ' + this.stocks.length + ' stocks in menu.');
        console.log(this.stocks)
        // for (var i = this.stocks.length - 1; i >= 0; i--) {
        //   this.stocks[i].item_name = this.stocks[i].symbol[]+" and more";
        // }
  
        }
  
      })
      // if(this.orders != undefined) {
      //   console.log('There are ' + this.orders.length + ' orders in menu.');
      // }
    }

    isSelected(stock){
      console.log("is selected switch")
    }
}
