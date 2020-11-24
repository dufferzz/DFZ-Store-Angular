import {
  Component,
  OnInit
} from '@angular/core';
import {
  ApiService
} from '../../_services/api.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  FormControl
} from '@angular/forms';
import {
  HttpService
} from '../../_services/http.service'
import {
  NgbDateStruct,
  NgbCalendar
} from '@ng-bootstrap/ng-bootstrap';
import {
  Router
} from '@angular/router';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  AuthService
} from '../../_auth/auth0.service';
import {
  Title
} from '@angular/platform-browser'
import Quill from 'quill'
import {
  ngIfAnimation
} from '../../_animations/ngIfAnimations';
import {
  fadeInAnimation
} from '../../_animations/route-animations';

import {
  QuillService
} from '../../_services/quill.service'
import localenn from '@angular/common/locales/nn';
import {
  registerLocaleData
} from '@angular/common';
import {SwPush} from '@angular/service-worker'
import {NotificationService} from '../../_services/notifications.service'
const parchment = Quill.import('parchment')
const block = parchment.query('block')
block.tagName = 'DIV'
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */ , true)
@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }

})
export class AccountPageComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = "BCnctmONqogrUrsiFoEiFr-p7YUGU0bBsUSTTvtWsGkBKuRW4Hpivbye8e_08wwSE2kMmy0JxZx0S7Nvl7Tt98E";
/* {"publicKey":"BCnctmONqogrUrsiFoEiFr-p7YUGU0bBsUSTTvtWsGkBKuRW4Hpivbye8e_08wwSE2kMmy0JxZx0S7Nvl7Tt98E",
"privateKey":"huOUZAnQNQqheavXzdDEJSUSfdjkw99wwHvIL_a44g8"} */

  htmlText = ""
  hasFocus = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private HttpService: HttpService,
    public auth: AuthService,
    private calendar: NgbCalendar,
    private titleService: Title,
    private quillInitializeService: QuillService,
    private swPush: SwPush,
   private newsletterService: NotificationService,
   private router: Router


  ) {
    this.titleService.setTitle(`DFZ Service | My Account`);
    registerLocaleData(localenn)

  }
  subscribeToNotifications() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      //console.log(sub)
      this.newsletterService.addPushSubscriber(sub).subscribe()
    })
    .catch(err => console.error("Could not subscribe to notifications", err));
}
send(){
  this.newsletterService.send().subscribe()


}

  role: string;
  model: NgbDateStruct;
  date: {
    year: number,
    month: number
  };
  categories: any;
  loading:boolean = true;
  submitted = false;
  returnUrl: string;
  error = '';
  nrSelect = 'none'
  specs = [];
  user:any;
items:any;
  selectToday() {
    this.model = this.calendar.getToday();
  }
  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{
          'header': 1
        }, {
          'header': 2
        }], // custom button values
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        [{
          'script': 'sub'
        }, {
          'script': 'super'
        }], // superscript/subscript
        [{
          'indent': '-1'
        }, {
          'indent': '+1'
        }], // outdent/indent
        [{
          'direction': 'rtl'
        }], // text direction

        [{
          'size': ['small', false, 'large', 'huge']
        }], // custom dropdown
        [{
          'header': [1, 2, 3, 4, 5, 6, false]
        }],

        [{
          'font': []
        }],
        [{
          'align': []
        }],

        ['clean'], // remove formatting button

        ['link']
      ],
    }
  }
  log(){
    //console.log(this.htmlText)
  }
  ngOnInit(): void {
    this.getCategories();
    // this.pingApi();
    this.getCustomerOrders();
  }


  x = this.fb.group({
    itemName: ['', Validators.required],
    supplier: ['', Validators.required],
    price: ['', Validators.required],
    salePrice: [''],
    onSale: ['', Validators.required],
    visible: [''],
    picture: ['', Validators.required],
    specName: [''],
    specSpec: [''],
    description: ['', Validators.required],
    category: ['', Validators.required],
    video: ['']

  });

  getCategories(): void {
    this.HttpService.getCategories()
      .subscribe(
        data => this.categories = data,
        error => console.log(error));
  }

  pingApi() {
    this.api.get('https://api.dufferz.net/private').subscribe(
      res => console.log(res));
  }

  getCustomerOrders() {
    if (this.auth.isAuthenticated$) {
      this.auth.getUser().subscribe(user => {
        console.log(user)
        this.user = user['https://testing.dufferz.net/stripe_customer_id']
        //console.log(this.user)

    this.api.post('https://api.dufferz.net/v2/payments/listorders', {user:this.user}).subscribe((res) => {
      // console.log(res)
      this.items=Array.from(res.items)
      //console.log(this.items)
      this.loading = false;
    })
    ;})
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  addSpec() {
    //console.log('Adding spec', this.x.value.specName, this.x.value.specSpec)
    this.specs.push({
      title: this.x.value.specName,
      spec: this.x.value.specSpec
    })

  }

  createItem() {
    // this.submitted = true;
    // if (this.x.invalid) return
    // this.loading = true;

    // const data = {
    //   form: this.x.value,
    //   specs: this.specs
    // }
    // console.log(data)
    // this.api.post('https://api.dufferz.net/v2/products/create', data).subscribe(
    //   res => {
    //     this.loading = false;
    //     console.log(res)
    //   });
  }
}
