import {Component, OnInit, Compiler, ViewContainerRef, ViewChild, ComponentRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
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
    posts:Post[] = [];
    @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
    private componentFactory: ComponentFactory<any>;

    constructor(componentFactoryResolver: ComponentFactoryResolver, compiler: Compiler, private postService:PostService) {
        this.componentFactory = componentFactoryResolver.resolveComponentFactory(ListPostComponent);
        //this.componentFactory = compiler.compileComponentSync(PostComponent);
    }

    getMorePosts () {
        this.viewContainerRef.createComponent(this.componentFactory, 0);
    }
    
    ngOnInit():void {
    }
}
