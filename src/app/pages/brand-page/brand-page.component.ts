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

import {
  fadeInAnimation
} from '../../_animations/route-animations';
import {
  ngIfAnimation
} from '../../_animations/ngIfAnimations';

import {
  registerLocaleData
} from '@angular/common';
import {
  Title
} from '@angular/platform-browser'
import localenn from '@angular/common/locales/nn';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss'],
  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }
})
export class BrandPageComponent implements OnInit {
  loading: boolean;
  id: any;
  categoryFound: boolean;
  category: any;
  products: any;
  allProducts: any;
  categoryName: string;
  saleItems = []
  categories: any;

  constructor(

    private route: ActivatedRoute,
    private HttpService: HttpService,
    private router: Router,
    private titleService: Title,
  ) {

    registerLocaleData(localenn)

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.retrieveCategory(this.id);
    });
    this.titleService.setTitle(`DFZ Service | ${this.id}`);

  }

  ngOnInit(): void {
    this.retrieveCategory(this.id);
    this.retrieveCategories();
  }

  generatePercentages() {
    for (let product of this.products) {
      if (product.onSale == true) {
        var decreaseValue = product.price - product.salePrice;
        var diff = (decreaseValue / product.price) * 100
        product.percentDifference = diff.toFixed(0)
      }
    }
  }

  getPercentageChange(oldNumber, newNumber) {
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

  async change(event) {
    console.log('changed!', event.target.value)
    // console.log(this.products)

    if (event.target.value != "") {

      var newArray = await this.allProducts.filter(function (el) {
        return el.category == event.target.value
      });
      // console.log(newArray)
      this.products = newArray
    } else {
      this.retrieveCategory(this.id);
    }


  }


  retrieveCategory(id): void {
    this.HttpService.getBrand(id)
      .subscribe(
        data => {
          console.log(data)
          this.loading = false;
          if (data.length > 0) {
            this.categoryFound = true;
            this.products = data;
            this.allProducts = data;
            this.generatePercentages();
          } else {
            this.categoryFound = false;
          }
        },
        error => {
          this.router.navigate(['/error', {
            error: error.message
          }]);
          console.log(error);
        });
  }

}
