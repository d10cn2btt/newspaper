import {Component} from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app works!';

    constructor(public router: Router) {
    }

    gotoHomepage() {
        let anchor = location.hash.replace('#', '');
        this.router.navigate(['homepage'], {fragment: anchor});
    }
}
