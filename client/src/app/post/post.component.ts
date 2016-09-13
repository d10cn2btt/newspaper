import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {PostService} from '../service/index';
import {Post} from "../post";
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'app-post',
    templateUrl: 'post.component.html',
    // styleUrls: ['post.component.css'],
})
export class PostComponent implements OnInit {
    post: Post[] = [];
    myMoment = moment;
    testHtml = '<h3>abc123</h3>';

    constructor(private postService: PostService, private route: ActivatedRoute, public router: Router) {
    }

    ngOnInit(): void {
        var time = '2016-09-11T11:18:26.308Z';
        window.scrollTo(0, 0);

        this.route.params.forEach((params: Params) => {
            if (params['slug'] !== undefined) {
                // Route parameters are always strings.
                // So we convert the route parameter value to a number with the JavaScript (+) operator
                let slug = params['slug'];
                let idPost = this.postService.getIdPostFromUrl(slug);
                this.postService.getDetailPost(idPost)
                    .then(response => {
                        this.post = response;
                    });
            } else {
                this.router.navigate(['dasboard', {}, {position: (0, 600)}]);
            }
        });
    }
}
