import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from '@angular/router';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app works!btt';

    constructor(public router:Router) {

    }

    ngOnInit() {
        $(".preload-image").lazyload({
            threshold: 100,
            effect: "fadeIn",
            container: $("#page-content-scroll")
        });
        $('#page-content, .landing-page').addClass('fadeIn show-containers');
        $(".loading").remove();
    }
    gotoHomepage() {
        this.router.navigate(['homepage']);
    }
}
