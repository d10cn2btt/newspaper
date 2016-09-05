import {Component, OnInit, Compiler, ViewContainerRef, ViewChild, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {PostService} from '../service/index';
import {Post} from '../post';
import {ListPostComponent} from '../list-post';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    entryComponents: [ListPostComponent]
})
export class HomeComponent implements OnInit {
    posts: Post[] = [];
    hashPage: number = 1;
    @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
    private componentFactory: ComponentFactory<any>;

    constructor(componentFactoryResolver: ComponentFactoryResolver, compiler: Compiler, private postService: PostService) {
        this.componentFactory = componentFactoryResolver.resolveComponentFactory(ListPostComponent);
        // this.componentFactory = compiler.compileComponentSync(PostComponent);
    }

    ngOnInit(): void {
        if (location.hash != "" && !isNaN(parseInt(location.hash.replace('#', '')))) {
            this.hashPage = parseInt(location.hash.replace('#', ''));
        }
    }

    getMorePosts() {
        this.hashPage++;
        location.hash = '#' + this.hashPage;
        this.viewContainerRef.createComponent(this.componentFactory, 0);
    }

}
