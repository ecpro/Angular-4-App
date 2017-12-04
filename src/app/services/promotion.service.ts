import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PROMOTIONS } from "../shared/promotions";
import { Promotion } from "../shared/promotion";
import { baseURL } from "../shared/baseURL";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";



@Injectable()
export class PromotionService {

  constructor(private _http:HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this._http.get<Promotion[]>(baseURL+ 'promotions');
    //return Observable.of(PROMOTIONS).delay(2000);
  }

  getPromotion(id:Number): Observable<Promotion> {
    return this._http.get<Promotion[]>(baseURL+ 'promotions').map(promotions => promotions.filter(promotion => promotion.id)[0]);
    //return Observable.of(PROMOTIONS.filter(promotion => promotion.id === id)[0]);
  }

  getFeaturedPromotion(): Observable<Promotion>{
    return this._http.get<Promotion[]>(baseURL + 'promotions').map(promotions => promotions.filter(promotion => promotion.featured)[0]);
    //return Observable.of(PROMOTIONS.filter(promotion => promotion.featured)[0]);
  }

}
