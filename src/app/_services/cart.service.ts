import { Inject, Injectable, EventEmitter, Output } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2'

// key that is used to access the data in local storage
const STORAGE_KEY = 'DFZ_Cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private subject = new Subject<any>();

  constructor
  (
    @Inject(LOCAL_STORAGE) private storage: StorageService,

  ) { }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
}

  public getNumberInCart(){
    const currentBasket = this.storage.get(STORAGE_KEY) || [];
    // console.log(currentBasket)
    // console.log(currentBasket.length)
    return currentBasket.length
  }

  public clearCart(){
    this.subject.next({ text: 0 });
    this.storage.clear()
  }

  public removeItem(item){
    let basket = this.storage.get(STORAGE_KEY)
   //console.log(item, basket)

    let filter = basket._id
    basket = basket.filter(function(ite) {
      return ite.id !== item
  })
  this.storage.set(STORAGE_KEY, basket);

  // console.log(basket)

  }


  public checkIfInCart(item){
    const currentBasket = this.storage.get(STORAGE_KEY) || [];
    let x = currentBasket.filter(function(ite) {
      return ite.id == item._id
    })
    return x
  }

  public addToCart(product): void {
    // get array of tasks from local storage
    const currentBasket = this.storage.get(STORAGE_KEY) || [];

    let x = currentBasket.filter(function(ite) {
      return ite.id == product._id
    })

    if(x.length > 0){


    }

    this.subject.next({ text: currentBasket.length+1 });

    // console.log(product)
    // push new task to array
    if (product.onSale == true){

      currentBasket.push({
        id: product._id,
        name: product.title,
        qty: 1,
        onSale: true,
        price: product.salePrice,
        product: product
    });
    }else{

    currentBasket.push({
      id: product._id,
      name: product.title,
      qty: 1,
      onSale: false,
      price: product.price,
      product: product

  });
}
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentBasket);
    this.getNumberInCart()
    // console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
}

public getCart(): void {

  // get array of tasks from local storage
  const currentCart = this.storage.get(STORAGE_KEY) || [];
  // console.log(currentCart)
  return currentCart
}

}
