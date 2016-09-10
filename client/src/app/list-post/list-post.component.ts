import {Component, OnInit, Input, AfterViewChecked, AfterViewInit} from '@angular/core';
import {PostService} from '../service/index';
import {Post} from '../post';
import {Angular2AutoScroll} from 'angular2-auto-scroll/lib/angular2-auto-scroll.directive';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-list-post',
    templateUrl: 'list-post.component.html',
    styleUrls: ['list-post.component.css'],
    directives: [Angular2AutoScroll]
})
export class ListPostComponent implements OnInit, AfterViewChecked, AfterViewInit {
    // phải khai báo input thì mới nhận được biến hero từ file khác gọi sang
    // @Input() hero: Hero;
    // bên app.component truyền sang biến hero thì bên này cũng phải khai báo biến là hero đẻ nhận
    // @Input('$var$') varAlias: Object;
    @Input('page') numberPage: number = 1;
    posts: Post[] = [];
    hashPage: number = 1;

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        if (location.hash != "" && !isNaN(parseInt(location.hash.replace('#', '')))) {
            this.hashPage = parseInt(location.hash.replace('#', ''));
        }
        $('.preload-image').lazyload({
            threshold: 100,
            effect: 'fadeIn',
            container: $('#page-content-scroll')
        });

        this.postService.getPosts(this.numberPage)
            .then(response => {
                console.log(response);
                this.posts = response;
            });
    }

    ngAfterViewChecked(): void {
        // $('body').animate({
        //     scrollTop: $(".container").height()
        // }, 2000);
        // window.scrollTo(0, $(".container").height());
    }

    ngAfterViewInit(): void {
        console.log('start');
        setTimeout(function () {
            console.log('run');
            $('body').animate({
                scrollTop: $(".container").height()
            }, 1000);
        }, 500);
    }
}
