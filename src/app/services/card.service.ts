import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from "@angular/http";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

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
                return response.json();
            })
            .catch(this.handleError);
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
                return response.json();
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
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}