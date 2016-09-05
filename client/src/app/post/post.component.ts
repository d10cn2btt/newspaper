import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {PostService} from '../service/index';

@Component({
    moduleId: module.id,
    selector: 'app-post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.css'],
})
export class PostComponent implements OnInit {

    constructor(private postService: PostService, private route: ActivatedRoute, public router: Router) {
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);

        this.route.params.forEach((params: Params) => {
            if (params['slug'] !== undefined) {
                // Route parameters are always strings.
                // So we convert the route parameter value to a number with the JavaScript (+) operator
                let slug = params['slug'];
                console.log(this.postService.getIdPostFromUrl(slug));

            } else {
                this.router.navigate(['dasboard', {}, {position: (0, 600)}]);
            }
        });
    }
}
