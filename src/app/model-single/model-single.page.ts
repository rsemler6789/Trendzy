import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';


@Component({
  selector: 'app-model-single',
  templateUrl: './model-single.page.html',
  styleUrls: ['./model-single.page.scss'],
})
export class ModelSinglePage implements OnInit {
  model;
  current_model: any;
  constructor(private router: Router, private route: ActivatedRoute,
    public itemService: ItemService,) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.current_model = param;
        console.log('Selected item detail: ' + this.current_model.description);
      }
    )
  }

  goBack(){
    this.router.navigate(['tabs/tab1']);
  }

}
