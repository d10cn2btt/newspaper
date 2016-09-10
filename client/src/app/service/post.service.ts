import {Injectable} from '@angular/core';
// vì thằng Observable không có toPromise nên phải import hằng operator mà đã extend Observable
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';

import {Post} from '../post';

@Injectable()
export class PostService {
    private numberPerPage = 5;
    private postUrl = 'https://server-newspaper.herokuapp.com/api/get-posts/';

    constructor(private http: Http) {
    }

    getPosts(page): Promise<Post[]> {
        return this.http.get(this.postUrl + this.numberPerPage * page)
                   .toPromise()
                   .then(
                       response => response.json()
                   )
                   .catch(this.handleError);
    }

    getIdPostFromUrl(url: string) {
        let reg = /([a-zA-Z-]{1,})-([0-9]{1,}).html$/g;
        let result = reg.exec(url);
        return result[2];
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
