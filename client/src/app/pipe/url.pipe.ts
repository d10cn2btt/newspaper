import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'url'
})
export class UrlPipe implements PipeTransform {

    transform(value:string, args?:any):any {
        var arUrl = value.split('/');
        return _.last(arUrl);
    }

}
