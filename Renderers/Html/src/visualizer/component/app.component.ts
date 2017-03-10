import {Component, ViewChild, ViewEncapsulation,
        Output, EventEmitter
} from '@angular/core';
import {HostAppService} from './app.service';
import {CardRendererComponent} from './card-renderer.component';
import {CardEditorComponent} from './card-editor.component';
import {Observable, Subscription} from 'rxjs/Rx';
import {DataTransferService} from './data-transfer.service';

@Component({
  selector: 'adaptive-cards',
  styleUrls: ['../../../css/adaptiveContainer.css'],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
<div class="uiRoot">
    <div class="adaptiveContainer">
        <div class="editorPane">
          <card-editor></card-editor>
        </div>
        <div class="rendererPane">
          <card-renderer (execute-action)="actionHandler($event)"></card-renderer>
          <button [hidden]="!cardRenderer.IsCardRendered" (click)="saveHandler($event)"> Save </button>
        </div>
    </div>
</div>
  `,
  providers: [HostAppService, DataTransferService]
})
export class AdaptiveCardComponent {
  
  @ViewChild(CardRendererComponent) cardRenderer:CardRendererComponent;
  @ViewChild(CardEditorComponent) cardEditor:CardEditorComponent;
  @Output('save-json') saveJson = new EventEmitter<JSON>();
  @Output('action-event') actionEvent = new EventEmitter<Array<any>>();
  
  constructor(private host:HostAppService, 
              private transferService:DataTransferService) {}

  actionHandler(actionEvent:Array<any>){
      console.log("action handler triggered with", ...actionEvent);
      this.actionEvent.emit(actionEvent);
  }

  saveHandler(clickEvent: MouseEvent)
  {
    console.log("save handler", clickEvent);
    this.saveJson.emit(this.transferService.SchemaSubject.getValue());
  }
}
