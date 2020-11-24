import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CardsComponent } from './cards/cards.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';

// import { AuthService } from '../../_auth/auth0.service';

@NgModule({
  declarations: [HomePageComponent, CarouselComponent, CardsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NgbModule,
    FontAwesomeModule,

  ],
  providers:[
    // AuthService,
  ]
})
export class HomePageModule { }
