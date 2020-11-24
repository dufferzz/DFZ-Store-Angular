import { Component, OnInit } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  ApiService
} from '../../../_services/api.service'
import {
  registerLocaleData
} from '@angular/common';
import localenn from '@angular/common/locales/nn';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import {
  ngIfAnimation
} from '../../../_animations/ngIfAnimations';
import {
  fadeInAnimation
} from '../../../_animations/route-animations';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }
})
export class TransactionComponent implements OnInit {
loading:boolean = true;
items:any;
order:any;
id: string;
payInfo: any;
customerInfo: any;
riskLevel: any;
riskScore: any;
faCheckCircle = faCheckCircle;
deliveryinfo: any;
email: string;
phone: string;
status:string;
totalPrice:any;
name:string;
reply: any;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    registerLocaleData(localenn)

    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params['id']
    });
   }
  getOrder(){
    this.api.post(`https://api.dufferz.net/v2/payment/${this.id}`, {id:this.id}).subscribe((data)=>{
      console.log(data)

      this.reply=data.items
      this.order=data.items.order_ID
      this.email=data.items.customerEmail
      this.status=data.items.orderStatus
      this.totalPrice=data.items.orderTotalPrice
      this.phone=data.items.customerPhone
      this.riskLevel=data.items.riskLevel
      this.riskScore=data.items.riskScore

      this.deliveryinfo=data.items.deliveryInfo
      this.name=data.items.customerName
      // console.log(data)
      // console.log(Array.from(data.items.items))
      this.items=Array.from(data.items.items)
      this.loading=false;
      console.log(this.deliveryinfo)
      // this.order = data.session;
      // this.items = data.items.data
      // console.log(this.items)
      this.loading = false;

    // console.log(data.session.customer)
    // this.getCustomer(data.session.customer)
    // this.getPayment(data.session.payment_intent)
    })
   }

   getCustomer(customer){
    this.api.get(`https://api.dufferz.net/v2/payments/customerinfo/${customer}`).subscribe((data)=>{
      console.log(data)
      this.customerInfo = data
    })
   }

   getPayment(intent){
    this.api.get(`https://api.dufferz.net/v2/payments/paymentinfo/${intent}`).subscribe((data)=>{
      console.log(data)
      this.payInfo = data;
      // this.riskLvl = data.charges.data[0].outcome.risk_level
      // console.log(this.riskLvl)
    })
   }
  ngOnInit(): void {
    this.getOrder()
  }

}
