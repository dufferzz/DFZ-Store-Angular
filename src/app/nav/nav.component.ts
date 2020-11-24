import {
  faSearch,
  faUser,
  faShoppingCart,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  fadeInAnimation
} from '../_animations/route-animations';
import {
  smoothHeight
} from '../_animations/navAnimations';
import {
  AuthService
} from '../_auth/auth0.service';
import {
  ElementRef,
  HostBinding,
  Component,
  OnInit,
  Input,
  OnChanges
} from '@angular/core';
import {
  CartService
} from '../_services/cart.service'

import {
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

  animations: [fadeInAnimation, smoothHeight],
  host: {
    '[@fadeInAnimation]': ''
  }
})
export class NavComponent implements OnInit {
  currentState = 'initial';
  subscription: Subscription;

  changeState() {
    // console.log(this.isMenuCollapsed)
    // this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  public isMenuCollapsed = true;
  faSearch = faSearch;
  faUser = faUser;
  faSignOut = faSignOutAlt;
  faShoppingCart = faShoppingCart

  @Input() addToCartEvent: any;

  trigger: any;

  startHeight: number;
  role: string = '';
  cartItems: any;
  constructor(
    public authService: AuthService,
    private element: ElementRef,
    private cart: CartService,


  ) {}
  @HostBinding('@navAnimation') get grow() {
    return {
      value: this.trigger,
      params: {
        startHeight: this.startHeight
      }
    };
  }

  setStartHeight() {
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges() {
    this.setStartHeight();
  }

  ngOnInit(): void {
    this.cartItems = this.cart.getNumberInCart()

    this.subscription = this.cart.getMessage().subscribe(message => {
      if (message) {
        // console.log('recieveed', message)
        this.cartItems = message.text
      } else {
        // console.log('no message')
      }
    });
  }
}
