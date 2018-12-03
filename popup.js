// ----------------------------------------------------------------------------
// Highlight Text
// ----------------------------------------------------------------------------
let hl_inputPattern = document.getElementById("hl_pattern");
let hl_inputColor = document.getElementById("hl_color");
let hl_inputHint = document.getElementById("hl_hint");
let hl_inputLink = document.getElementById("hl_link");
let hl_checkboxRegExp = document.getElementById("hl_regexp");
let hl_checkboxCensitive = document.getElementById("hl_censitive");
let hl_checkboxMultiline = document.getElementById("hl_multiline");
let hl_buttonAdd = document.getElementById("hl_add");
let hl_buttonTrigger = document.getElementById("hl_trigger");
let hl_buttonClean = document.getElementById("hl_clean");

// Restore filled information in elements from local storage.
chrome.storage.local.get(
    {
        hl_pattern: "",
        hl_color: "",
        hl_hint: "",
        hl_link: "",
        hl_isRegExp: true,
        hl_isCensitive: false,
        hl_isMultiline: false,
    },
    result => {
        hl_inputPattern.value = result.hl_pattern;
        hl_inputColor.value = result.hl_color;
        hl_inputHint.value = result.hl_hint;
        hl_inputLink.value = result.hl_link;
        hl_checkboxRegExp.checked = result.hl_isRegExp;
        hl_checkboxCensitive.checked = result.hl_isCensitive;
        hl_checkboxMultiline.checked = result.hl_isMultiline;
        hl_checkboxCensitive.disabled = !hl_checkboxRegExp.checked;
        hl_checkboxMultiline.disabled = !hl_checkboxRegExp.checked;
    }
);

// Detect the change in elements and store it into local storage.
hl_inputPattern.oninput = () => { chrome.storage.local.set({ hl_pattern: hl_inputPattern.value }); };
hl_inputColor.oninput = () => { chrome.storage.local.set({ hl_color: hl_inputColor.value }); };
hl_inputHint.oninput = () => { chrome.storage.local.set({ hl_hint: hl_inputHint.value }); };
hl_inputLink.oninput = () => { chrome.storage.local.set({ hl_link: hl_inputLink.value }); };
hl_checkboxRegExp.onchange = () => {
    hl_checkboxCensitive.disabled = !hl_checkboxRegExp.checked;
    hl_checkboxMultiline.disabled = !hl_checkboxRegExp.checked;
    chrome.storage.local.set({ hl_isRegExp: hl_checkboxRegExp.checked });
};
hl_checkboxCensitive.onchange = () => { chrome.storage.local.set({ hl_isCensitive: hl_checkboxCensitive.checked }); };
hl_checkboxMultiline.onchange = () => { chrome.storage.local.set({ hl_isMultiline: hl_checkboxMultiline.checked }); };

// Save the inputed rule into local storage.
// The rules stored in local sotrage are organized as an array.
hl_buttonAdd.onclick = () => {
    chrome.storage.local.get(
        { highlightRules: [] },
        result => {
            result.highlightRules.push(
                {
                    pattern: hl_inputPattern.value,
                    color: hl_inputColor.value,
                    hint: hl_inputHint.value,
                    link: hl_inputLink.value,
                    isRegExp: hl_checkboxRegExp.checked,
                    isCensitive: hl_checkboxRegExp.checked && hl_checkboxCensitive.checked,
                    isMultiline: hl_checkboxRegExp.checked && hl_checkboxMultiline.checked,
                }
            );
            chrome.storage.local.set({ highlightRules: result.highlightRules });
        }
    )
}

// Clean the cached information.
hl_buttonClean.onclick = () => {
    hl_inputPattern.value = "";
    hl_inputColor.value = "";
    hl_inputHint.value = "";
    hl_inputLink.value = "";
    hl_checkboxRegExp.checked = true;
    hl_checkboxCensitive.checked = false;
    hl_checkboxMultiline.checked = false;

    chrome.storage.local.set(
        {
            hl_pattern: "",
            hl_color: "",
            hl_hint: "",
            hl_link: "",
            hl_isRegExp: true,
            hl_isCensitive: false,
            hl_isMultiline: false,
        }
    );
};

// Highlight text by trigger corresponding function in content.js
hl_buttonTrigger.onclick = () => {
    chrome.tabs.executeScript({ code: 'triggerHighlightText();' });
};

// ----------------------------------------------------------------------------
// Collapse and Expand
// ----------------------------------------------------------------------------
let ces_inputPattern = document.getElementById("ces_pattern");
let ces_inputColor = document.getElementById("ces_color");
let ces_inputHint = document.getElementById("ces_hint");
let ces_inputLink = document.getElementById("ces_link");
let ces_checkboxRegExp = document.getElementById("ces_regexp");
let ces_checkboxCensitive = document.getElementById("ces_censitive");
let ces_checkboxMultiline = document.getElementById("ces_multiline");
let cee_inputPattern = document.getElementById("cee_pattern");
let cee_inputColor = document.getElementById("cee_color");
let cee_inputHint = document.getElementById("cee_hint");
let cee_inputLink = document.getElementById("cee_link");
let cee_checkboxRegExp = document.getElementById("cee_regexp");
let cee_checkboxCensitive = document.getElementById("cee_censitive");
let cee_checkboxMultiline = document.getElementById("cee_multiline");
let ce_buttonAdd = document.getElementById("ce_add");
let ce_buttonTrigger = document.getElementById("ce_trigger");
let ce_buttonClean = document.getElementById("ce_clean");

// Restore filled information in elements from local storage.
chrome.storage.local.get(
    {
        ces_pattern: "",
        ces_color: "",
        ces_hint: "",
        ces_link: "",
        ces_isRegExp: true,
        ces_isCensitive: false,
        ces_isMultiline: false,

        cee_pattern: "",
        cee_color: "",
        cee_hint: "",
        cee_link: "",
        cee_isRegExp: true,
        cee_isCensitive: false,
        cee_isMultiline: false,
    },
    result => {
        ces_inputPattern.value = result.ces_pattern;
        ces_inputColor.value = result.ces_color;
        ces_inputHint.value = result.ces_hint;
        ces_inputLink.value = result.ces_link;
        ces_checkboxRegExp.checked = result.ces_isRegExp;
        ces_checkboxCensitive.checked = result.ces_isCensitive;
        ces_checkboxMultiline.checked = result.ces_isMultiline;
        ces_checkboxCensitive.disabled = !ces_checkboxRegExp.checked;
        ces_checkboxMultiline.disabled = !ces_checkboxRegExp.checked;

        cee_inputPattern.value = result.cee_pattern;
        cee_inputColor.value = result.cee_color;
        cee_inputHint.value = result.cee_hint;
        cee_inputLink.value = result.cee_link;
        cee_checkboxRegExp.checked = result.cee_isRegExp;
        cee_checkboxCensitive.checked = result.cee_isCensitive;
        cee_checkboxMultiline.checked = result.cee_isMultiline;
        cee_checkboxCensitive.disabled = !cee_checkboxRegExp.checked;
        cee_checkboxMultiline.disabled = !cee_checkboxRegExp.checked;
    }
);

// Detect the change in elements and store it into local storage.
ces_inputPattern.oninput = () => { chrome.storage.local.set({ ces_pattern: ces_inputPattern.value }); };
ces_inputColor.oninput = () => { chrome.storage.local.set({ ces_color: ces_inputColor.value }); };
ces_inputHint.oninput = () => { chrome.storage.local.set({ ces_hint: ces_inputHint.value }); };
ces_inputLink.oninput = () => { chrome.storage.local.set({ ces_link: ces_inputLink.value }); };
ces_checkboxRegExp.onchange = () => {
    ces_checkboxCensitive.disabled = !ces_checkboxRegExp.checked;
    ces_checkboxMultiline.disabled = !ces_checkboxRegExp.checked;
    chrome.storage.local.set({ ces_isRegExp: ces_checkboxRegExp.checked });
};
ces_checkboxCensitive.onchange = () => { chrome.storage.local.set({ ces_isCensitive: ces_checkboxCensitive.checked }); };
ces_checkboxMultiline.onchange = () => { chrome.storage.local.set({ ces_isMultiline: ces_checkboxMultiline.checked }); };

cee_inputPattern.oninput = () => { chrome.storage.local.set({ cee_pattern: cee_inputPattern.value }); };
cee_inputColor.oninput = () => { chrome.storage.local.set({ cee_color: cee_inputColor.value }); };
cee_inputHint.oninput = () => { chrome.storage.local.set({ cee_hint: cee_inputHint.value }); };
cee_inputLink.oninput = () => { chrome.storage.local.set({ cee_link: cee_inputLink.value }); };
cee_checkboxRegExp.onchange = () => {
    cee_checkboxCensitive.disabled = !cee_checkboxRegExp.checked;
    cee_checkboxMultiline.disabled = !cee_checkboxRegExp.checked;
    chrome.storage.local.set({ cee_isRegExp: cee_checkboxRegExp.checked });
};
cee_checkboxCensitive.onchange = () => { chrome.storage.local.set({ cee_isCensitive: cee_checkboxCensitive.checked }); };
cee_checkboxMultiline.onchange = () => { chrome.storage.local.set({ cee_isMultiline: cee_checkboxMultiline.checked }); };


// Save the inputed rule into local storage.
// The rules stored in local sotrage are organized as an array.
ce_buttonAdd.onclick = () => {
    chrome.storage.local.get(
        { collapseExpandRules: [] },
        result => {
            result.collapseExpandRules.push(
                {
                    start: {
                        pattern: ces_inputPattern.value,
                        color: ces_inputColor.value,
                        hint: ces_inputHint.value,
                        link: ces_inputLink.value,
                        isRegExp: ces_checkboxRegExp.checked,
                        isCensitive: ces_checkboxRegExp.checked && ces_checkboxCensitive.checked,
                        isMultiline: ces_checkboxRegExp.checked && ces_checkboxMultiline.checked,
                    },
                    end: {
                        pattern: cee_inputPattern.value,
                        color: cee_inputColor.value,
                        hint: cee_inputHint.value,
                        link: cee_inputLink.value,
                        isRegExp: cee_checkboxRegExp.checked,
                        isCensitive: cee_checkboxRegExp.checked && cee_checkboxCensitive.checked,
                        isMultiline: cee_checkboxRegExp.checked && cee_checkboxMultiline.checked,
                    },
                }
            );
            chrome.storage.local.set({ collapseExpandRules: result.collapseExpandRules });
        }
    )
}

// Clean the cached information.
ce_buttonClean.onclick = () => {
    ces_inputPattern.value = "";
    ces_inputColor.value = "";
    ces_inputHint.value = "";
    ces_inputLink.value = "";
    ces_checkboxRegExp.checked = true;
    ces_checkboxCensitive.checked = false;
    ces_checkboxMultiline.checked = false;

    cee_inputPattern.value = "";
    cee_inputColor.value = "";
    cee_inputHint.value = "";
    cee_inputLink.value = "";
    cee_checkboxRegExp.checked = true;
    cee_checkboxCensitive.checked = false;
    cee_checkboxMultiline.checked = false;

    chrome.storage.local.set(
        {
            ces_pattern: "",
            ces_color: "",
            ces_hint: "",
            ces_link: "",
            ces_isRegExp: true,
            ces_isCensitive: false,
            ces_isMultiline: false,

            cee_pattern: "",
            cee_color: "",
            cee_hint: "",
            cee_link: "",
            cee_isRegExp: true,
            cee_isCensitive: false,
            cee_isMultiline: false,
        }
    );
};

// Process text by trigger corresponding function in content.js
ce_buttonTrigger.onclick = () => {
    chrome.tabs.executeScript({ code: 'triggerCollapseExpand();' });
};