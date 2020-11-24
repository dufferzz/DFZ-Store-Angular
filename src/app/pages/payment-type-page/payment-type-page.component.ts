import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  StripeyService
} from '../../_services/stripe.service'

import Swal from 'sweetalert2'
import {
  loadStripe
} from '@stripe/stripe-js';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  FormBuilder
} from '@angular/forms';

import {
  Router
} from '@angular/router';
// import { Stripe } from '@stripe/stripe-js'
import {
  AuthService
} from '../../_auth/auth0.service';
import {
  ApiService
} from 'src/app/_services/api.service';
declare var stripe: any;
declare var elements: any;



@Component({
  selector: 'app-payment-type-page',
  templateUrl: './payment-type-page.component.html',
  styleUrls: ['./payment-type-page.component.scss']
})



export class PaymentTypePageComponent implements OnInit {
  intent: any;
  role: string;

  form = this.fb.group({
    phone: ['', [Validators.minLength(8), Validators.required]],
    // lastName: [''],
  })


  // form:any;
  // form = new FormGroup({
  //   phone: new FormControl('',[
  //     Validators.required,
  //     Validators.minLength(8)
  //   ]),
  //   // email: new FormControl()
  // });
  // @ViewChild('cardInfo') cardInfo: ElementRef;
  _totalAmount: number;
  // card: any;
  // email:any;
  // phone:any;
  // phone: any;
  // email: any;
  // cardHandler = this.onChange.bind(this);
  cardError: string;



  constructor(
    private stripe: StripeyService,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService

  ) {

  }
  ngOnInit() {
    this.intent = this.stripe.retrieveIntent();
  }
  checkRole() {
    console.log(this.form.controls.phone.value)


    if (this.auth.isAuthenticated$) {
      this.auth.getUser().subscribe(user => {
        this.role = user['https://testing.dufferz.net/stripe_customer_id']
        //console.log(this.role)

        if (this.role != null) {

          stripe.redirectToCheckout({
            // TODO: Add address/delivery parsing
            // clientReferenceId: this.form.controls.phone.value,
            sessionId: this.intent.intent['id']
          }).then(function (result) {
            //console.log(result)
          });


        } else {
          this.router.navigate(['/401']);

        }


      })
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
