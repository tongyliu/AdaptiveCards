import { HostContainer } from "./host-container";
import {
    AdaptiveCard,
    HostConfig,
    Size,
    TextSize,
    TextColor,
    TextWeight,
    Spacing,
    ShowCardActionMode,
    Orientation,
    ActionAlignment,
} from "adaptivecards";

export class BingApiContainer extends HostContainer {
    static backgroundColor: string = "#fff";
    static borderStyle: string = "1px solid #EDEDED";

    private _width: number;
    private _height: number;

    constructor(width: number, height: number, styleSheet: string) {
        super(styleSheet);

        this._width = width;
        this._height = height;
    }

    protected renderContainer(adaptiveCard: AdaptiveCard, target: HTMLElement) {
        var element = document.createElement("div");
        element.style.width = this._width + "px";
        element.style.height = this._height + "px";
        element.style.backgroundColor = BingApiContainer.backgroundColor;
        element.style.border = BingApiContainer.borderStyle;
        element.style.overflow = "hidden";
        target.appendChild(element);

        var renderedCard = adaptiveCard.render(element);
        renderedCard.style.height = "100%";
    }

    public getHostConfig(): HostConfig {
        return new HostConfig({
            "spacing": {
                "small": 3,
                "default": 8,
                "medium": 12,
                "large": 16,
                "extraLarge": 20,
                "padding": 10
            },
            "separator": {
                "lineThickness": 1,
                "lineColor": "#EEEEEE"
            },
            "supportsInteractivity": false,
            "fontFamily": "Arial, sans-serif",
            "fontSizes": {
                "small": 10,
                "default": 12,
                "medium": 16,
                "large": 20,
                "extraLarge": 42
            },
            "fontWeights": {
                "lighter": 200,
                "default": 400,
                "bolder": 600
            },
            "containerStyles": {
                "default": {
                    "backgroundColor": "#FFFFFF",
                    "fontColors": {
                        "default": {
                            "normal": "#FF101010",
                            "subtle": "#99101010"
                        },
                        "accent": {
                            "normal": "#FF001BA0",
                            "subtle": "#B2001BA0"
                        },
                        "good": {
                            "normal": "#FF006D21",
                            "subtle": "#B2006D21"
                        },
                        "warning": {
                            "normal": "#FFFFD700",
                            "subtle": "#B2FFD700"
                        },
                        "attention": {
                            "normal": "#FFC80000",
                            "subtle": "#B2C80000"
                        }
                    }
                },
                "emphasis": {
                    "backgroundColor": "#ff8c00",
                    "fontColors": {
                        "default": {
                            "normal": "#FFFFFF",
                            "subtle": "#CCFFFFFF"
                        },
                        "accent": {
                            "normal": "#FF0000FF",
                            "subtle": "#b20000FF"
                        },
                        "good": {
                            "normal": "#FF008000",
                            "subtle": "#b2008000"
                        },
                        "warning": {
                            "normal": "#FFFFD700",
                            "subtle": "#b2FFD700"
                        },
                        "attention": {
                            "normal": "#FF8B0000",
                            "subtle": "#b28B0000"
                        }
                    }
                }
            },
            "imageSizes": {
                "small": 12,
                "medium": 60,
                "large": 83
            },
            "actions": {
                "maxActions": 5,
                "spacing": 2,
                "buttonSpacing": 10,
                "showCard": {
                    "actionMode": 0,
                    "inlineTopMargin": 16
                },
                "actionsOrientation": 0,
                "actionAlignment": 0
            },
            "adaptiveCard": {
                "allowCustomStyle": true
            },
            "image": {
                "size": 3
            },
            "imageSet": {
                "imageSize": 3,
                "maxImageHeight": 100
            },
            "factSet": {
                "title": {
                    "color": 0,
                    "size": 1,
                    "isSubtle": false,
                    "weight": 2,
                    "wrap": true,
                    "maxWidth": 150
                },
                "value": {
                    "color": 0,
                    "size": 1,
                    "isSubtle": false,
                    "weight": 1,
                    "wrap": true
                },
                "spacing": 10
            }
        });
    }
}
