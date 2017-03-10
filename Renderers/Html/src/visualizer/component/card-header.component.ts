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

/*
    private hostContainerPicker: HTMLSelectElement;
    this.hostContainerPicker = <HTMLSelectElement>document.getElementById("hostContainerPicker");      

    renderWithStyleSheet() {
        let styleSheetLinkElement = <HTMLLinkElement>document.getElementById("adaptiveCardStylesheet");

        if (styleSheetLinkElement == null) {
            styleSheetLinkElement = document.createElement("link");
            styleSheetLinkElement.id = "adaptiveCardStylesheet";
            // TODO: Is this a bug? Won't previous style sheets stick around then?
            let headElement = document.getElementsByTagName("head")[0];
            headElement.appendChild(styleSheetLinkElement);
        }

        styleSheetLinkElement.rel = "stylesheet";
        styleSheetLinkElement.type = "text/css";
        styleSheetLinkElement.href = this.hostContainerOptions[this.hostContainerPicker.selectedIndex].hostContainer.styleSheet;
    }
    */

    /*
        if (this.hostContainerPicker) {
            this.hostContainerPicker.addEventListener("change", () => {
                // update the query string
                history.pushState(this.hostContainerPicker.value, `Visualizer - ${this.hostContainerPicker.value}`, `index.html?hostApp=${this.hostContainerPicker.value}`);

                this.renderSelectedHostApp();
            });

            for (let i = 0; i < this.hostContainerOptions.length; i++) {
                let option = document.createElement("option");
                option.value = this.hostContainerOptions[i].name;
                option.text = this.hostContainerOptions[i].name;
                
                this.hostContainerPicker.appendChild(option);
            }
        }
        */

            /*
    renderSelectedHostApp() {
        this.renderWithStyleSheet();
    }
    */

}