import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private heroesUrl = 'http://localhost:4000/api/v1/';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
      return this.http.get(this.heroesUrl+'todos')
                 .toPromise()
                 .then(response => JSON.parse(response._body) as Hero[])
                 .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
      return this.http.get(this.heroesUrl+'todos/'+id)
               .toPromise()
               .then(response => JSON.parse(response._body) as Hero)
               .catch(this.handleError);
    }
}
