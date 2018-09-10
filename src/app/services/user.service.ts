import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers, RequestOptions } from "@angular/http";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { User } from "../models/user";

@Injectable()
export class UserService {

    private _postsURL = "http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/";

    constructor(private http: Http) {
    }

    registration(user:string): Observable<User[]> {
        let data = new URLSearchParams();
        data.append("first_name", JSON.parse(user).first_name);
        data.append("last_name", JSON.parse(user).last_name);
        data.append("email", JSON.parse(user).email);
        data.append("password", JSON.parse(user).password);
        return this.http
            .post(this._postsURL + "signup", data)
            .map((response: Response) => {
                return <User[]>response.json();
            })
            .catch(this.handleError);
    }

    signin(user:string): Observable<User[]> {
        let data = new URLSearchParams();
        data.append("email", JSON.parse(user).email);
        data.append("password", JSON.parse(user).password);
        return this.http
            .post(this._postsURL + "signin", data)
            .map((response: Response) => {
                return <User[]>response.json();
            })
            .catch(this.handleError);
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    getInformation(token: string) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        add_headers.append('Accept', 'application/json');
        add_headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        add_headers.append('Access-Control-Allow-Origin', '*');
        add_headers.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
        let options = new RequestOptions({ headers: add_headers });
        return this.http
            .get(this._postsURL + "player/getInformation", options)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getAll() {
        return this.http
            .get(this._postsURL + "user/getAll")
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getById(id: number) {
        return this.http
            .get(this._postsURL + "user/getById?id=" + id.toString())
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    update(user: User, token) {
        let add_headers = new Headers();
        add_headers.append('Authorization', token);
        let body = {
            "userId": user.ID,
            "is_staff": user.Is_staff,
            "avatar": user.Avatar_id
        }
    
        let options = new RequestOptions();
        options.headers = add_headers;
        return this.http.put(this._postsURL + "user/update", body, options)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    delete(id: number) {
        let body = {
            "id": id
        }
        return this.http.delete(this._postsURL + "user/delete", {body: body})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    forgotPassword(email: string) {
        return this.http
            .get(/*this._postsURL + */"http://localhost:3000/player/forgotPassword/" + email)
            .map((response: Response) => {
                console.log(response.json());
                return response.json();
            })
            .catch(this.handleError);
    }

    updateForgotPassword(datas: {}) {
        let data = new URLSearchParams();
        data.append("email", datas["email"]);
        data.append("password", datas["password"]);
        data.append("code", datas["code"]);
        return this.http
            .post(this._postsURL + "player/updateNewPassword", data)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}