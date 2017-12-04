import { Injectable } from '@angular/core';
import { LEADERS } from "../shared/leaders";
import { Leader } from '../shared/leader';
import { baseURL } from "../shared/baseURL";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/toPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

@Injectable()
export class LeaderService {

  constructor(private _http:HttpClient) {}

  getLeaders():Observable<Leader[]> {
    return this._http.get<Leader[]>(baseURL + 'leaders');
    //return Observable.of(LEADERS).delay(2000);
  }

  getFeaturedLeader():Observable<Leader>{
    return this._http.get<Leader[]>(baseURL + 'leaders').map(leaders => leaders.filter(leader => leader.featured)[0]);
    //return Observable.of(LEADERS.filter(leader => leader.featured)[0]);
  }

  getLeader(id:number): Observable<Leader> {
    return this._http.get<Leader[]>(baseURL + 'leaders').map(leaders => leaders.filter(leader => leader.id === id)[0]);
    //return Observable.of(LEADERS.filter(leader => leader.id === id)[0]);
  }

}
