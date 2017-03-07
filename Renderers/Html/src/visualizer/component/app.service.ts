import * as Adaptive from "../../Adaptive";
import { JsonParser } from "../../JsonParser";
import * as Constants from "../Constants";
import {Injectable} from '@angular/core';
import { BingContainer } from "../containers/BingContainer";
import { HostContainer } from "../containers/HostContainer";
import { ConnectorContainer } from "../containers/ConnectorContainer";
import { LiveTileContainer } from "../containers/LiveTileContainer";
import { OutlookConnectorContainer } from "../containers/OutlookConnectorContainer";
import { SkypeContainer } from "../containers/SkypeContainer";
import { SpeechContainer } from "../containers/SpeechContainer";
import { TeamsConnectorContainer } from "../containers/TeamsConnectorContainer";
import { ToastContainer } from "../containers/ToastContainer";
import { CortanaCarContainer } from "../containers/CortanaCarContainer";

import * as ace from "brace";
import "brace/mode/json";
import "brace/theme/chrome";

@Injectable()
export class HostAppService
{
     private hostContainerOptions: Array<HostContainerOption> = [];
     private hostContainerPicker: HTMLSelectElement;
     private editor: ace.Editor;
    
    renderCardHelper(
        jsonObj: JSON, 
        actionHandler: (a:any, args:any) => void): HTMLElement
    {
        if (this.hostContainerOptions.length == 0)
        {
            this.renderContainerPicker();
        }    
        let hostContainer = this.hostContainerOptions[this.hostContainerPicker.selectedIndex].hostContainer;
                    hostContainer.applyOptions();
        var jsonParser = new JsonParser();
        var adaptiveCard = jsonParser.parse(jsonObj);
        adaptiveCard.onExecuteAction.subscribe(actionHandler);
        let renderedHostContainer = hostContainer.render(adaptiveCard);
        return renderedHostContainer;
    }

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

    renderEditor():any {
        this.editor = ace.edit("editor");
        this.editor.setTheme("ace/theme/chrome");
        this.editor.setOptions(
            {
                "showPrintMargin": false,
                "displayIndentGuides": false,
                "showFoldWidgets": true,
                "highlightSelectedWord": false,
                "fontSize": "14px",
            });
        let self = this;
        this.editor.getSession().setMode("ace/mode/json");

        // Load the cached payload if the user had one
        try {
            let cachedPayload = sessionStorage.getItem("AdaptivePayload");
            if (cachedPayload) {
                this.editor.session.setValue(cachedPayload);
            }
            else {
                this.editor.session.setValue(Constants.defaultPayload);
            }
        }
        catch (e) {
            this.editor.session.setValue(Constants.defaultPayload);
        }
        return this.editor;
    }

    renderContainerPicker() 
    {
        this.hostContainerPicker = <HTMLSelectElement>document.getElementById("hostContainerPicker");
        this.hostContainerOptions.push(
            new HostContainerOption(
                "Outlook Connector",
                new OutlookConnectorContainer("red", "./../../css/outlookConnectorCard.css")));
        this.hostContainerOptions.push(
            new HostContainerOption(
                "Microsoft Teams Connector",
                new TeamsConnectorContainer("./../../css/teamsConnectorCard.css")));
        this.hostContainerOptions.push(
            new HostContainerOption(
                "Windows Toast Notification",
                new ToastContainer(362, "./../../css/toast.css")));
        this.hostContainerOptions.push(
            new HostContainerOption(
                "Large Live Tile",
                new LiveTileContainer(310, 310, "./../../css/liveTile.css")));

        this.hostContainerOptions.push(
            new HostContainerOption(
                "Skype",
                new SkypeContainer("./../../css/skypeCard.css")));

        this.hostContainerOptions.push(
            new HostContainerOption(
                "Bing",
                new BingContainer(285, 150, "./../../css/bing.css")));

        this.hostContainerOptions.push(
            new HostContainerOption(
                "Cortana Car",
                new CortanaCarContainer("./../../css/cortanaCar.css")));

        this.hostContainerOptions.push(
            new HostContainerOption(
                "Speech",
                new SpeechContainer("./../../css/bing.css")));

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
    }

    renderSelectedHostApp() {
        this.renderWithStyleSheet();
    }
}

export class HostContainerOption 
{
    readonly name: string;
    readonly hostContainer: HostContainer;

    constructor(name: string, hostContainer: HostContainer) {
        this.name = name;
        this.hostContainer = hostContainer;
    }
}