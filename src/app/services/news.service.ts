import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Article } from '../models/article';

@Injectable()
export class ArticleService {
    private _postsURL = 'http://ec2-13-59-89-177.us-east-2.compute.amazonaws.com:3000/';
    articles: any[] = JSON.parse(localStorage.getItem('articles')) || [];

    constructor(private http: Http) {

    }

    getAll() {
        return this.http
            .get(this._postsURL + 'article/getAll')
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getById(id: number) {
        return this.http
            .get(this._postsURL + 'article/' + id.toString())
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getBySlug(slug: any) {
        return this.articles.filter(article => { return article.slug === slug ; });
    }

    create(new_article: Article) {
        let formData: FormData = new FormData();
        formData.append('title', new_article.Title);
        formData.append('description', new_article.Description.toString());
        formData.append('image', 'test');
        formData.append('articleImage', new_article.Slug);
        return this.http
            .post(this._postsURL + 'article/create', formData)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    update(article: Article) {
        let body = {
            'id': article.ID,
            'title': article.Title,
            'description': article.Description,
            'image': article.Image
        };
        return this.http.put(this._postsURL + 'article/update', body)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    delete(id: number) {
        let body = {
            'id': id
        };
        return this.http.delete(this._postsURL + 'article/delete', {body: body})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
