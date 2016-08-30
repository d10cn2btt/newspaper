import {Component, OnInit, Compiler, ViewContainerRef, ViewChild, ComponentRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {PostService} from '../service/index';
import {Post} from '../post';
import {PostComponent} from '../post/index';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    entryComponents: [PostComponent]
})
export class HomeComponent implements OnInit {
    posts:Post[] = [];
    @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
    private componentFactory: ComponentFactory<any>;

    constructor(componentFactoryResolver: ComponentFactoryResolver, compiler: Compiler, private postService:PostService) {
        this.componentFactory = componentFactoryResolver.resolveComponentFactory(PostComponent);
        //this.componentFactory = compiler.compileComponentSync(PostComponent);
    }

    addItem () {
        this.viewContainerRef.createComponent(this.componentFactory, 0);
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
