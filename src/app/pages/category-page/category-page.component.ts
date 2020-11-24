import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  ActivatedRoute
} from "@angular/router";
import {
  HttpService
} from '../../_services/http.service'
import { SEOService } from '../../_services/seo.service';

import { fadeInAnimation } from '../../_animations/route-animations';
import { ngIfAnimation } from '../../_animations/ngIfAnimations';
import {
  registerLocaleData
} from '@angular/common';
import {
  Title
} from '@angular/platform-browser'
import localenn from '@angular/common/locales/nn';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],

  animations: [ fadeInAnimation, ngIfAnimation ],
  host: { '[@fadeInAnimation]': '' }

})
export class CategoryPageComponent implements OnInit {
  loading: boolean;
  id: any;
  categoryFound: boolean;
  category: any;
  products: any;
  categoryName: string;
  saleItems = []
  categories: any;

  constructor(
    private route: ActivatedRoute,
    private HttpService: HttpService,
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta,
    private seoService: SEOService



  ) {
    registerLocaleData(localenn)

    this.route.params.subscribe(params => {
      this.products = null;
      this.id = params['id']
      this.retrieveCategory(this.id);
    });
  }

  addMetaTags(){

  }

  generatePercentages(){
    for (let product of this.products) {

      if(product.onSale == true){
        var decreaseValue = product.price - product.salePrice;
        var diff = (decreaseValue / product.price) * 100
        product.percentDifference = diff.toFixed(0)
      }
    }
  }

getPercentageChange(oldNumber, newNumber){
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
}

retrieveCategories(): void {
  this.HttpService.getCategories()
    .subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      });
}

  retrieveCategory(id): void {
    this.HttpService.getCategory(id)
      .subscribe(
        data => {
          this.loading = false;
          if (data.length > 0) {
            this.categoryFound = true;
            this.products = data;
            this.generatePercentages();
          } else {
            this.categoryFound = false;
          }
        },
        error => {
          console.log(error.statusText);

          this.router.navigate(['/error', {error: error.message}]);
        });
        this.HttpService.getCategoryName(id)
      .subscribe(
        data => {
          this.categoryName = data.title
          this.titleService.setTitle(`DFZ Service | ${this.categoryName}`);
          this.metaTagService.updateTag(
            { name: 'Description', content: 'TODO: Category descriptions & top banner, add sub categories to page' }
          );
        },
        error => {
          this.router.navigate(['/error', {error: error.message}]);
          console.log(error);
        });
  }



  async change(event) {
    //console.log('changed!', event.target.value)
    // console.log(this.products)

    if (event.target.value != "") {

      var newArray = await this.products.filter(function (el) {
        return el.category == event.target.value
      });
      // console.log(newArray)
      this.products = newArray
    } else {
      this.retrieveCategory(this.id);
    }


  }

  ngOnInit(): void {
    this.addMetaTags();
    this.loading = true;
    this.retrieveCategory(this.id);
    this.retrieveCategories()
    this.seoService.updateCanonicalUrl(this.id);
  }

}
