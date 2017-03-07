import * as Adaptive from "../Adaptive";
import { JsonParser } from "../JsonParser";
import * as Constants from "./Constants";

import { BingContainer } from "./containers/BingContainer";
import { HostContainer } from "./containers/HostContainer";
import { ConnectorContainer } from "./containers/ConnectorContainer";
import { LiveTileContainer } from "./containers/LiveTileContainer";
import { OutlookConnectorContainer } from "./containers/OutlookConnectorContainer";
import { SkypeContainer } from "./containers/SkypeContainer";
import { SpeechContainer } from "./containers/SpeechContainer";
import { TeamsConnectorContainer } from "./containers/TeamsConnectorContainer";
import { ToastContainer } from "./containers/ToastContainer";
import { CortanaCarContainer } from "./containers/CortanaCarContainer";

import * as ace from "brace";
import "brace/mode/json";
import "brace/theme/chrome";
import * as vkbeautify from "vkbeautify";

import {Injectable, Inject, Optional} from '@angular/core';

@Injectable()
export class HostApp
{
    private editor: ace.Editor;
    private hostContainerOptions: Array<HostContainerOption> = [];
    private hostContainerPicker: HTMLSelectElement;
    
    constructor()
    {
    }

    renderCard() {
       let jsonText = this.editor.getValue();
       this.renderCardHelper(jsonText, 
                        (a, args) => {
                            alert("Action executed: " + a.name);
                        });
    }

    schemaParentElement():any
    {
        return this.editor;
    }

    renderCardHelper(jsonText: string, actionHandler: (a, args) => void)
    {
        try {
            let json = JSON.parse(jsonText);
            let cardTypeName = json["type"];

            let node = document.getElementById('content');
            node.innerHTML = '';

            Adaptive.AdaptiveCard.onShowPopupCard = (action, element) => {
                var popupContainer = document.getElementById("popupCardContainer");
                popupContainer.innerHTML = "";

                popupContainer.appendChild(element);
            }

            switch (cardTypeName) {
                case "AdaptiveCard":
                    let hostContainer = this.hostContainerOptions[this.hostContainerPicker.selectedIndex].hostContainer;
                    hostContainer.applyOptions();

                    var jsonParser = new JsonParser();
                    var adaptiveCard = jsonParser.parse(json);

                    adaptiveCard.onExecuteAction.subscribe(actionHandler);

                    var popupContainer = document.getElementById("popupCardContainer");

                    if (Adaptive.AdaptiveCard.options.actionShowCardInPopup) {
                        popupContainer.innerText = "ActionShowCard popups will appear in this box, according to container settings";
                        popupContainer.hidden = false;
                    }
                    else {
                        popupContainer.hidden = true;
                    }

                    let renderedHostContainer = hostContainer.render(adaptiveCard);

                    node.appendChild(renderedHostContainer);

                    try {
                        sessionStorage.setItem("AdaptivePayload", this.editor.getValue());
                    }
                    catch (e2) {
                        console.log("Unable to cache payload")
                    }

                    break;
                default:
                    // TODO: Fix this
                    //if (isNullOrEmpty(cardTypeName)) {
                    if(!false) {
                        throw new Error("The card's type must be specified.");
                    }
                    else {
                        throw new Error("Unknown card type: " + cardTypeName);
                    }
            }
        }
        catch (e) {
            document.getElementById('content').innerHTML = e.toString();
            console.log(e.toString() + '\n' + jsonText);
        }
    }

    textareaChange() {
        // this.renderCard();
    }

    openFilePicker() {
        document.getElementById("filePicker").click();
    }

    filePickerChanged(evt) {
        let editor_self = this.editor;
        let filePicker = document.getElementById("filePicker") as HTMLInputElement;

        let file = filePicker.files[0];

        if (file) {
            let reader = new FileReader();

            reader.onload = function (e: ProgressEvent) {
                editor_self.session.setValue((e.target as FileReader).result);
            }

            reader.readAsText(file);
        }
        else {
            alert("Failed to load file");
        }
    }

    updateStyleSheet() {
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

    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    setupEditor() {
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
        this.editor.getSession().on("change", 
        function (e) { 
           // self.renderCard(); 
        });

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

    }

    setupContainerPicker() {

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

        this.setContainerAppFromUrl();
    }

    setContainerAppFromUrl() {
        let requestedHostApp = this.getParameterByName("hostApp", null);
        if (requestedHostApp) {
            console.log(`Setting host app to ${requestedHostApp}`);
            this.hostContainerPicker.value = requestedHostApp;
        }

        this.renderSelectedHostApp();
    }

    renderSelectedHostApp() {
        this.updateStyleSheet();
        // this.renderCard();
    }

    setupFilePicker() {
        document.getElementById("loadSample").onclick = () => { document.getElementById("filePicker").click(); };
        document.getElementById("filePicker").addEventListener("change", this.filePickerChanged);
    }

    initialize()
    {
        this.hostContainerPicker = <HTMLSelectElement>document.getElementById("hostContainerPicker");
        let self = this;

        this.setupEditor();

        this.setupContainerPicker();

        this.setupFilePicker();

        this.updateStyleSheet();

        // this.renderCard();

        // handle Back and Forward after the Container app drop down is changed
        window.addEventListener('popstate', function (e) {
            self.setContainerAppFromUrl();
        });
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

