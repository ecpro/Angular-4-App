import { Injectable } from '@angular/core';
import "rxjs/add/operator/delay";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { DISHES } from "../shared/Dishes";
import { Dish } from "../shared/dish";
import { baseURL } from "../shared/baseURL";

@Injectable()
export class DishService {

  dishes: Dish[];

  constructor(private _http:HttpClient) { }

  getDishes():Observable<Dish[]>  {
    return this._http.get<Dish[]>(baseURL+'dishes');
    //return Observable.of(DISHES).delay(2000);
  }

  getDish(id:number): Observable<Dish> {
    return this._http.get<Dish>(baseURL+'dishes/'+id);
    //return Observable.of(DISHES.filter((dish) => dish.id === id)[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    // don't know how this is working ?
    return this._http.get<Dish[]>(baseURL + 'dishes').map(dishes => dishes.filter(dish => dish.featured)[0]);
    //return Observable.of(DISHES.filter(dish => dish.featured === true)[0]);
  }

  getDishIds(): Observable<number[]> {
    return this._http.get<Dish[]>(baseURL+'dishes').map(dishes => dishes.map(dish => dish.id));
    //return Observable.of(DISHES.map(dish => dish.id)).delay(2000);
  }

}
