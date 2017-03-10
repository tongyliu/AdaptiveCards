import {Component, AfterViewInit, OnDestroy,
        Output, EventEmitter, ViewEncapsulation, 
        ViewChild, ElementRef
} from '@angular/core';
import {HostAppService} from './app.service';
import {DataTransferService} from './data-transfer.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'card-renderer',
  styleUrls: ['../../../css/outlookConnectorCard.css'],
  encapsulation: ViewEncapsulation.Native,
  template: `
    <div #content class="markupRender"></div>
    <div #popupCardContainer style="margin-top: 30px; padding: 10px; border: 1px solid #EEEEEE;">
        <div>ActionShowCard popups will appear in this box, according to container settings</div>
    </div>
    `
})
export class CardRendererComponent implements AfterViewInit, OnDestroy {
    
    @ViewChild('content') contentDiv:ElementRef
    @ViewChild('popupCardContainer') popupCardContainerDiv:ElementRef  

    @Output('execute-action') execute = new EventEmitter<Array<any>>();
    
    _dataSubscription: Subscription;
    IsCardRendered:boolean;

    constructor(private host:HostAppService, private transferService:DataTransferService) {
        this.IsCardRendered = false;
    }

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
        if (Object.keys(schema).length == 0){
            return;
        }

        try
        {
            let cardNode =  this.host.renderCardHelper(schema, (a: any, args: any) => { 
            this.emitActionTriggered(a, args);
            });
            this.contentDiv.nativeElement.innerHTML = '';
            this.contentDiv.nativeElement.appendChild(cardNode);
            this.IsCardRendered = true;
        }catch (Exception){
            console.log("parsing and rendering failed");
            this.contentDiv.nativeElement.innerHTML = '';
            this.IsCardRendered = false;
        }       
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