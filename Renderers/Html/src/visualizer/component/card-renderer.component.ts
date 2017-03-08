import {Component, OnInit, AfterViewInit, 
        Input, Output, EventEmitter, OnDestroy,
        ViewEncapsulation, ViewChild, ElementRef,
        ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {HostAppService} from './app.service';
import {DataTransferService} from './data-transfer.service';
import {Subscription} from 'rxjs/Rx';
import  {BING} from './styles/bing'

@Component({
  selector: 'card-renderer',
  templateUrl: './card-renderer.html',
  styles: [
    BING
  ],
  encapsulation: ViewEncapsulation.Native
})
export class CardRendererComponent implements AfterViewInit, OnDestroy {
    @ViewChild('content') contentDiv:ElementRef 
    @Output('execute-action') execute = new EventEmitter<Array<any>>();
    _dataSubscription: Subscription;

    constructor(private host:HostAppService, private transferService:DataTransferService) {}

    ngAfterViewInit() {
        this._dataSubscription = this.transferService.SchemaSubject.subscribe(
            jsonValue =>
            {
                this.renderCard(jsonValue);
            },
            error => 
            {
                this.handleError(error);
            },
            () => 
            {
                this.handleComplete();
            });
    }

    ngOnDestroy(){
        this._dataSubscription.unsubscribe();
    }

    renderCard(schema: JSON)
    {
        let cardNode =  this.host.renderCardHelper(schema, (a: any, args: any) => { 
            this.emitActionTriggered(a, args);
        });
        this.contentDiv.nativeElement.innerHTML = '';
        this.contentDiv.nativeElement.appendChild(cardNode);
    }

    emitActionTriggered(action:any, actionParams:any)
    {
        this.execute.emit([action, actionParams]);
    }

    handleError(err:any)
    {
        console.log("DTO error");
    }

    handleComplete()
    {
        console.log("DTO completes");
    }
}