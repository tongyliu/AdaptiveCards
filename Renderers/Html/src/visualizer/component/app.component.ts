import {Component, OnInit, AfterViewInit, AfterViewChecked,
ChangeDetectionStrategy, ChangeDetectorRef,
ViewChild, OnDestroy} from '@angular/core';
import {HostAppService} from './app.service';
import {CardRendererComponent} from './card-renderer.component';
import {Observable, Subscription} from 'rxjs/Rx';
import {DataTransferService} from './data-transfer.service';

@Component({
  selector: 'adaptive-cards',
  templateUrl: './component/app.html',
  providers: [HostAppService, DataTransferService]
})
export class AdaptiveCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CardRendererComponent) cardRenderer:CardRendererComponent;
  valueSubscription:Subscription;

  constructor(private host:HostAppService, 
              private cdRef:ChangeDetectorRef, 
              private transferService:DataTransferService) {}

  ngAfterViewInit() {  
    let schemaElement = this.host.renderEditor();
    let strokes = Observable.fromEvent<Event>(schemaElement.getSession(), 'change');
    let valueObservable = strokes.map(event => schemaElement.getValue() as string);
    this.valueSubscription = valueObservable.subscribe(enteredValue => this.callRenderer(enteredValue));
    this.callRenderer(schemaElement.getValue());
  }

  ngOnDestroy(){
    this.valueSubscription.unsubscribe();
  }

  callRenderer(schemaText: string)
  {
    console.log("parent calling renderer");
    this.transferService.SchemaSubject.next(JSON.parse(schemaText));
  }

  actionHandler(event:Array<any>){
      console.log("action handler triggered with", ...event);
  }
}
