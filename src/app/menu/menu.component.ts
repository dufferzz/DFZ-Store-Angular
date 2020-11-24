import {ElementRef, HostBinding, Component, OnInit, Input, OnChanges} from '@angular/core';
import {HttpService} from '../_services/http.service'
import { Router } from '@angular/router';
import { HostListener } from "@angular/core";
import { smoothHeight } from '../_animations/navAnimations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [smoothHeight]
})
export class MenuComponent implements OnInit {
  categories: any;
  loading:boolean;
  public screenWidth: any;
  public screenHeight: any;
  public isMenuCollapsed = true;

  @Input()
  trigger: any;

  startHeight: number;
  constructor(
    private HttpService: HttpService,
    private router: Router,
    private element: ElementRef

  ) {
    this.onResize();

    this.loading = true;
    this.retrieveCategories();
  }

  goTo(category){
    this.router.navigate(['/category/'+category])
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
     this.screenHeight = window.innerHeight;
     this.screenWidth = window.innerWidth;
  }
  retrieveCategories(): void {
    this.HttpService.getCategories()
      .subscribe(
        data => {
          this.loading = false;
          this.categories = data;
        },
        error => {

          console.log(error);
        });
  }

  @HostBinding('@navAnimation') get grow() {
    return {value: this.trigger, params: {startHeight: this.startHeight}};
  }

  setStartHeight(){
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges(){
    this.setStartHeight();
  }

  ngOnInit(): void {

  }

}
