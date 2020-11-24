import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  ActivatedRoute
} from "@angular/router";
import {
  HttpService
} from '../../../_services/http.service'
import {
  Router
} from '@angular/router';

import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';

import {
  fadeInAnimation
} from '../../../_animations/route-animations';
import {
  ngIfAnimation
} from '../../../_animations/ngIfAnimations';
import {
  registerLocaleData
} from '@angular/common';

import localenn from '@angular/common/locales/nn';

import Swal from 'sweetalert2'

import Quill from 'quill'

import {
  QuillService
} from '../../../_services/quill.service'

import {
  ApiService
} from '../../../_services/api.service';

import {
  Title
} from '@angular/platform-browser'
import {
  CartService
} from '../../../_services/cart.service'
import {
  Meta
} from '@angular/platform-browser';
import {
  SEOService
} from '../../../_services/seo.service';
import {
  NavComponent
} from '../../../nav/nav.component'
import {
  Observable,
  Subject
} from 'rxjs';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

const parchment = Quill.import('parchment')
const block = parchment.query('block')
block.tagName = 'DIV'
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */ , true)


@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss'],
  animations: [fadeInAnimation, ngIfAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }
})
export class NewproductComponent implements OnInit {

  content: any;
  loading: boolean;
  id: string;
  product: any;
  reviews: any;
  images: any;
  // specs: any;
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
  htmlText = ""

  role: string;
  // model: NgbDateStruct;
  date: {
    year: number,
    month: number
  };
  categories: any;
  // loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  nrSelect = 'none'
  specs = [];


  quillConfig = {
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
          'align': []
        }],

        ['clean'], // remove formatting button

      ],
    }
  }

  constructor(
    private route: ActivatedRoute,
    private HttpService: HttpService,
    private router: Router,
    private modalService: NgbModal,
    private api: ApiService,
    private fb: FormBuilder,
    private cartService: CartService,
    private titleService: Title,
    private metaTagService: Meta,
    private seoService: SEOService,
    private quillInitializeService: QuillService,

  ) {
    registerLocaleData(localenn)

  }


  x = this.fb.group({
    itemName: ['', Validators.required],
    supplier: ['', Validators.required],
    price: ['', Validators.required],
    salePrice: [''],
    onSale: ['', Validators.required],
    showOnStore: [''],
    picture: ['', Validators.required],
    specName: [''],
    specSpec: [''],
    description: ['', Validators.required],
    category: ['', Validators.required],
    video: ['']

  });


  open(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    }).result.then((result) => {}, (reason) => {});
  }

  generatePercentages() {
    if (this.product.onSale) {
      var decreaseValue = this.product.price - this.product.salePrice;
      var diff = (decreaseValue / this.product.price) * 100
      this.percentDifference = diff.toFixed(0)
    } else {
      return true;
    }

  }

  getPercentageChange(oldNumber, newNumber) {
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
  }

  getCategories(): void {
    this.HttpService.getCategories()
      .subscribe(
        data => this.categories = data,
        error => console.log(error));
  }

  addSpec() {
    console.log('Adding spec', this.x.value.specName, this.x.value.specSpec)
    this.specs.push({
      title: this.x.value.specName,
      spec: this.x.value.specSpec
    })
    console.log(this.specs, this.x)

  }

  createItem() {
    this.submitted = true;
    if (this.x.invalid) return
    this.loading = true;

    const data = {
      form: this.x.value,
      specs: this.specs
    }
    console.log(data)
    this.api.post('https://api.dufferz.net/v2/products/create', data).subscribe(
      res => {
        this.loading = false;
        console.log(res)
      });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
