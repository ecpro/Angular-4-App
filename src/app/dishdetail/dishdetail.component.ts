import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dishIds:number[];
  prev:number;
  next:number;
  dish:Dish;

  constructor(private _dishService:DishService, private _route: ActivatedRoute, private _location:Location) { }

  ngOnInit() {
    //let id = +this._route.snapshot.params['id'];
    this._dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this._route.params
    .switchMap((params: Params) => this._dishService.getDish(+params['id']))
    .subscribe(dish => {this.dish = dish ; this.setPrevNext(dish.id);});
  }

  goBack():void {
    this._location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

}

