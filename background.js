chrome.commands.onCommand.addListener(command => {
    if (command == "trigger") {
        chrome.tabs.executeScript({ code: 'switchPage();' });
    }
});

chrome.runtime.onInstalled.addListener(details => {
    if (details.reason == "install") {
        chrome.storage.local.set({ defaultRules });
        chrome.storage.local.set(defaultRules);
    }
    else if (details.reason == "update") {
        chrome.storage.local.set({ defaultRules });
    }
});

let defaultRules = {
    formatVersion: "1.0",
    highlightRules: [
        {
            pattern: "panic",
            color: "red",
            hint: "default rule",
            link: "",
            isRegExp: true,
            isCensitive: false,
            isMultiline: false,
        },
        {
            pattern: "fail",
            color: "red",
            hint: "default rule",
            link: "",
            isRegExp: true,
            isCensitive: false,
            isMultiline: false,
        },
        {
            pattern: "error",
            color: "red",
            hint: "default rule",
            link: "",
            isRegExp: true,
            isCensitive: false,
            isMultiline: false,
        },
        {
            pattern: "fault",
            color: "red",
            hint: "default rule",
            link: "",
            isRegExp: true,
            isCensitive: false,
            isMultiline: false,
        },
        {
            pattern: "warn",
            color: "yellow",
            hint: "default rule",
            link: "",
            isRegExp: true,
            isCensitive: false,
            isMultiline: false,
        },
    ],
    collapseExpandRules: [],
};
