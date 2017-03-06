import {Component, OnInit, AfterViewInit, AfterViewChecked,
ChangeDetectionStrategy, ChangeDetectorRef,
ViewChild, OnDestroy} from '@angular/core';
import {HostApp} from '../App';
import {CardRendererComponent} from './card-renderer.component';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'adaptive-cards',
  templateUrl: './component/app.html',
  providers: [HostApp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdaptiveCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CardRendererComponent) cardRenderer:CardRendererComponent;
  schemaObj:JSON;
  valueSubscription:Subscription;

  constructor(private host:HostApp, private cd:ChangeDetectorRef) {}

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
    this.schemaObj = JSON.parse(schemaText);
    this.cd.markForCheck();
    // this.cardRenderer.renderCard(this.schemaObj);
  }

  actionHandler(event:string){
      console.log("action handler triggered with" + event);
  }
}
