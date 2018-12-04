chrome.storage.local.set({ formatVersion: "1.0" });

chrome.commands.onCommand.addListener(function (command) {
    if (command == "trigger") {
        chrome.tabs.executeScript({ code: 'triggerAll();' });
    }
});
