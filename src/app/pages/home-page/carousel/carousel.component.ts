import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  fadeInAnimation,
} from '../../../_animations/route-animations';
import { ngIfAnimation } from '../../../_animations/ngIfAnimations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [ fadeInAnimation, ngIfAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class CarouselComponent implements OnInit {
  showNavigationIndicators = false;

  constructor() { }

  ngOnInit(): void {
  }

}
