import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class DataTransferService{

    _subject:BehaviorSubject<JSON> = new BehaviorSubject<JSON>(JSON.parse('{}'));

    get SchemaSubject(): BehaviorSubject<JSON>
    {
        return this._subject;
    }
}