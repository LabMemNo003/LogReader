chrome.storage.local.set({ version: "1.1.1" });

chrome.commands.onCommand.addListener(function (command) {
    if (command == "trigger") {
        chrome.tabs.executeScript({ code: 'triggerHighlightText();' });
    }
});
