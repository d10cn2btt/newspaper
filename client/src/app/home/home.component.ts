import {Component, OnInit} from '@angular/core';

import {PostService} from '../service/index';
import {Post} from '../post';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [PostService]
})
export class HomeComponent implements OnInit {
    posts:Post[] = [];

    constructor(private postService:PostService) {
    }

    ngOnInit():void {
        $(".preload-image").lazyload({
            threshold : 100,
            effect : "fadeIn",
            container: $("#page-content-scroll")
        });
        this.postService.getPosts()
            .then(response => {
                console.log(response);
                this.posts = response;
            });
    }
}
