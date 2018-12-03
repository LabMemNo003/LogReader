let inputPattern = document.getElementById("pattern");
let inputColor = document.getElementById("color");
let inputHint = document.getElementById("hint");
let inputLink = document.getElementById("link");
let checkboxRegExp = document.getElementById("regExp");
let checkboxCensitive = document.getElementById("censitive");
let checkboxMultiline = document.getElementById("multiline");
let buttonAdd = document.getElementById("add");
let buttonTrigger = document.getElementById("trigger");
let buttonClean = document.getElementById("clean");

// Restore filled information in elements from local storage.
chrome.storage.local.get(
    {
        pattern: "",
        color: "",
        hint: "",
        link: "",
        isRegExp: true,
        isCensitive: false,
        isMultiline: false,
    },
    result => {
        inputPattern.value = result.pattern;
        inputColor.value = result.color;
        inputHint.value = result.hint;
        inputLink.value = result.link;
        checkboxRegExp.checked = result.isRegExp;
        checkboxCensitive.checked = result.isCensitive;
        checkboxMultiline.checked = result.isMultiline;

        checkboxCensitive.disabled = !checkboxRegExp.checked;
        checkboxMultiline.disabled = !checkboxRegExp.checked;
    }
);

// Detect the change in elements and store it into local storage
inputPattern.oninput = () => {
    chrome.storage.local.set({ pattern: inputPattern.value });
};
inputColor.oninput = () => {
    chrome.storage.local.set({ color: inputColor.value });
};
inputHint.oninput = () => {
    chrome.storage.local.set({ hint: inputHint.value });
};
inputLink.oninput = () => {
    chrome.storage.local.set({ link: inputLink.value });
};
checkboxRegExp.onchange = () => {
    checkboxCensitive.disabled = !checkboxRegExp.checked;
    checkboxMultiline.disabled = !checkboxRegExp.checked;

    chrome.storage.local.set({ isRegExp: checkboxRegExp.checked });
};
checkboxCensitive.onchange = () => {
    chrome.storage.local.set({ isCensitive: checkboxCensitive.checked });
};
checkboxMultiline.onchange = () => {
    chrome.storage.local.set({ isMultiline: checkboxMultiline.checked });
};

// Save the inputed rule into local storage.
// The rules stored in local sotrage are organized as an array.
buttonAdd.onclick = () => {
    chrome.storage.local.get(
        { highlightRules: [] },
        result => {
            result.highlightRules.push(
                {
                    pattern: inputPattern.value,
                    color: inputColor.value,
                    hint: inputHint.value,
                    link: inputLink.value,
                    isRegExp: checkboxRegExp.checked,
                    isCensitive: checkboxRegExp.checked && checkboxCensitive.checked,
                    isMultiline: checkboxRegExp.checked && checkboxMultiline.checked,
                }
            );
            chrome.storage.local.set({ highlightRules: result.highlightRules });
        }
    )
}

// Highlight text by trigger corresponding function in content.js
buttonTrigger.onclick = () => {
    chrome.tabs.executeScript({ code: 'triggerHighlightText();' });
};

// Clean the cached information.
buttonClean.onclick = () => {
    inputPattern.value = "";
    inputColor.value = "";
    inputHint.value = "";
    inputLink.value = "";
    checkboxRegExp.checked = true;
    checkboxCensitive.checked = false;
    checkboxMultiline.checked = false;

    chrome.storage.local.set(
        {
            pattern: "",
            color: "",
            hint: "",
            link: "",
            isRegExp: true,
            isCensitive: false,
            isMultiline: false,
        }
    );
};
