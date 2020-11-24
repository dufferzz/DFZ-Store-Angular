import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import {
  ApiService
} from '../../_services/api.service'
import Swal from 'sweetalert2';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import localenn from '@angular/common/locales/nn';
import {
  registerLocaleData
} from '@angular/common';
import {
  AuthService
} from '../../_auth/auth0.service';
import {
  CartService
} from '../../_services/cart.service'
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
id:any;
loading: boolean = true;
order:any;
items:any;
error: boolean = false;
faCheckCircle = faCheckCircle;
payInfo: any;
deliveryinfo: any;
email: string;
phone: string;
status:string;
totalPrice:any;
name:string;
reply: any;
user:string;

  constructor(
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private router: Router,
    private auth: AuthService,
    private cart: CartService
  ) {
    registerLocaleData(localenn)

    this.route.queryParams.subscribe(params => {
      //console.log(params)
      this.id = params['session_id']
    });
   }

   getOrder(){
// console.log(this.user)
    this.ApiService.post(`https://api.dufferz.net/v2/stripeorder`, {id:this.id, user:this.user}).subscribe((data)=>{
      if(data.status=="error"){
        Swal.fire({
          title: 'Error!',
          text: data.data
        })
      }else{
      this.reply=data.items
      this.order=data.items.order_ID
      this.email=data.items.customerEmail
      this.phone=data.items.customerPhone
      this.status=data.items.orderStatus
      this.totalPrice=data.items.orderTotalPrice
      this.deliveryinfo=data.items.deliveryInfo
      this.name=data.items.customerName
      this.items=Array.from(data.items.items)
      this.loading=false;
      //console.log(this.deliveryinfo)
      }
    })
   }

  ngOnInit() {
    this.cart.clearCart();
    this.checkRole()

  }


  checkRole() {
    if (this.auth.isAuthenticated$) {
      this.auth.getUser().subscribe(user => {
        // console.log(user['https://testing.dufferz.net/stripe_customer_id'])
        this.user = user['https://testing.dufferz.net/stripe_customer_id']
        if(this.user !=null){
          this.getOrder();
        }
      })
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}


