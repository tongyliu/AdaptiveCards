import {Component, OnInit, AfterViewInit, 
        Input, Output, EventEmitter, OnDestroy,
        ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {HostApp} from '../App';
import {DataTransferService} from './DataTransferService';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'card-renderer',
  templateUrl: './component/card-renderer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardRendererComponent implements AfterViewInit, OnDestroy {
    @Output('execute-action') execute = new EventEmitter<string>();
    _dataSubscription: Subscription;

    constructor(private host:HostApp, private transferService:DataTransferService) {}

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
        this.host.renderCardHelper(JSON.stringify(schema));
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