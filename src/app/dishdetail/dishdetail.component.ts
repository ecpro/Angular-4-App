import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../shared/comments";

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

  commentsForm:FormGroup;
  comment: Comment;

  formErrors  = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      required: "Author name can't be empty.",
      minlength: 'Author name should at least be 4 char long',
      maxlength: 'Auther name cannot be more than 24 chars'
    },
    'comment': {
      required: 'Comment cannot be empty'
    }
  }

  constructor(private _dishService:DishService, private _route: ActivatedRoute, private _location:Location, private _fb:FormBuilder) {
    this.createForm();
    console.log(this.commentsForm);
   }

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

  createForm() {
    this.commentsForm = this._fb.group({
      'author': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      'rating': ['5'],
      'comment': ['', Validators.required],
    });

    this.commentsForm.valueChanges.subscribe(data => this.onValueChanges(data));
  }

  onValueChanges(data?:any) {
    if(!this.commentsForm) return;
    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.commentsForm.get(field);
      if(control && control.dirty && control.invalid) {
        const message = this.validationMessages[field];
        for(const error in control.errors) {
          this.formErrors[field] += message[error] + '';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentsForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.commentsForm.reset();
    console.log(this.comment);
    console.log(this.commentsForm);
  }

}

