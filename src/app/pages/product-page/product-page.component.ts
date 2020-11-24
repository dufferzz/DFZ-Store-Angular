import {
  Component,
  OnInit, Output, EventEmitter, Input
} from '@angular/core';
import {
  ActivatedRoute
} from "@angular/router";
import {
  HttpService
} from '../../_services/http.service'
import {
  Router
} from '@angular/router';

import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';

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
  AuthService
} from '../../_auth/auth0.service';
import localenn from '@angular/common/locales/nn';

import Swal from 'sweetalert2'
import {
  Title
} from '@angular/platform-browser'
import {
  CartService
} from '../../_services/cart.service'
import { Meta } from '@angular/platform-browser';
import { SEOService } from '../../_services/seo.service';
import { NavComponent } from '../../nav/nav.component'
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }
})
export class ProductPageComponent implements OnInit {


  private subject = new Subject<any>();

  @Input() goToCartEvent: any;
  @Output() deleteRequest = new EventEmitter<any>();

  getMessage(): Observable<any> {
    return this.subject.asObservable();
}

  delete() {
    this.deleteRequest.emit();
  }
  goToCart(){
    this.router.navigate(['/cart'])
  }

  loading: boolean;
  id: string;
  product: any;
  reviews: any;
  images: any;
  specs: any;
  supplier: any;
  salePrice: any;
  price: any;
  onsale = false;
  image: any;
  description: any;
  video: any;
  name: any;
  productFound: boolean;
  cart = [];
  categoryName: any;
  catName: any;
percentDifference: string;
role: string = '';
isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private HttpService: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private cartService: CartService,
    private titleService: Title,
    private metaTagService: Meta,
    private seoService: SEOService,
    public authService: AuthService,



  ) {
    registerLocaleData(localenn)

    this.route.params.subscribe(params => {
      this.id = params['id']
      console.log(params['id'])
    });
  }



  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {}, (reason) => {});
  }

 public addToCart(product) {
    let x = this.cartService.checkIfInCart(product);
    if(x.length > 0){
      Swal.fire({
        icon: 'info',
        title: `Already in Cart!`,
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'View Cart',
        html: `You can modify your order on the Cart page`,
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/cart'])
        //   console.log(result)
        //   Swal.fire({
        //     icon: 'success',
        //     title: `${product.title}`,
        //     text: 'Added to cart!',
        //     confirmButtonColor: '#28a745',
        //     html:
        //   `${product.title} Added to Cart! <br><br>` +
        //   `<span style="color:#28a745;"(click)="gotoCart()">Go To Checkout Now!</span> `,
        //     confirmButtonText:
        //   'Go to Cart',
        // confirmButtonAriaLabel: 'Continue Shopping',
        //   })
        }})




    } else{
    this.cartService.addToCart(product);
    Swal.fire({
      icon: 'success',
      title: `${product.title}`,
      text: 'Added to cart!',
      confirmButtonColor: '#28a745',
      html:
    `Added to Cart!`,
      confirmButtonText:
    'Continue Shopping',
  confirmButtonAriaLabel: 'Continue Shopping',
    })
    }
  }

  generatePercentages(){
      if(this.product.onSale){
        var decreaseValue = this.product.price - this.product.salePrice;
        var diff = (decreaseValue / this.product.price) * 100
        this.percentDifference = diff.toFixed(0)
      }else{
        return true;
      }

  }

getPercentageChange(oldNumber, newNumber){
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
}

  retrieveProduct(id): void {
    this.HttpService.getProduct(id)
      .subscribe(
        data => {
          this.loading = false;
          if (data['title']) {
            this.productFound = true;
            this.product = data;
            this.name = data['title']
            this.reviews = data['reviews'];
            this.onsale = data['onSale'];
            this.salePrice = data['salePrice']
            this.specs = data['specs']
            this.price = data['price']
            this.supplier = data['supplier']
            this.image = data['image']
            this.description = data['description']
            this.video = 'https://www.youtube.com/embed/' + data['video']
            this.catName = data['category']
            // console.log(data['onSale'])
            //console.log(this.catName, this.categoryName)
            this.titleService.setTitle(`DFZ Service | ${this.supplier} | ${this.name} `);
            this.metaTagService.updateTag(
              { name: 'Description', content: this.product.description }
            );
            this.HttpService.getCategoryName(this.catName)
            .subscribe(
              data => {
                this.categoryName = data['title']
              },
              error => {
                this.router.navigate(['/error', {error: error.message}]);
                console.log(error);
              });
            this.generatePercentages();

          } else {
            this.productFound = false;
          }
        },
        error => {
          this.router.navigate(['/error', {error: error.message}]);
          console.log(error);
        });

  }

  checkAdmin(){
    this.authService.getUser().subscribe(user => {
      this.role = user['https://dfzservice.no/roles'][0]
      //console.log(this.role)
      if (this.role == 'admin')
        this.isAdmin = true;
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.checkAdmin();
    this.retrieveProduct(this.id)
    this.seoService.updateCanonicalUrl(`products/${encodeURIComponent(this.id.trim())}`);
  }

}
