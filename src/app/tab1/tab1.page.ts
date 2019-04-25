import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import * as firebase from 'Firebase';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { NewsService} from '../news.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  //news data
  data: any;
  page = 1;
  
  //model data
  models:Array<any> = [];
  modelsObservable:Observable<any[]>;

  //stock random data initialized
  chartData = [];
  chart2Data= [];
  chart3Data= [];
   chart: am4charts.XYChart;
   chart2: am4charts.XYChart;
   chart3: am4charts.XYChart;
   date: string;

  constructor(
    private zone: NgZone,
    private router: Router,
    private newsService: NewsService,
    public itemService: ItemService,
    )
    {
      console.log('Tab1 constructed');
      var nowDate = new Date();
      this.date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/' + nowDate.getFullYear();
    }
    ngAfterViewInit() {
      this.zone.runOutsideAngular(() => 
      {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        let chart2 = am4core.create("chartdiv2", am4charts.XYChart);
        let chart3 = am4core.create("chartdiv3", am4charts.XYChart);

        chart.paddingRight = 20;
        chart2.paddingRight = 20;
        chart3.paddingRight = 20;

        //**NEXT STEP *//
        //**retrieve data (json) from real time database in firebase **//
        //**set index to go through all points of one column, plotting them on the x y chart **//
        let data = [];
        let visits = 10;
        //creating random data 
        for (let i = 1; i < 366; i++)
        {
          visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }

        let data2 = [];
        let visits2 = 10;
        for (let i = 1; i < 366; i++)
        {
          visits2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data2.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits2 });
        }

        let data3 = [];
        let visits3 = 10;
        for (let i = 1; i < 366; i++)
        {
          visits3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data3.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits3 });
        }

        chart3.data = data3;
        chart2.data = data2;
        chart.data = data;
        
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let dateAxis2 = chart2.xAxes.push(new am4charts.DateAxis());
        dateAxis2.renderer.grid.template.location = 0;

        let dateAxis3 = chart3.xAxes.push(new am4charts.DateAxis());
        dateAxis3.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
        let valueAxis3 = chart3.yAxes.push(new am4charts.ValueAxis());

        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        valueAxis2.tooltip.disabled = true;
        valueAxis2.renderer.minWidth = 35;

        valueAxis3.tooltip.disabled = true;
        valueAxis3.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        let series2 = chart2.series.push(new am4charts.LineSeries());
        let series3 = chart3.series.push(new am4charts.LineSeries());

        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value}";

        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "value";
        series2.tooltipText = "{valueY.value}";

        series3.dataFields.dateX = "date";
        series3.dataFields.valueY = "value";
        series3.tooltipText = "{valueY.value}";

        chart.cursor = new am4charts.XYCursor();
        chart2.cursor = new am4charts.XYCursor();
        chart3.cursor = new am4charts.XYCursor();

        // let scrollbarX = new am4charts.XYChartScrollbar();
        // let scrollbarX2 = new am4charts.XYChartScrollbar();
        // let scrollbarX3 = new am4charts.XYChartScrollbar();

        // scrollbarX.series.push(series);
        // scrollbarX2.series.push(series2);
        // scrollbarX3.series.push(series3);

        // chart.scrollbarX = scrollbarX;
        // chart2.scrollbarX = scrollbarX2;
        // chart3.scrollbarX = scrollbarX3;

        this.chart2 = chart2;
        this.chart = chart;
        this.chart3 = chart3;

      });
    }

    ngOnDestroy() {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.dispose();
        }
        if (this.chart2){
          this.chart.dispose();
        }
        if (this.chart3){
          this.chart.dispose();
        }

      });
    }

  logout(){
    var self=this;
    let fireBaseUser = firebase.auth().currentUser;
    firebase.auth().signOut().then(function() {
      console.log("logout succeed")
      self.router.navigate(["/login"]);
  // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
//NEWS START ***

 shuffle(arr) {
  var i,
      j,
      temp;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  return arr;    
};

  ngOnInit() {
    console.log("Tabl1 init")
    this.newsService
      .getData(
        `top-headlines?country=us&category=business&pageSize=5&page=${
          this.page
        }`
      )
      .subscribe(data => {
        console.log(data);
        var data1:any=data;
        data1.articles=this.shuffle(data1.articles);
        
        this.data = data1;
      })
    
    this.modelsObservable = this.itemService.GetModel();
    console.log('hey, models imported');
    this.modelsObservable.subscribe(models => {

      this.models = this.shuffle(models);
      if(this.models != undefined){
        console.log('there are' + this.models.length + "in the menu");
      }
    })
  }

  onGoToNewsSinglePage(article) {
    this.newsService.currentArticle = article;
    this.router.navigate(['/news-single']);
  }

  goToModelPage(model){
    console.log('Model Detail' + model);
    this.router.navigate(['/model-single'], model)
  }

  // loadMoreNews(event) {
  //   this.page++;
  //   console.log(event);
  //   this.newsService
  //     .getData(
  //       `top-headlines?country=us&category=business&pageSize=5&page=${
  //         this.page
  //       }`
  //     )
  //     .subscribe(data => {
  //       // console.log(data);
  //       // this.data = data;
  //       for (const article of data['articles']) {
  //         this.data.articles.push(article);
  //       }
  //       event.target.complete();
  //       console.log(this.data);
  //     });
  // }

///////////// stock
}