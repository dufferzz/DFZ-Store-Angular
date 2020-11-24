import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class StripeyService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private http: HttpClient,
    ) {
      }

  get(url): Observable<any> {
    return this.http.get(url);
  }
  post(url, data): Observable<any> {
    return this.http.post(url, data);
  }
  getIntent(data, id, phone): Observable<any> {
    return this.http.post('https://api.dufferz.net/v2/payments/h', {id:id, items:data, phone: phone});
  }
  retrieveIntent(){
    return this.storage.get('DFZ_Cart_Token') || [];
  }
}
