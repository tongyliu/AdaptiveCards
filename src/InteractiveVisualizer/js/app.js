var editor;
var markdownProcessor;
function renderCard() {
    try {
        var json = JSON.parse(editor.getValue());
        var cardTypeName = json["@type"];
        var renderedCard = void 0;
        switch (cardTypeName) {
            case "SwiftCard":
            case "MessageCard":
                var swiftCard = new MessageCard();
                swiftCard.parse(json);
                renderedCard = swiftCard.render();
                break;
            case "AdaptiveCard":
                var flexibleCard = new AdaptiveCard();
                flexibleCard.parse(json);
                renderedCard = flexibleCard.render();
                break;
            default:
                if (isNullOrEmpty(cardTypeName)) {
                    throw new Error("The card's type must be specified.");
                }
                else {
                    throw new Error("Unknown card type: " + cardTypeName);
                }
        }
        var node = document.getElementById('content');
        node.innerHTML = '';
        node.appendChild(renderedCard);
    }
    catch (e) {
        document.getElementById('content').innerHTML = "Error: " + e.toString();
    }
}
function textareaChange() {
    renderCard();
}
function openFilePicker() {
    document.getElementById("filePicker").click();
}
function filePickerChanged(evt) {
    var filePicker = document.getElementById("filePicker");
    var file = filePicker.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            editor.session.setValue(e.target.result);
        };
        reader.readAsText(file);
    }
    else {
        alert("Failed to load file");
    }
}
function processMarkdown(text) {
    return markdownProcessor.render(text);
}
window.onload = function () {
    var filePicker = document.getElementById("filePicker");
    filePicker.addEventListener("change", filePickerChanged);
    renderCard();
};
//# sourceMappingURL=app.js.map