import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/index';
import {Post} from '../post';
import {Angular2AutoScroll} from "angular2-auto-scroll/lib/angular2-auto-scroll.directive";
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-list-post',
    templateUrl: 'list-post.component.html',
    styleUrls: ['list-post.component.css'],
    directives: [Angular2AutoScroll]
})
export class ListPostComponent implements OnInit {
    posts:Post[] = [];

    constructor(private postService:PostService) {
    }

    ngOnInit(): void {
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
