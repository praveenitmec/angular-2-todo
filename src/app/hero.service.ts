import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:4000/api/v1/';  // URL to web api

    constructor(private http: Http) { }

    private headers = new Headers({ 'Authorization': 'Bearer ' +
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlfa2V5Ijo'+
    'iUkY3MEY0eXlxWEV6ZE1na2xxS1FMQXR0IiwiZXhwIjoxNDkwNzE1N'+
    'jkzLCJpc3MiOiJwcmF2ZWVuX3NlcnZlciIsImF1ZCI6InByYXZlZW5fY2'+
    'xpZW50In0.p3CmtVQQPoJ9ELB7_6i17qGPOJhcEbjJIrnDUSWBTrU', 'Content-Type': 'application/json'});

    private getHeaders(): RequestOptions {
       return new RequestOptions({ headers: this.headers });
    }

    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}todos/${hero.id}`;
      return this.http
        .put(url, JSON.stringify(hero), this.getHeaders())
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
    }

    addHero(name: string): Promise<Hero> {
      const url = `${this.heroesUrl}todos`;
      return this.http
        .post(url, JSON.stringify({name: name}), this.getHeaders())
        .toPromise()
        .then((response: Response) => response.json() as Hero)
        .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.heroesUrl}todos/${id}`;
      return this.http.delete(url, this.getHeaders())
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    getHeroes(): Promise<Hero[]> {
      return this.http.get(this.heroesUrl+'todos', this.getHeaders())
                 .toPromise()
                 .then((response: Response) => response.json() as Hero[])
                 .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
      return this.http.get(this.heroesUrl+'todos/'+id, this.getHeaders())
               .toPromise()
               .then((response: Response) => response.json() as Hero)
               .catch(this.handleError);
    }
}
