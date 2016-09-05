/**
 * Created by Truongbt on 22-Aug-16.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {HomeComponent} from './home';
import {routing} from './app.routing';
import {PostComponent} from './post/index';
import {PostService} from './service/index';
import {AppComponent} from './app.component';
import {UrlPipe} from './pipe/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PostComponent,
        UrlPipe,
    ],
    providers: [
        PostService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
