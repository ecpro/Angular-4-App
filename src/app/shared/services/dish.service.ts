import { Injectable } from '@angular/core';

import { DISHES } from "../Dishes";
import { Dish } from "../dish";

@Injectable()
export class DishService {

  constructor() { }

  getDishes():Dish[]  {
    return DISHES;
  }

}
