import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {routing} from './app.routing';
import {PostService} from './service/index';
import {UrlPipe} from './pipe/index';
import {PostComponent} from './post/post.component';
import {ListPostComponent} from './list-post/list-post.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UrlPipe,
        PostComponent,
        ListPostComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        PostService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
