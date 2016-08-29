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

    showLeftSidebar() {
        $('.sidebar-scroll-left').toggleClass('perspective-left');
        $('.sidebar-left').toggleClass('perspective-2-left');
        $('.page-content, .header, .footer-menu, .material-menu').toggleClass('perspective-3-left');
        $('.share-bottom-tap-close').removeClass('share-bottom-tap-close-active');
        $('.share-bottom').removeClass('active-share-bottom');
        $('.show-header-menu, .show-modal-menu').toggleClass('no-pointer');
        $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
        $('.header-menu').toggleClass('no-visibility');
        $('.header-menu-overlay').hide();
        $('.header-menu').removeClass('header-menu-active');
        $('.show-header-menu').removeClass('header-rotate');
    }
}
