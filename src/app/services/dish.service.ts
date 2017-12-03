import { Injectable } from '@angular/core';

import { DISHES } from "../shared/Dishes";
import { Dish } from "../shared/dish";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/of";

@Injectable()
export class DishService {

  constructor() { }

  getDishes():Observable<Dish[]>  {
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id:number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => dish.id === id)[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return Observable.of(DISHES.filter(dish => dish.featured === true)[0]);
  }

  getDishIds(): Observable<number[]> {
    return Observable.of(DISHES.map(dish => dish.id)).delay(2000);
  }

}
