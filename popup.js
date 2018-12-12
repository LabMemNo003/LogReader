let colorMap = {
    "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
    "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff",
    "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00",
    "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c",
    "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9",
    "darkgreen": "#006400", "darkgrey": "#a9a9a9", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkslategrey": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3",
    "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dimgrey": "#696969", "dodgerblue": "#1e90ff",
    "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff", "goldenrod": "#daa520", "gold": "#ffd700", "gray": "#808080", "green": "#008000",
    "greenyellow": "#adff2f", "grey": "#808080", "honeydew": "#f0fff0", "hotpink": "#ff69b4", "indianred": "#cd5c5c",
    "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavenderblush": "#fff0f5", "lavender": "#e6e6fa",
    "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2", "lightgray": "#d3d3d3", "lightgreen": "#90ee90", "lightgrey": "#d3d3d3", "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightslategrey": "#778899",
    "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
    "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370db", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23",
    "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6", "palegoldenrod": "#eee8aa", "palegreen": "#98fb98",
    "paleturquoise": "#afeeee", "palevioletred": "#db7093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f",
    "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080", "rebeccapurple": "#663399",
    "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1", "saddlebrown": "#8b4513", "salmon": "#fa8072",
    "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0",
    "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "slategrey": "#708090", "snow": "#fffafa",
    "springgreen": "#00ff7f", "steelblue": "#4682b4", "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8",
    "tomato": "#ff6347", "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3", "white": "#ffffff",
    "whitesmoke": "#f5f5f5", "yellow": "#ffff00", "yellowgreen": "#9acd32",
};

function colorKeywordToHexValue(keyword) {
    if (typeof colorMap[keyword.toLowerCase()] != 'undefined')
        return colorMap[keyword.toLowerCase()];
    return false;
}

{
    let presetColors = document.createElement("datalist");
    presetColors.id = "presetColors";
    let colors = [
        "maroon", "red", "orange", "yellow", "green",
        "cyan", "cornflowerblue", "blue", "purple", "magenta",
        "limegreen", "peachpuff", "springgreen", "yellowgreen", "olivedrab",
        "mediumorchid", "lightsteelblue", "lightslategrey", "lightseagreen", "lightcoral",
    ];
    for (let color of colors) {
        let option = document.createElement("option");
        option.value = colorKeywordToHexValue(color);
        presetColors.appendChild(option);
    }
    document.body.appendChild(presetColors);
}

// ----------------------------------------------------------------------------
// Highlight Text
// ----------------------------------------------------------------------------
let hl_inputPattern = document.getElementById("hl_pattern");
let hl_inputColor = document.getElementById("hl_color");
hl_inputColor.setAttribute("list", "presetColors");
let hl_selectColor = document.getElementById("hl_select");
for (let color in colorMap) {
    let option = document.createElement("option");
    option.value = colorMap[color];
    option.innerText = color;
    hl_selectColor.appendChild(option);
}
let hl_inputHint = document.getElementById("hl_hint");
let hl_inputLink = document.getElementById("hl_link");
let hl_checkboxRegExp = document.getElementById("hl_regexp");
let hl_checkboxCensitive = document.getElementById("hl_censitive");
let hl_checkboxMultiline = document.getElementById("hl_multiline");
let hl_buttonAdd = document.getElementById("hl_add");
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
        hl_selectColor.value = result.hl_color;
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
hl_inputColor.onchange = () => {
    hl_selectColor.value = hl_inputColor.value;
    chrome.storage.local.set({ hl_color: hl_inputColor.value });
};
hl_selectColor.onchange = () => {
    hl_inputColor.value = hl_selectColor.value;
    chrome.storage.local.set({ hl_color: hl_selectColor.value });
}
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
            chrome.storage.local.set({ hl_rule_add: result.highlightRules.length });
        }
    );
};

// Clean the cached information.
hl_buttonClean.onclick = () => {
    hl_inputPattern.value = "";
    hl_inputColor.value = "";
    hl_selectColor.value = "";
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

// ----------------------------------------------------------------------------
// Collapse and Expand
// ----------------------------------------------------------------------------
let ces_inputPattern = document.getElementById("ces_pattern");
let ces_inputColor = document.getElementById("ces_color");
ces_inputColor.setAttribute("list", "presetColors");
let ces_selectColor = document.getElementById("ces_select");
for (let color in colorMap) {
    let option = document.createElement("option");
    option.value = colorMap[color];
    option.innerText = color;
    ces_selectColor.appendChild(option);
}
let ces_inputHint = document.getElementById("ces_hint");
let ces_inputLink = document.getElementById("ces_link");
let ces_checkboxRegExp = document.getElementById("ces_regexp");
let ces_checkboxCensitive = document.getElementById("ces_censitive");
let ces_checkboxMultiline = document.getElementById("ces_multiline");
let cee_inputPattern = document.getElementById("cee_pattern");
let cee_inputColor = document.getElementById("cee_color");
cee_inputColor.setAttribute("list", "presetColors");
let cee_selectColor = document.getElementById("cee_select");
for (let color in colorMap) {
    let option = document.createElement("option");
    option.value = colorMap[color];
    option.innerText = color;
    cee_selectColor.appendChild(option);
}
let cee_inputHint = document.getElementById("cee_hint");
let cee_inputLink = document.getElementById("cee_link");
let cee_checkboxRegExp = document.getElementById("cee_regexp");
let cee_checkboxCensitive = document.getElementById("cee_censitive");
let cee_checkboxMultiline = document.getElementById("cee_multiline");
let ce_buttonAdd = document.getElementById("ce_add");
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
        ces_selectColor.value = result.ces_color;
        ces_inputHint.value = result.ces_hint;
        ces_inputLink.value = result.ces_link;
        ces_checkboxRegExp.checked = result.ces_isRegExp;
        ces_checkboxCensitive.checked = result.ces_isCensitive;
        ces_checkboxMultiline.checked = result.ces_isMultiline;
        ces_checkboxCensitive.disabled = !ces_checkboxRegExp.checked;
        ces_checkboxMultiline.disabled = !ces_checkboxRegExp.checked;

        cee_inputPattern.value = result.cee_pattern;
        cee_inputColor.value = result.cee_color;
        cee_selectColor.value = result.cee_color;
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
ces_inputColor.onchange = () => {
    ces_selectColor.value = ces_inputColor.value;
    chrome.storage.local.set({ ces_color: ces_inputColor.value });
};
ces_selectColor.onchange = () => {
    ces_inputColor.value = ces_selectColor.value;
    chrome.storage.local.set({ ces_color: ces_selectColor.value });
}
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
cee_inputColor.onchange = () => {
    cee_selectColor.value = cee_inputColor.value;
    chrome.storage.local.set({ cee_color: cee_inputColor.value });
};
cee_selectColor.onchange = () => {
    cee_inputColor.value = cee_selectColor.value;
    chrome.storage.local.set({ cee_color: cee_selectColor.value });
}
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
            chrome.storage.local.set({ ce_rule_add: result.collapseExpandRules.length });
        }
    );
};

// Clean the cached information.
ce_buttonClean.onclick = () => {
    ces_inputPattern.value = "";
    ces_inputColor.value = "";
    ces_selectColor.value = "";
    ces_inputHint.value = "";
    ces_inputLink.value = "";
    ces_checkboxRegExp.checked = true;
    ces_checkboxCensitive.checked = false;
    ces_checkboxMultiline.checked = false;

    cee_inputPattern.value = "";
    cee_inputColor.value = "";
    cee_selectColor.value = "";
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

// ----------------------------------------------------------------------------
// Trigger all
// ----------------------------------------------------------------------------
let bt_triggerAll = document.getElementById("trigger_all");

bt_triggerAll.onclick = () => {
    chrome.tabs.executeScript({ code: "triggerAll();" });
}

let cb_hlEnable = document.getElementById("hl_enable");
let cb_ceEnable = document.getElementById("ce_enable");

chrome.storage.local.get(
    {
        hl_enable: true,
        ce_enable: true,
    },
    result => {
        cb_hlEnable.checked = result.hl_enable;
        cb_ceEnable.checked = result.ce_enable;
    }
);

cb_hlEnable.onchange = () => { chrome.storage.local.set({ hl_enable: cb_hlEnable.checked }); };
cb_ceEnable.onchange = () => { chrome.storage.local.set({ ce_enable: cb_ceEnable.checked }); };

// ----------------------------------------------------------------------------
// Switch page
// ----------------------------------------------------------------------------
let bt_switchPage = document.getElementById("switch_page");

bt_switchPage.onclick = () => {
    chrome.tabs.executeScript({ code: "switchPage();" });
}
