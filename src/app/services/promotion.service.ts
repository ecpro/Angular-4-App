import { Injectable } from '@angular/core';

import { PROMOTIONS } from "../shared/promotions";
import { Promotion } from "../shared/promotion";

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(PROMOTIONS);
      }, 2000);
    })
  }

  getPromotion(id:Number): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(PROMOTIONS.filter(promotion => promotion.id === id)[0]);
      }, 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion>{
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(PROMOTIONS.filter(promotion => promotion.featured)[0]);
      }, 2000);
    });
  }

}
