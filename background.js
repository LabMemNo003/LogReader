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
            pattern: "warn",
            color: "yellow",
            hint: "default rule",
            link: "",
            isRegExp: true,
            isCensitive: false,
            isMultiline: false,
        },
    ],
    collapseExpandRules: [
        {
            start: {
                pattern: "^.*Fetching task: (\\d+).*$",
                color: "yellow",
                hint: "default rule",
                link: "",
                isRegExp: true,
                isCensitive: false,
                isMultiline: true,
            },
            end: {
                pattern: "Completed Task : [:1:]",
                color: "brown",
                hint: "default rule",
                link: "",
                isRegExp: true,
                isCensitive: false,
                isMultiline: false,
            },
        },
    ],
};
