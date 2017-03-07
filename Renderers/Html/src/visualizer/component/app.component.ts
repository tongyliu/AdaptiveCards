import {Component, OnInit, AfterViewInit, AfterViewChecked,
ChangeDetectionStrategy, ChangeDetectorRef,
ViewChild, OnDestroy} from '@angular/core';
import {HostApp} from '../App';
import {CardRendererComponent} from './card-renderer.component';
import {Observable, Subscription} from 'rxjs/Rx';
import {DataTransferService} from './DataTransferService';

@Component({
  selector: 'adaptive-cards',
  templateUrl: './component/app.html',
  providers: [HostApp, DataTransferService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdaptiveCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CardRendererComponent) cardRenderer:CardRendererComponent;
  valueSubscription:Subscription;

  constructor(private host:HostApp, 
              private cdRef:ChangeDetectorRef, 
              private transferService:DataTransferService) {}

  ngAfterViewInit() {
    this.host.initialize();
    let schemaElement = this.host.schemaParentElement();
    let strokes = Observable.fromEvent<Event>(schemaElement.getSession(), 'change');
    let valueObservable = strokes.map(event => schemaElement.getValue() as string);
    this.valueSubscription = valueObservable.subscribe(enteredValue => this.callRenderer(enteredValue));
    this.callRenderer(this.host.schemaParentElement().getValue());
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
