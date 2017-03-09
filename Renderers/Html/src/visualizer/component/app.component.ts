import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
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
    <card-header></card-header>
    <div class="adaptiveContainer">
        <div class="editorPane">
          <card-editor></card-editor>
        </div>
        <div class="rendererPane">
          <card-renderer (execute-action)="actionHandler($event)"></card-renderer>
        </div>
    </div>
</div>
  `,
  providers: [HostAppService, DataTransferService]
})
export class AdaptiveCardComponent {
  
  @ViewChild(CardRendererComponent) cardRenderer:CardRendererComponent;
  @ViewChild(CardEditorComponent) cardEditor:CardEditorComponent;
  
  constructor(private host:HostAppService, 
              private transferService:DataTransferService) {}

  actionHandler(event:Array<any>){
      console.log("action handler triggered with", ...event);
  }
}
