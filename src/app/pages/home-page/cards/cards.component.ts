import { Component, OnInit } from '@angular/core';
import { faTruck, faCoffee,faWrench, faSmile, faMoneyBill, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  faTruck = faTruck;
  faCoffee = faCoffee;
faWrench = faWrench;
faSmile = faSmile;
faMoneyBill = faMoneyBill;
faBook = faBook;

  constructor() { }

  ngOnInit(): void {
  }

}
