import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../_animations/route-animations';

import { ngIfAnimation } from '../../../_animations/ngIfAnimations';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {HttpService} from '../../../_services/http.service'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [ fadeInAnimation, ngIfAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class CategoriesComponent implements OnInit {
  categories: any;
  loading:boolean;

  constructor(
    private HttpService: HttpService,

    private route: ActivatedRoute,
    private router: Router,
    ){

    }

  ngOnInit(): void {
    this.loading = true;
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.HttpService.getCategories()
      .subscribe(
        data => {
          this.loading = false;
          this.categories = data;
        },
        error => {
          this.router.navigate(['/error', {error: error.message}]);
          console.log(error);
        });
  }

}
