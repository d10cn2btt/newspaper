import {Component, OnInit, Input, AfterViewChecked, AfterViewInit} from '@angular/core';
import {PostService} from '../service/index';
import {Post} from '../post';
declare var $: any;

@Component({
    selector: 'app-list-post',
    templateUrl: './list-post.component.html',
    styleUrls: ['./list-post.component.scss'],
})
export class ListPostComponent implements OnInit, AfterViewChecked, AfterViewInit {
    // phải khai báo input thì mới nhận được biến hero từ file khác gọi sang
    // @Input() hero: Hero;
    // bên app.component truyền sang biến hero thì bên này cũng phải khai báo biến là hero đẻ nhận
    // @Input('$var$') varAlias: Object;
    // @Input('page') numberPage: number = 1;
    
    @Input('reloadPage') reloadPage: boolean;
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

        let start, page: number;
        if (this.reloadPage == true) {
            start = 0;
            page = this.hashPage;
        } else {
            start = this.hashPage - 1;
            page = 1;
        }

        this.postService.getPosts(start, page)
            .then(response => {
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
        setTimeout(function () {
            $('body').animate({
                scrollTop: $(".container").height()
            }, 1000);
        }, 500);
    }
}
