import { Injectable } from '@angular/core';

import { DISHES } from "../shared/Dishes";
import { Dish } from "../shared/dish";

@Injectable()
export class DishService {

  constructor() { }

  getDishes():Promise<Dish[]>  {
    return new Promise((resolve) =>{
      setTimeout(() => {
        resolve(DISHES);
      }, 2000);
    });
  }

  getDish(id:number): Promise<Dish> {

    return new Promise(resolve => {
      setTimeout(function() {
        resolve(DISHES.filter((dish) => dish.id === id)[0]);
      }, 2000);
    })
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(DISHES.filter(dish => dish.featured === true)[0]);
      }, 2000);
    })
  }

}
