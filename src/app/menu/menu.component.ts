import { Component, OnInit } from '@angular/core';

import { Dish } from "../shared/dish";
import { DishService } from "../shared/services/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish: Dish;

  constructor(private _dishService: DishService) { }

  ngOnInit() {
    this.dishes = this._dishService.getDishes();
  }

  onSelect(dish:Dish){
    this.selectedDish = dish;
  }

}
