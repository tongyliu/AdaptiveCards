import * as Adaptive from "../html/renderer/Adaptive";
import { JsonParser } from "../html/renderer/JsonParser";
import * as Constants from "../html/visualizer/Constants";
import {Injectable} from '@angular/core';
import { BingContainer,  HostContainer, ConnectorContainer, 
        LiveTileContainer,  OutlookConnectorContainer, SkypeContainer, 
        SpeechContainer, TeamsConnectorContainer, ToastContainer,
        CortanaCarContainer } from "../html";

import * as ace from "brace";
import "brace/mode/json";
import "brace/theme/chrome";

@Injectable()
export class HostAppService
{
     private hostContainerOptions: Array<HostContainerOption> = [];
    
    renderCardHelper(jsonObj: JSON, 
        actionHandler: (args:any) => void): HTMLElement
    {
        if (this.hostContainerOptions.length == 0)
        {
            this.loadHostContainerOptions();
        }    
        
        var jsonParser = new JsonParser();
        var adaptiveCard = jsonParser.parse(jsonObj);
        let innerHandler = (action: Adaptive.ActionExternal) => {
            actionHandler(action);
        };
        adaptiveCard.onExecuteAction = innerHandler;
        
        let hostContainer = this.hostContainerOptions[0].hostContainer;
        hostContainer.applyOptions();
        
        let renderedHostContainer = hostContainer.render(adaptiveCard);
        return renderedHostContainer;
    }
   
    renderEditor(el: HTMLElement):ace.Editor {
        let editor = ace.edit(el);
        editor.setTheme("ace/theme/chrome");
        editor.setOptions(
            {
                "showPrintMargin": false,
                "displayIndentGuides": false,
                "showFoldWidgets": true,
                "highlightSelectedWord": false,
                "fontSize": "14px",
                "maxLines": 50,
                "minLines": 10
            });
        editor.getSession().setMode("ace/mode/json");
        this.loadData(editor);
        return editor;
    }

    loadData(editor: ace.Editor)
    {
        // Load the cached payload if the user had one
        try {
            let cachedPayload = sessionStorage.getItem("AdaptivePayload");
            if (cachedPayload) {
                editor.session.setValue(cachedPayload);
            }
            else {
                editor.session.setValue(Constants.defaultPayload);
            }
        }
        catch (e) {
            editor.session.setValue(Constants.defaultPayload);
        }
    }

    getSamples():Promise<Sample[]> {
        let samples:Promise<Sample[]> = Promise.resolve(SAMPLES);
        return samples;
    }

    loadHostContainerOptions() 
    {
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

export const SAMPLES: Sample[] = [
  {
    name: 'BingSports',
    file: '/samples/Proposed/Scenarios/BingSports.json'
  },
  {
    name: 'BingWeather',
    file: '/samples/Proposed/Scenarios/BingWeather.json'
  },
  {
    name: 'BingStock',
    file: '/samples/Proposed/Scenarios/BingStock.json'
  },
  {
    name: 'FlightItinerary',
    file: '/samples/Proposed/Scenarios/FlightItinerary.json'
  },
  {
    name: 'Restaurant',
    file: '/samples/Proposed/Scenarios/Restaurant.json'
  }
];

export interface Sample{
    name: string;
    file: string;
}