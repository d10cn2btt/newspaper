import {Injectable} from '@angular/core';
//vì thằng Observable không có toPromise nên phải import hằng operator mà đã extend Observable
import 'rxjs/add/operator/toPromise';
import {Headers, Http} from '@angular/http';

import {Post} from '../post';

@Injectable()
export class PostService {
    private numberPerPage = 5;
    private postUrl = 'https://server-newspaper.herokuapp.com/api/get-posts/' + this.numberPerPage;

    constructor(private http:Http) {
    }

    getPosts():Promise<Post[]> {
        return this.http.get(this.postUrl)
            .toPromise()
            .then(
                response => response.json()
            )
            .catch(this.handleError);
    }
    
    getIdPostFromUrl(url: string) {
        var patt = /^([a-z-]{1,})-([0-9]*).(.*)$/;
        var result = url.match(patt);
        return result[2];
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}