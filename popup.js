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

chrome.storage.local.get(
    {
        pattern: "",
        color: "",
        hint: "",
        link: "",
        isRegExp: false,
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
    }
);

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
    chrome.storage.local.set({ isRegExp: checkboxRegExp.checked });
};

checkboxCensitive.onchange = () => {
    chrome.storage.local.set({ isCensitive: checkboxCensitive.checked });
};

checkboxMultiline.onchange = () => {
    chrome.storage.local.set({ isMultiline: checkboxMultiline.checked });
}

buttonAdd.onclick = () => {
    chrome.storage.local.get(
        { rules: [] },
        result => {
            result.rules.push(
                {
                    pattern: inputPattern.value,
                    color: inputColor.value,
                    hint: inputHint.value,
                    link: inputLink.value,
                    isRegExp: checkboxRegExp.checked,
                    isCensitive: checkboxCensitive.checked,
                    isMultiline: checkboxMultiline.checked,
                }
            );
            chrome.storage.local.set({ rules: result.rules });
        }
    )
}

buttonTrigger.onclick = () => {
    chrome.tabs.executeScript({ code: 'triggerHighlightText();' });
};

buttonClean.onclick = () => {
    inputPattern.value = "";
    inputColor.value = "";
    inputHint.value = "";
    inputLink.value = "";
    checkboxRegExp.checked = false;
    checkboxCensitive.checked = false;
    checkboxMultiline.checked = false;

    chrome.storage.local.set(
        {
            pattern: "",
            color: "",
            hint: "",
            link: "",
            isRegExp: false,
            isCensitive: false,
            isMultiline: false,
        }
    );
};
