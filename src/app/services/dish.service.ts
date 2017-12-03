import { Injectable } from '@angular/core';

import { DISHES } from "../shared/Dishes";
import { Dish } from "../shared/dish";

@Injectable()
export class DishService {

  constructor() { }

  getDishes():Dish[]  {
    return DISHES;
  }

  getDish(id:number): Dish {
    return DISHES.filter((dish) => dish.id === id)[0];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter(dish => dish.featured === true)[0];
  }

}
