import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const baseUrl = 'https://api.dufferz.net/v2/products/';

export const InterceptorSkip = 'X-Skip-Interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': ''
});

@Injectable({
  providedIn: 'any'
})
export class HttpService {
  constructor(private http: HttpClient){}


  getAll(): Observable<any> {
    return this.http.get(baseUrl, { headers : InterceptorSkipHeader });
  }
  getCategories(): Observable<any> {
    return this.http.get('https://api.dufferz.net/v2/categories/', { headers : InterceptorSkipHeader });
  }
  getProduct(id): Observable<any> {
    return this.http.get('https://api.dufferz.net/v2/products/'+id, { headers : InterceptorSkipHeader });
  }
  getCategory(id): Observable<any> {
    return this.http.get('https://api.dufferz.net/v2/categories/'+id, { headers : InterceptorSkipHeader });
  }
  getBrand(id): Observable<any> {
    return this.http.get('https://api.dufferz.net/v2/brands/'+id, { headers : InterceptorSkipHeader });
  }
  getCategoryName(id): Observable<any> {
    return this.http.get('https://api.dufferz.net/v2/category/'+id, { headers : InterceptorSkipHeader });
  }
  get(url): Observable<any> {
    return this.http.get(url, { headers : InterceptorSkipHeader });
  }
  post(url, data): Observable<any> {
    return this.http.post(url, data, { headers : InterceptorSkipHeader });
  }
  logout(): Observable<any> {
    return this.http.post('https://dfz.eu.auth0.com/api/v2/logout', { headers : InterceptorSkipHeader });
  }
}
