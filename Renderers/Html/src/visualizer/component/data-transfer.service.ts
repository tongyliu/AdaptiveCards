import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class DataTransferService{

    _subject:Subject<JSON> = new Subject<JSON>();

    get SchemaSubject(): Subject<JSON>
    {
        return this._subject;
    }
}