import { Component, OnInit } from '@angular/core';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
	
	url: string;
	stocks:Array<any> = [];
    stocks1:Array<any> = [];
	stocks2:Array<any> = [];
	stocks3:Array<any> = [];
	stocksObservable:Observable<any[]>;
	
	constructor(private inAppBrowser: InAppBrowser, public itemService: ItemService) {}
	
	ngOnInit() {
      this.stocksObservable = this.itemService.GetStockData();
      this.stocksObservable.subscribe(stocks => {
        this.stocks = stocks;
		this.populateThreeArrays();
        if(this.stocks != undefined) {
        console.log('There are ' + this.stocks.length + ' stocks in menu.');
        console.log(this.stocks)
        }
      });
	  
    }
	
	openWebPage(symbol: string) {
		this.url = 'https://finance.yahoo.com/quote/'+symbol+'/financials?p='+symbol;
		const browser = this.inAppBrowser.create(this.url, '_system');
	}
	
	populateThreeArrays() {
		var i;
		for(i=0; i<this.stocks.length; i++) {
		  if(i%3==0){
			  this.stocks1.push(this.stocks[i]);
		  }
		  else if(i%3==1) {
			  this.stocks2.push(this.stocks[i]);
		  }
		  else {
			  this.stocks3.push(this.stocks[i]);
		  }
	  }
	}
}
