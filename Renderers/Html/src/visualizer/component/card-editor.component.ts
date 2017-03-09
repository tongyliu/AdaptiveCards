import {Component, AfterViewInit, OnDestroy,
        Output, EventEmitter,
        ViewChild, ElementRef
} from '@angular/core';
import {HostAppService} from './app.service';
import {Observable, Subscription} from 'rxjs/Rx';
import {DataTransferService} from './data-transfer.service';

@Component({
  selector: 'card-editor',
  template: `
    <div #editor>
    </div>
  `,
})
export class CardEditorComponent implements AfterViewInit, OnDestroy {

    @ViewChild('editor') editorDiv:ElementRef
    _schemaEditor: any;
    _dataSubscription:Subscription;

    constructor(private host:HostAppService, private transferService:DataTransferService)
    {}

    ngAfterViewInit() {
        this._schemaEditor = this.host.renderEditor(this.editorDiv.nativeElement);
        let strokes = Observable.fromEvent<Event>(this._schemaEditor.getSession(), 'change');
        let valueObservable = strokes.map(event => this._schemaEditor.getValue() as string);
        this._dataSubscription = valueObservable.subscribe(
            enteredValue => this.transferService.SchemaSubject.next(JSON.parse(enteredValue)));
    }    

    ngOnDestroy(){
        this._dataSubscription.unsubscribe();
    }
}