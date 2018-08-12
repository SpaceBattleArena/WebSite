import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//data
import { Hero } from '../models/hero';

@Injectable()
export class HerosService {
  private apiUrl = 'http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/';

  constructor(private http: Http) {}

  public getAll() {
    let hero_1 = new Hero();
    hero_1.ID = 1;
    hero_1.Faction_id = 1;
    hero_1.Name = 'Human';
    hero_1.Image = this.apiUrl + 'articles/hero_icon1.png';

    let hero_2 = new Hero();
    hero_2.ID = 2;
    hero_2.Faction_id = 2;
    hero_2.Name = 'Rebel';
    hero_2.Image = this.apiUrl + 'articles/hero_icon2.png';
    
    let hero_3 = new Hero();
    hero_3.ID = 3;
    hero_3.Faction_id = 1;
    hero_3.Name = 'Cyborg';
    hero_3.Image = this.apiUrl + 'articles/hero_icon3.png';
    
    return [
        hero_1,
        hero_2,
        hero_3,
    ]
  }
}
