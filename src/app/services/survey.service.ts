import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams, Headers, RequestOptions } from "@angular/http";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Survey } from "../models/survey";

@Injectable()
export class SurveyService {

    private _postsURL = "http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/";

    constructor(private http: Http) {
    }

    add(survey:Survey) {
        let data = new URLSearchParams();
        data.append("device", survey.device);
        data.append("question1", survey.question1);
        data.append("question2", survey.question2.toString());
        data.append("question3", survey.question3);
        data.append("question4", survey.question4);
        data.append("question5", survey.question5.toString());
        data.append("question6", survey.question6.toString());
        data.append("question7", survey.question7.toString());
        data.append("question8", survey.question8.toString());
        data.append("question9", survey.question9.toString());
        data.append("question10", survey.question10.toString());
        return this.http
            .post(this._postsURL + "survey/add", data)
            .map((response: Response) => {
                console.log(response.json());
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}