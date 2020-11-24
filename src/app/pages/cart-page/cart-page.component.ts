import {
  Component,
  OnInit,Output, EventEmitter
} from '@angular/core';
import {
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import {
  fadeInAnimation
} from '../../_animations/route-animations';
import {
  ngIfAnimation
} from '../../_animations/ngIfAnimations';
import {
  CartService
} from '../../_services/cart.service'
import {
  registerLocaleData
} from '@angular/common';
import {
  Router,
} from '@angular/router';
import localenn from '@angular/common/locales/nn';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Injectable, Inject } from '@angular/core';

import {
  HttpService
} from '../../_services/http.service'

import { StripeyService } from '../../_services/stripe.service'

import Swal from 'sweetalert2'

const STORAGE_KEY = 'DFZ_Cart_Token';
declare var stripe: any;

import {
  AuthService
} from '../../_auth/auth0.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],

  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }

})
export class CartPageComponent implements OnInit {
  @Output() deleteRequest = new EventEmitter<any>();

  role: string;
  items: any;
  faTrash = faTrash;
  subtotal = Number(0);

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,

    private cartService: CartService,
    private HttpService: HttpService,
    private router: Router,
    private stripey: StripeyService,
    private auth: AuthService,
  ) {
    registerLocaleData(localenn)
  }



  getStripeId() {
    if (this.auth.isAuthenticated$) {
      this.auth.getUser().subscribe(user => {
        this.role = user['https://testing.dufferz.net/stripe_customer_id']
        // console.log(this.role)
      })
    }
  }


  calcSubTotal(item) {
    // console.log(item)
    if (item.onSale == true) {
      // console.log('sale', item)
      this.subtotal += Number(item.product.salePrice)
    } else {
      this.subtotal += Number(item.product.price)
    }
  }

  formatRequest(data) {

    let generatedBasket = []

    data.forEach((item) => {

      if (item.onSale == true) {
        generatedBasket.push({
          name: item.name,
          item: item.id,
          qty: item.qty,
          price: item.product.salePrice,
          onSale: item.product.onSale,
          stripeID: item.product.stripeID,
          stripePriceID: item.product.stripePriceID,
          stripeSKUID: item.product.stripeSKUID

        })
      } else {

        generatedBasket.push({
          name: item.name,
          item: item.id,
          qty: item.qty,
          price: item.product.price,
          onSale: item.product.onSale,
          stripeID: item.product.stripeID,
          stripePriceID: item.product.stripePriceID,
          stripeSKUID: item.product.stripeSKUID
        })
      }
    })

    // console.log(generatedBasket)

    return generatedBasket;
  }
  removeFromCart(item) {
    Swal.fire({
      title: 'Remove item?',
      html: `Are you sure you wish to remove this item from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
            this.cartService.removeItem(item)
        console.log('removing', item)
        this.getItems();
      }
    })
  }


  clearCart() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Your Cart will be emptied!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, empty it!'
    }).then((result) => {
      if (result.value) {
        this.cartService.clearCart();
        this.items = []
        this.router.navigate(['/cart'])
      }
    })

  }

  sendToServer() {

    if(this.auth.loggedIn == true){

      const basket = this.formatRequest(this.cartService.getCart())
      console.log('send to server')

      Swal.fire({
        title:'Contact Info',
        confirmButtonColor: '#28a745',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Pay Now',
        html: `Please Supply a Contact Telephone Number`,
        input: 'text',


      }).then((result) => {
        if (result.value) {

          // Swal.fire(result.value)
          this.stripey.getIntent(basket, this.role, result.value)
            .subscribe(
              res => {
                console.log('HTTP response', res)
                if (res.status == "authorized") {
                  this.storage.set(STORAGE_KEY, res);
                  // this.router.navigate(['/payment'])
                  if (this.auth.isAuthenticated$) {
                    this.auth.getUser().subscribe(user => {
                      this.role = user['https://testing.dufferz.net/stripe_customer_id']
                      console.log(this.role)

                      if (this.role != null) {

                        stripe.redirectToCheckout({
                          // TODO: Add address/delivery parsing
                          // clientReferenceId: this.form.controls.phone.value,
                          sessionId: res.intent['id']
                        }).then(function (result) {
                          console.log(result)
                        });


                      } else {
                        this.router.navigate(['/401']);

                      }


                    })
                  } else {
                    this.router.navigate(['/']);
                    return false;
                  }

                } else if(res.status == "error") {

                  Swal.fire({
                    icon: 'error',
                    title: `Processing Failed!`,
                    html: res.data,
                  })
                  this.cartService.clearCart();
                  this.router.navigate(['/cart'])
                  this.items = []
                  return
                }
                console.log(res)
              },
              err => {
                Swal.fire({
                  icon: 'error',
                  title: `Processing Failed!`,
                  html: (err.error.data),
                })
              },
              () => {
                console.log('HTTP request completed.')
              }
            )
        }
      })


    } else{
Swal.fire({
  title: 'You must be logged in',
  html: 'Perhaps your account has not been verified?<br><br>Check your E-Mail for verification'
})
    }


  }

  getItems(){

    this.items = this.cartService.getCart()
    // console.log(this.items)
    if(this.items.length > 0){
      this.items.forEach(item => this.calcSubTotal(item));
    }
  }

  ngOnInit(): void {
    this.getStripeId()
    this.getItems()
  }

}
