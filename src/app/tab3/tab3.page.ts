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
      this.stocksObservable = this.itemService.GetStockDataAgain();
      this.stocksObservable.subscribe(stocks => {
        this.stocks = stocks;
		for(var i=0; i<this.stocks.length; i++) {
			this.stocks[i].imagePath = this.generateRandomImage();
		}
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
	
	generateRandomImage() {
		var r = Math.floor(Math.random() * 14);
		var retImgPath: String;
		switch(r) {
			case 0:
				retImgPath = "assets/images/lemon1.png";
				break;
			case 1:
				retImgPath = "assets/images/lemon2.png";
				break;
			case 2:
				retImgPath = "assets/images/lemon3.png";
				break;
			case 3:
				retImgPath = "assets/images/lemon4.png";
				break;
			case 4:
				retImgPath = "assets/images/lemon5.png";
				break;
			case 5:
				retImgPath = "assets/images/lemon6.png";
				break;
			case 6:
				retImgPath = "assets/images/lemon7.png";
				break;
			case 7:
				retImgPath = "assets/images/lemon8.png";
				break;
			case 8:
				retImgPath = "assets/images/lemon9.png";
				break;
			case 9:
				retImgPath = "assets/images/lemon10.png";
				break;
			case 10:
				retImgPath = "assets/images/lemon15.jpg";
				break;
			case 11:
				retImgPath = "assets/images/lemon18.jpg";
				break;
			case 12:
				retImgPath = "assets/images/lemon25.jpg";
				break;
			default:
				retImgPath = "assets/images/lemon19.jpg";
				break;
		}
		return retImgPath;
	}
}
