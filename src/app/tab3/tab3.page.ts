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
	stocksObservable:Observable<any[]>;
	
	constructor(private inAppBrowser: InAppBrowser, public itemService: ItemService) {}
	
	ngOnInit() {
      this.stocksObservable = this.itemService.GetStockData();
      this.stocksObservable.subscribe(stocks => {
        this.stocks = stocks;
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
}
