import {Component, OnInit, AfterViewInit, AfterViewChecked,
ChangeDetectionStrategy, ChangeDetectorRef,
ViewChild} from '@angular/core';
import {HostApp} from '../App';
import {CardRendererComponent} from './card-renderer.component';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'adaptive-cards',
  templateUrl: './component/app.html',
  providers: [HostApp],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdaptiveCardComponent implements AfterViewInit {
  @ViewChild(CardRendererComponent) cardRenderer:CardRendererComponent;
  schemaObj:JSON;
  
  constructor(private host:HostApp) {}

  ngAfterViewInit() {
    this.host.initialize();
    let schemaElement = this.host.schemaParentElement();
    let strokes = Observable.fromEvent<Event>(schemaElement.getSession(), 'change');
    let valueString = strokes.map(event => schemaElement.getValue() as string);
    valueString
        .subscribe(enteredValue => this.callRenderer(enteredValue));
    this.callRenderer(this.host.schemaParentElement().getValue());
  }

  callRenderer(schemaText: string)
  {
    this.schemaObj = JSON.parse(schemaText);
    this.cardRenderer.renderCard(this.schemaObj);
  }

  actionHandler(event:string){
      console.log("action handler triggered with" + event);
  }
}
