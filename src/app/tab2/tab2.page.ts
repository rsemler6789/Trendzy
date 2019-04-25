import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import * as firebase from 'Firebase';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {
  stocksObservable:Observable<any[]>;
  stocks:Array<any> = [];
  quotesObservable:Observable<any[]>;
  quotes:Array<any> = [];
  symbol = [];
  chartData = [];
  chart: am4charts.XYChart;


  constructor(
    private zone: NgZone,
    private router: Router,
    public itemService: ItemService,)
    { 


    }

    ngAfterViewInit() {
      this.zone.runOutsideAngular(() => 
      {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.paddingRight = 20;

        //**NEXT STEP *//
        //**retrieve data (json) from real time database in firebase **//
        //**set index to go through all points of one column, plotting them on the x y chart **//
        let data = [];

        //
        let visits = 10;
        //creating random data 
        for (let i = 1; i < 366; i++)
        {
          visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }
        chart.data = data;
        
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
     
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());

        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value}";

        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
        
        this.chart = chart;
      });



    }

    ngOnDestroy() {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.dispose();
        }
       

      });
    }

    ngOnInit() {
      // this.ordersObservable = this.itemService.getOrders();
      this.stocksObservable = this.itemService.GetStockData();
      console.log()
      this.stocksObservable.subscribe(stocks => {
        this.stocks = stocks;
        if(this.stocks != undefined) {
        console.log('There are ' + this.stocks.length + ' stocks in menu.');
        console.log(this.stocks)

        var i;

        for(i = 0; i < stocks.length - 1; i++)
        {
          this.quotesObservable = this.itemService.GetStockQuote(stocks[i].symbol);
          console.log(stocks[i].symbol);
          console.log(this.quotesObservable)
          this.quotesObservable.subscribe(quotes => {
            this.quotes = quotes;
            console.log("there are " + quotes[i] + "quotes");

            var percentageDiff;
            if(this.quotes != undefined) {
              for(i = 0; i < quotes.length - 1; i++){
                quotes[i];
                
               // console.log(quotes[i]); --> prints all values in the firebase, commenting out for now because 
               //it is alot
               //next step: calculate the percentage difference between i+1 and i
               
              }
              
            
            }
          })
        
        }

        }
  
      })

    }
    isSelected(stock){
      console.log("is selected switch")
    }


}
