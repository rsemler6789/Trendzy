
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.page.html',
  styleUrls: ['./news-single.page.scss']
})
export class NewsSinglePage implements OnInit {
  article;
  constructor(private newsService: NewsService,
              private router: Router) {}

  ngOnInit() {
    this.article = this.newsService.currentArticle;
    console.log(this.newsService.currentArticle);
  }

  backPage(){
    this.router.navigate(['tabs/tab1']);
  }

}
