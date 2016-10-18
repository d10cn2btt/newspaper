import {Component, OnInit, Compiler, ViewContainerRef, ViewChild, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {PostService} from '../service/index';
import {Post} from '../post';
import {ListPostComponent} from '../list-post/list-post.component';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    posts: Post[] = [];
    hashPage: number = 1;
    /**
     * When reload page, get all article from start = 0
     * When click more article, get 5 article from hashPage * 5
     * @type {boolean}
     */
    reloadPage: boolean = true;
    @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
    private componentFactory: ComponentFactory<any>;

    // constructor(componentFactoryResolver: ComponentFactoryResolver, compiler: Compiler, private postService: PostService) {
    //     this.componentFactory = componentFactoryResolver.resolveComponentFactory(ListPostComponent);
    //     // this.componentFactory = compiler.compileComponentSync(PostComponent);
    // }

    ngOnInit(): void {
        if (location.hash != "" && !isNaN(parseInt(location.hash.replace('#', '')))) {
            this.hashPage = parseInt(location.hash.replace('#', ''));
        }
    }

    /**
     * When click view more article
     * Increase hash in url
     * Set reloadPage = false
     */
    getMorePosts() {
        this.hashPage++;
        this.reloadPage = false;
        location.hash = '#' + this.hashPage;
        // Tham số thứ 2 của hàm createComponent
        // nếu là 0 thì là append ngay phía dưới container
        // để mặc định như thế này là append phía dưới cùng của đống child
        this.viewContainerRef.createComponent(this.componentFactory);
    }

}
