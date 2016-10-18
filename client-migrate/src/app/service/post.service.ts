import {Injectable} from '@angular/core';
// vì thằng Observable không có toPromise nên phải import hằng operator mà đã extend Observable
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';

import {Post} from '../post';

@Injectable()
export class PostService {
    private numberPerPage = 5;
    private DomainUrl = 'https://server-newspaper.herokuapp.com/api';
    private listPostUrl = this.DomainUrl + '/get-posts/';
    private detailPostUrl = this.DomainUrl + '/get-post-detail/';

    constructor(private http: Http) {
    }

    getPosts(start, page): Promise<Post[]> {
        var url = this.listPostUrl + start * this.numberPerPage + "/" + page * this.numberPerPage;
        return this.http.get(url)
            .toPromise()
            .then(
                response => response.json()
            )
            .catch(this.handleError);
    }

    getDetailPost(idPost): Promise<Post[]> {
        var url = this.detailPostUrl + idPost;
        return this.http.get(url)
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
