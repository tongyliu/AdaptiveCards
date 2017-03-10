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
    
    renderCardHelper(jsonObj: JSON, 
        actionHandler: (a:any, args:any) => void): HTMLElement
    {
        if (this.hostContainerOptions.length == 0)
        {
            this.loadHostContainerOptions();
        }    
        
        var jsonParser = new JsonParser();
        var adaptiveCard = jsonParser.parse(jsonObj);
        adaptiveCard.onExecuteAction.subscribe(actionHandler);
        
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