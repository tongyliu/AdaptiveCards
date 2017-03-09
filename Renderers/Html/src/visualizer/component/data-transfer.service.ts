import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class DataTransferService{

    _subject:Subject<JSON> = new Subject<JSON>();

    get SchemaSubject(): Subject<JSON>
    {
        return this._subject;
    }
}