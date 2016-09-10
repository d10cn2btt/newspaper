import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app works!btt';

    constructor(public router: Router) {
    }

    ngOnInit() {
        $('.preload-image').lazyload({
            threshold: 100,
            effect: 'fadeIn',
            container: $('#page-content-scroll')
        });
        $('#page-content, .landing-page').addClass('fadeIn show-containers');
        $('.loading').remove();
    }

    gotoHomepage() {
        let anchor = location.hash.replace('#', '');
        this.router.navigate(['homepage'], {fragment: anchor});
    }
}
