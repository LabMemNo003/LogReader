chrome.commands.onCommand.addListener(function (command) {
    if (command == "trigger") {
        chrome.tabs.executeScript({ code: 'triggerHighlightText();' });
    }
});
