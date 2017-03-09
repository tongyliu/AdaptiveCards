import {Component} from '@angular/core';

@Component({
  selector: 'card-header',
  template: `
  <div class="uiHeader" style="display: flex;">
    <div style="margin:4px;">Samples:</div>
    <a href="https://github.com/Microsoft/AdaptiveCards/tree/master/samples/Proposed/TextBlock" target="_blank" style="margin:4px">TextBlock</a>
    <a href="https://github.com/Microsoft/AdaptiveCards/tree/master/samples/Proposed/Scenarios" target="_blank" style="margin:4px">Scenarios</a>
    
    <div class="leftPane">
        <div style="width: 0px; height: 0px; overflow: hidden">
            <input type="file" id="filePicker" />
        </div>
        <div id="loadSample" class="button" style="height: 100%; float:left; display: table;">Load sample from file...</div>
    </div>
    <div class="rightPane">
        <span style="margin-right: 6px;">Select a container:</span>
        <select id="hostContainerPicker" style="height: 100%;"></select>
    </div>
  </div>`,
})
export class CardHeaderComponent {
    constructor(){}

}