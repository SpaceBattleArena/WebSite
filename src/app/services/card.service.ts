import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from "@angular/http";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { Deck } from '../models/deck';

@Injectable()
export class CardService {
    private _postsURL = "http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/";

    constructor(private http: Http) { }

    getCards(token: string) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        let options = new RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "cards", options)
            .map((response: Response) => {
                let results = response.json();
                if (results['results'] != undefined) {
                    results = results['results'];
                    if (results['cards'] != undefined) {
                        return results['cards'];
                    } else {
                        return [];
                    }
                } else {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    getAll() {
        return this.http
            .get(this._postsURL + "cards/getAll")
            .map((response: Response) => {
                let results = response.json();
                    if (results['results'] != undefined) {
                        results = results['results'];
                        if (results['data'] != undefined) {
                            return results['data'];
                        } else {
                            return [];
                        }
                    } else {
                        return [];
                    }
            })
    }

    getDecks(token: string) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        let options = new RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "deck", options)
            .map((response: Response) => {
                let results = response.json();
                if (results['decks'] != undefined) {
                    return results['decks'];
                } else {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    getRank(token: string) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        let options = new RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "player/getRank", options)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    buyBooster(token: string) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        let options = new RequestOptions({ headers: add_headers });
        return this.http
            .post(this._postsURL + "booster/buy", '', options)
            .map((response: Response) => {
                response = response.json();
                if (response["results"] != undefined) {
                    response = response["results"];
                    return response["cards"];
                }
                else {
                    return null;
                }
            })
            .catch(this.handleError);
    }

    public createDeck(deck: Deck, token) {
        return Observable.create(observer => {
          let access = false;
          let add_headers = new Headers();
          add_headers.append('Authorization', token);
    
          let datas = {
            hero_id: deck.Hero_id.toString(),
            name: deck.Name.toString(),
            deck: [deck.Card_1_id, deck.Card_2_id, deck.Card_3_id, deck.Card_4_id, deck.Card_5_id,
            deck.Card_6_id, deck.Card_7_id, deck.Card_8_id, deck.Card_9_id, deck.Card_10_id,
            deck.Card_11_id, deck.Card_12_id, deck.Card_13_id, deck.Card_14_id, deck.Card_15_id,
            deck.Card_16_id, deck.Card_17_id, deck.Card_18_id, deck.Card_19_id, deck.Card_20_id]
          }
    
          let options = new RequestOptions();
          options.headers = add_headers;
          this.http.post(this._postsURL + 'deck/create', datas, options)
            .toPromise()
            .then(
              res => {
                res = res.json();
                if (res['results']['status'] === 201) {
                  observer.next('ok');
                } else if (res['results']['status'] === 403) {
                  observer.next(res['results']['error']);
                }
                observer.complete();
              }
            );
        })
      }
    
      public modifyDeck(id: Number, deck: Deck, token) {
        return Observable.create(observer => {
          let access = false;
          let add_headers = new Headers();
          add_headers.append('Authorization', token);
    
          let datas = {
            hero_id: deck.Hero_id.toString(),
            name: deck.Name.toString(),
            deck: [deck.Card_1_id, deck.Card_2_id, deck.Card_3_id, deck.Card_4_id, deck.Card_5_id,
            deck.Card_6_id, deck.Card_7_id, deck.Card_8_id, deck.Card_9_id, deck.Card_10_id,
            deck.Card_11_id, deck.Card_12_id, deck.Card_13_id, deck.Card_14_id, deck.Card_15_id,
            deck.Card_16_id, deck.Card_17_id, deck.Card_18_id, deck.Card_19_id, deck.Card_20_id]
          }
    
          let options = new RequestOptions();
          options.headers = add_headers;
          this.http.put(this._postsURL + 'deck/' + id.toString() + '/update', datas, options)
            .toPromise()
            .then(
              res => {
                res = res.json();
                if (res['results']['status'] === 201) {
                  observer.next('ok');
                } else if (res['results']['status'] === 403) {
                  observer.next(res['results']['error']);
                }
                observer.complete();
              }
            );
        })
      }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}