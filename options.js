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

let colorPalette = document.createElement("input");
{
    colorPalette.type = "color";
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
        colorPalette.setAttribute("list", "presetColors");
    }
}

let colorSelect = document.createElement("select");
{
    for (let color in colorMap) {
        let option = document.createElement("option");
        option.value = colorMap[color];
        option.innerText = color;
        colorSelect.appendChild(option);
    }
}

function loadHLtable(table) { // Highlight Text
    while (table.firstChild) {
        table.firstChild.remove();
    }
    let heads = ["Index", "Pattern", "Color", "Hint", "Link", "RegExp", "Censitive", "Multiline", "Priority\nUp/Down", "Delete"];
    {
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        for (let head of heads) {
            let th = document.createElement("th");
            th.innerText = head;
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);
    }
    {
        let tbody = document.createElement("tbody");
        loadHLtbody(tbody);
        table.appendChild(tbody);

    }
}

function loadHLtbody(tbody, from_index = 0) {
    chrome.storage.local.get(
        { highlightRules: [] },
        result => {
            let rules = result.highlightRules;
            for (let index = from_index; index < rules.length; index++) {
                {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.colSpan = 10;
                    let hr = document.createElement("hr");
                    td.appendChild(hr);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                {
                    let rule = rules[index];
                    let tr = document.createElement("tr");
                    { // index
                        let td_index = document.createElement("td");
                        td_index.innerText = index;
                        tr.appendChild(td_index);
                    }
                    { // pattern
                        let td_pattern = document.createElement("td");
                        let bt_pattern = document.createElement("button");
                        bt_pattern.innerText = rule["pattern"];
                        bt_pattern.onclick = event => {
                            let target = event.target;
                            let input = prompt("update to:", target.innerText);
                            if (input != null) {
                                target.innerText = input;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index]["pattern"] = input;
                                chrome.storage.local.set({ highlightRules: rules });
                            }
                        };
                        td_pattern.appendChild(bt_pattern);
                        tr.appendChild(td_pattern);
                    }
                    { // color
                        let td_color = document.createElement("td");
                        tr.appendChild(td_color);

                        let input_color = colorPalette.cloneNode(true);
                        td_color.appendChild(input_color);
                        let select = colorSelect.cloneNode(true);
                        td_color.appendChild(select);

                        let color = colorKeywordToHexValue(rule["color"]);
                        if (color) {
                            input_color.value = color;
                            select.value = color;
                        }
                        else {
                            input_color.value = rule["color"];
                            select.value = rule["color"];
                        }

                        input_color.onchange = event => {
                            let target = event.target;
                            select.value = target.value;
                            let index = Number(target.parentNode.parentNode.firstChild.innerText);
                            rules[index]["color"] = target.value;
                            chrome.storage.local.set({ highlightRules: rules });
                        };

                        select.onchange = event => {
                            let target = event.target;
                            input_color.value = target.value;
                            let index = Number(target.parentNode.parentNode.firstChild.innerText);
                            rules[index]["color"] = target.value;
                            chrome.storage.local.set({ highlightRules: rules });
                        };
                    }
                    { // hint
                        let td_hint = document.createElement("td");
                        let bt_hint = document.createElement("button");
                        bt_hint.innerText = rule["hint"];
                        bt_hint.onclick = event => {
                            let target = event.target;
                            let input = prompt("update to:", target.innerText);
                            if (input != null) {
                                target.innerText = input;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index]["hint"] = input;
                                chrome.storage.local.set({ highlightRules: rules });
                            }
                        };
                        td_hint.appendChild(bt_hint);
                        tr.appendChild(td_hint);
                    }
                    { // link
                        let td_link = document.createElement("td");
                        let bt_link = document.createElement("button");
                        bt_link.innerText = rule["link"];
                        bt_link.onclick = event => {
                            let target = event.target;
                            let input = prompt("update to:", target.innerText);
                            if (input != null) {
                                target.innerText = input;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index]["link"] = input;
                                chrome.storage.local.set({ highlightRules: rules });
                            }
                        };
                        td_link.appendChild(bt_link);
                        tr.appendChild(td_link);
                    }
                    { // isRegExp
                        let td_RegExp = document.createElement("td");
                        let input_RegExp = document.createElement("input");
                        input_RegExp.type = "checkbox";
                        input_RegExp.checked = rule.isRegExp;
                        input_RegExp.onchange = event => {
                            let target = event.target;
                            let index = Number(target.parentNode.parentNode.firstChild.innerText);
                            rules[index]["isRegExp"] = target.checked;
                            chrome.storage.local.set({ highlightRules: rules });
                        }
                        td_RegExp.appendChild(input_RegExp);
                        tr.appendChild(td_RegExp);
                    }
                    { // isCensitive
                        let td_Censitive = document.createElement("td");
                        let input_Censitive = document.createElement("input");
                        input_Censitive.type = "checkbox";
                        input_Censitive.checked = rule.isCensitive;
                        input_Censitive.onchange = event => {
                            let target = event.target;
                            let index = Number(target.parentNode.parentNode.firstChild.innerText);
                            rules[index]["isCensitive"] = target.checked;
                            chrome.storage.local.set({ highlightRules: rules });
                        }
                        td_Censitive.appendChild(input_Censitive);
                        tr.appendChild(td_Censitive);
                    }
                    { // isMultiline
                        let td_Multiline = document.createElement("td");
                        let input_Multiline = document.createElement("input");
                        input_Multiline.type = "checkbox";
                        input_Multiline.checked = rule.isMultiline;
                        input_Multiline.onchange = event => {
                            let target = event.target;
                            let index = Number(target.parentNode.parentNode.firstChild.innerText);
                            rules[index]["isMultiline"] = target.checked;
                            chrome.storage.local.set({ highlightRules: rules });
                        }
                        td_Multiline.appendChild(input_Multiline);
                        tr.appendChild(td_Multiline);
                    }
                    { // priority
                        let td_priority = document.createElement("td");
                        tr.appendChild(td_priority);
                        { // up
                            let bt_up = document.createElement("button");
                            bt_up.innerText = "U";
                            bt_up.onclick = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                if (index == 0) return;
                                let tmp = rules[index];
                                rules[index] = rules[index - 1];
                                rules[index - 1] = tmp;
                                chrome.storage.local.set({ highlightRules: rules });
                                let tr_targ = target.parentNode.parentNode;
                                let tr_line = tr_targ.previousSibling;
                                tr_targ.previousSibling.previousSibling.before(tr_targ);
                                tr_targ.after(tr_line);
                                let children = tbody.children;
                                for (let i = 1, j = 0; i < children.length; i += 2, j++) {
                                    children[i].firstChild.innerText = j;
                                }
                            };
                            td_priority.appendChild(bt_up);
                        }
                        { // down
                            let bt_down = document.createElement("button");
                            bt_down.innerText = "D";
                            bt_down.onclick = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                if (index == rules.length - 1) return;
                                let tmp = rules[index];
                                rules[index] = rules[index + 1];
                                rules[index + 1] = tmp;
                                chrome.storage.local.set({ highlightRules: rules });
                                let tr_targ = target.parentNode.parentNode;
                                let tr_line = tr_targ.previousSibling;
                                tr_targ.nextSibling.nextSibling.after(tr_targ);
                                tr_targ.before(tr_line);
                                let children = tbody.children;
                                for (let i = 1, j = 0; i < children.length; i += 2, j++) {
                                    children[i].firstChild.innerText = j;
                                }
                            };
                            td_priority.appendChild(bt_down);
                        }
                    }
                    { // Delete
                        let td_delete = document.createElement("td");
                        let bt_delete = document.createElement("button");
                        bt_delete.innerText = "Del";
                        bt_delete.onclick = event => {
                            let target = event.target;
                            let index = Number(target.parentNode.parentNode.firstChild.innerText);
                            rules.splice(index, 1);
                            chrome.storage.local.set({ highlightRules: rules });
                            target.parentNode.parentNode.previousSibling.remove();
                            target.parentNode.parentNode.remove();
                            let children = tbody.children;
                            for (let i = 1, j = 0; i < children.length; i += 2, j++) {
                                children[i].firstChild.innerText = j;
                            }
                        }
                        td_delete.appendChild(bt_delete);
                        tr.appendChild(td_delete);
                    }
                    tbody.appendChild(tr);
                }
            }
        }
    );
}

function loadCEtable(table) { // Collapse/Expand
    while (table.firstChild) {
        table.firstChild.remove();
    }
    let heads = ["Index", "Start\nEnd", "Pattern", "Color", "Hint", "Link", "RegExp", "Censitive", "Multiline", "Priority\nUp/Down", "Delete"];
    {
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        for (let head of heads) {
            let th = document.createElement("th");
            th.innerText = head;
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);
    }
    {
        let tbody = document.createElement("tbody");
        loadCEtbody(tbody);
        table.appendChild(tbody);
    }
}

function loadCEtbody(tbody, from_index = 0) {
    chrome.storage.local.get(
        { collapseExpandRules: [] },
        result => {
            let rules = result.collapseExpandRules;
            for (let index = from_index; index < rules.length; index++) {
                {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    td.colSpan = 11;
                    let hr = document.createElement("hr");
                    td.appendChild(hr);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                {
                    let rule = rules[index];
                    let tr_start = document.createElement("tr");
                    tbody.appendChild(tr_start);
                    let tr_end = document.createElement("tr");
                    tbody.appendChild(tr_end);

                    let td_index = document.createElement("td");
                    td_index.innerText = index;
                    td_index.rowSpan = 2;
                    tr_start.appendChild(td_index);


                    {
                        s_rule = rule.start;
                        let td_start = document.createElement("td");
                        td_start.innerText = "Start";
                        tr_start.appendChild(td_start);
                        { // pattern
                            let td_pattern = document.createElement("td");
                            let bt_pattern = document.createElement("button");
                            bt_pattern.innerText = s_rule["pattern"];
                            bt_pattern.onclick = event => {
                                let target = event.target;
                                let input = prompt("update to:", target.innerText);
                                if (input != null) {
                                    target.innerText = input;
                                    let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                    rules[index].start["pattern"] = input;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                }
                            };
                            td_pattern.appendChild(bt_pattern);
                            tr_start.appendChild(td_pattern);
                        }
                        { // color
                            let td_color = document.createElement("td");
                            tr_start.appendChild(td_color);

                            let input_color = colorPalette.cloneNode(true);
                            td_color.appendChild(input_color);
                            let select = colorSelect.cloneNode(true);
                            td_color.appendChild(select);

                            let color = colorKeywordToHexValue(s_rule["color"]);
                            if (color) {
                                input_color.value = color;
                                select.value = color;
                            }
                            else {
                                input_color.value = s_rule["color"];
                                select.value = s_rule["color"];
                            }

                            input_color.onchange = event => {
                                let target = event.target;
                                select.value = target.value;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index].start["color"] = target.value;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            };

                            select.onchange = event => {
                                let target = event.target;
                                input_color.value = target.value;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index].start["color"] = target.value;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            };
                        }
                        { // hint
                            let td_hint = document.createElement("td");
                            let bt_hint = document.createElement("button");
                            bt_hint.innerText = s_rule["hint"];
                            bt_hint.onclick = event => {
                                let target = event.target;
                                let input = prompt("update to:", target.innerText);
                                if (input != null) {
                                    target.innerText = input;
                                    let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                    rules[index].start["hint"] = input;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                }
                            };
                            td_hint.appendChild(bt_hint);
                            tr_start.appendChild(td_hint);
                        }
                        { // link
                            let td_link = document.createElement("td");
                            let bt_link = document.createElement("button");
                            bt_link.innerText = s_rule["link"];
                            bt_link.onclick = event => {
                                let target = event.target;
                                let input = prompt("update to:", target.innerText);
                                if (input != null) {
                                    target.innerText = input;
                                    let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                    rules[index].start["link"] = input;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                }
                            };
                            td_link.appendChild(bt_link);
                            tr_start.appendChild(td_link);
                        }
                        { // isRegExp
                            let td_RegExp = document.createElement("td");
                            let input_RegExp = document.createElement("input");
                            input_RegExp.type = "checkbox";
                            input_RegExp.checked = s_rule.isRegExp;
                            input_RegExp.onchange = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index].start["isRegExp"] = target.checked;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            }
                            td_RegExp.appendChild(input_RegExp);
                            tr_start.appendChild(td_RegExp);
                        }
                        { // isCensitive
                            let td_Censitive = document.createElement("td");
                            let input_Censitive = document.createElement("input");
                            input_Censitive.type = "checkbox";
                            input_Censitive.checked = s_rule.isCensitive;
                            input_Censitive.onchange = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index].start["isCensitive"] = target.checked;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            }
                            td_Censitive.appendChild(input_Censitive);
                            tr_start.appendChild(td_Censitive);
                        }
                        { // isMultiline
                            let td_Multiline = document.createElement("td");
                            let input_Multiline = document.createElement("input");
                            input_Multiline.type = "checkbox";
                            input_Multiline.checked = s_rule.isMultiline;
                            input_Multiline.onchange = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[index].start["isMultiline"] = target.checked;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            }
                            td_Multiline.appendChild(input_Multiline);
                            tr_start.appendChild(td_Multiline);
                        }
                        { // priority
                            let td_priority = document.createElement("td");
                            td_priority.rowSpan = 2;
                            tr_start.appendChild(td_priority);
                            { // up
                                let bt_up = document.createElement("button");
                                bt_up.innerText = "U";
                                bt_up.onclick = event => {
                                    let target = event.target;
                                    let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                    if (index == 0) return;
                                    let tmp = rules[index];
                                    rules[index] = rules[index - 1];
                                    rules[index - 1] = tmp;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                    let tr_start = target.parentNode.parentNode;
                                    let tr_end = tr_start.nextSibling;
                                    let tr_line = tr_start.previousSibling;
                                    tr_start.previousSibling.previousSibling.previousSibling.before(tr_start);
                                    tr_start.after(tr_end);
                                    tr_end.after(tr_line);
                                    let children = tbody.children;
                                    for (let i = 1, j = 0; i < children.length; i += 3, j++) {
                                        children[i].firstChild.innerText = j;
                                    }
                                };
                                td_priority.appendChild(bt_up);
                            }
                            { // down
                                let bt_down = document.createElement("button");
                                bt_down.innerText = "D";
                                bt_down.onclick = event => {
                                    let target = event.target;
                                    let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                    if (index == rules.length - 1) return;
                                    let tmp = rules[index];
                                    rules[index] = rules[index + 1];
                                    rules[index + 1] = tmp;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                    let tr_start = target.parentNode.parentNode;
                                    let tr_end = tr_start.nextSibling;
                                    let tr_line = tr_start.previousSibling;
                                    tr_start.nextSibling.nextSibling.nextSibling.nextSibling.after(tr_start);
                                    tr_start.after(tr_end);
                                    tr_start.before(tr_line);
                                    let children = tbody.children;
                                    for (let i = 1, j = 0; i < children.length; i += 3, j++) {
                                        children[i].firstChild.innerText = j;
                                    }
                                };
                                td_priority.appendChild(bt_down);
                            }
                        }
                        { // Delete
                            let td_delete = document.createElement("td");
                            td_delete.rowSpan = 2;
                            let bt_delete = document.createElement("button");
                            bt_delete.innerText = "Del";
                            bt_delete.onclick = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules.splice(index, 1);
                                chrome.storage.local.set({ collapseExpandRules: rules });
                                target.parentNode.parentNode.previousSibling.remove();
                                target.parentNode.parentNode.nextSibling.remove();
                                target.parentNode.parentNode.remove();
                                let children = tbody.children;
                                for (let i = 1, j = 0; i < children.length; i += 3, j++) {
                                    children[i].firstChild.innerText = j;
                                }
                            }
                            td_delete.appendChild(bt_delete);
                            tr_start.appendChild(td_delete);
                        }
                    }
                    {
                        e_rule = rule.end;
                        let td_end = document.createElement("td");
                        td_end.innerText = "End";
                        tr_end.appendChild(td_end);
                        { // pattern
                            let td_pattern = document.createElement("td");
                            let bt_pattern = document.createElement("button");
                            bt_pattern.innerText = e_rule["pattern"];
                            bt_pattern.onclick = event => {
                                let target = event.target;
                                let input = prompt("update to:", target.innerText);
                                if (input != null) {
                                    target.innerText = input;
                                    let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                    rules[index].end["pattern"] = input;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                }
                            };
                            td_pattern.appendChild(bt_pattern);
                            tr_end.appendChild(td_pattern);
                        }
                        { // color
                            let td_color = document.createElement("td");
                            tr_end.appendChild(td_color);

                            let input_color = colorPalette.cloneNode(true);
                            td_color.appendChild(input_color);
                            let select = colorSelect.cloneNode(true);
                            td_color.appendChild(select);

                            let color = colorKeywordToHexValue(e_rule["color"]);
                            if (color) {
                                input_color.value = color;
                                select.value = color;
                            }
                            else {
                                input_color.value = e_rule["color"];
                                select.value = e_rule["color"];
                            }

                            input_color.onchange = event => {
                                let target = event.target;
                                select.value = target.value;
                                let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                rules[index].end["color"] = target.value;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            };

                            select.onchange = event => {
                                let target = event.target;
                                input_color.value = target.value;
                                let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                rules[index].end["color"] = target.value;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            };
                        }
                        { // hint
                            let td_hint = document.createElement("td");
                            let bt_hint = document.createElement("button");
                            bt_hint.innerText = e_rule["hint"];
                            bt_hint.onclick = event => {
                                let target = event.target;
                                let input = prompt("update to:", target.innerText);
                                if (input != null) {
                                    target.innerText = input;
                                    let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                    rules[index].end["hint"] = input;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                }
                            };
                            td_hint.appendChild(bt_hint);
                            tr_end.appendChild(td_hint);
                        }
                        { // link
                            let td_link = document.createElement("td");
                            let bt_link = document.createElement("button");
                            bt_link.innerText = e_rule["link"];
                            bt_link.onclick = event => {
                                let target = event.target;
                                let input = prompt("update to:", target.innerText);
                                if (input != null) {
                                    target.innerText = input;
                                    let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                    rules[index].end["link"] = input;
                                    chrome.storage.local.set({ collapseExpandRules: rules });
                                }
                            };
                            td_link.appendChild(bt_link);
                            tr_end.appendChild(td_link);
                        }
                        { // isRegExp
                            let td_RegExp = document.createElement("td");
                            let input_RegExp = document.createElement("input");
                            input_RegExp.type = "checkbox";
                            input_RegExp.checked = e_rule.isRegExp;
                            input_RegExp.onchange = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                rules[index].end["isRegExp"] = target.checked;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            }
                            td_RegExp.appendChild(input_RegExp);
                            tr_end.appendChild(td_RegExp);
                        }
                        { // isCensitive
                            let td_Censitive = document.createElement("td");
                            let input_Censitive = document.createElement("input");
                            input_Censitive.type = "checkbox";
                            input_Censitive.checked = e_rule.isCensitive;
                            input_Censitive.onchange = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                rules[index].end["isCensitive"] = target.checked;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            }
                            td_Censitive.appendChild(input_Censitive);
                            tr_end.appendChild(td_Censitive);
                        }
                        { // isMultiline
                            let td_Multiline = document.createElement("td");
                            let input_Multiline = document.createElement("input");
                            input_Multiline.type = "checkbox";
                            input_Multiline.checked = e_rule.isMultiline;
                            input_Multiline.onchange = event => {
                                let target = event.target;
                                let index = Number(target.parentNode.parentNode.previousSibling.firstChild.innerText);
                                rules[index].end["isMultiline"] = target.checked;
                                chrome.storage.local.set({ collapseExpandRules: rules });
                            }
                            td_Multiline.appendChild(input_Multiline);
                            tr_end.appendChild(td_Multiline);
                        }
                    }
                }
            }
        }
    );
}

loadHLtable(document.getElementById("hl_rules"));
loadCEtable(document.getElementById("ce_rules"));

let buttonExport = document.getElementById("export");
let buttonImport = document.getElementById("import");
let buttonAppend = document.getElementById("append");
let buttonReset = document.getElementById("reset");
let textareaPortal = document.getElementById("portal");

buttonExport.onclick = () => {
    chrome.storage.local.get(
        {
            formatVersion: "0.0",
            highlightRules: [],
            collapseExpandRules: [],
        },
        result => {
            textareaPortal.value = JSON.stringify(result);
        }
    );
};

buttonImport.onclick = () => {
    let {
        formatVersion = "0.0",
        highlightRules = [],
        collapseExpandRules = [],
    } = JSON.parse(textareaPortal.value);
    chrome.storage.local.set(
        {
            formatVersion,
            highlightRules,
            collapseExpandRules,
        }
    );
    loadHLtable(document.getElementById("hl_rules"));
    loadCEtable(document.getElementById("ce_rules"));
};

buttonAppend.onclick = () => {
    let {
        formatVersion = "0.0",
        highlightRules = [],
        collapseExpandRules = [],
    } = JSON.parse(textareaPortal.value);
    chrome.storage.local.get(
        {
            formatVersion: "0.0",
            highlightRules: [],
            collapseExpandRules: [],
        },
        result => {
            let hl_length = result.highlightRules.length;
            result.highlightRules = result.highlightRules.concat(highlightRules);
            let ce_length = result.collapseExpandRules.length;
            result.collapseExpandRules = result.collapseExpandRules.concat(collapseExpandRules);
            chrome.storage.local.set(result);
            let hl_table = document.getElementById("hl_rules");
            let hl_tbody = hl_table.lastChild;
            loadHLtbody(hl_tbody, hl_length);
            let ce_table = document.getElementById("ce_rules");
            let ce_tbody = ce_table.lastChild;
            loadCEtbody(ce_tbody, ce_length);
        }
    );
};

buttonReset.onclick = () => {
    chrome.storage.local.get("defaultRules", result => {
        chrome.storage.local.set(result.defaultRules);
        loadHLtable(document.getElementById("hl_rules"));
        loadCEtable(document.getElementById("ce_rules"));
    });
};

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        if (namespace == "local") {
            if (key == "hl_rule_add" && storageChange.newValue) {
                let hl_table = document.getElementById("hl_rules");
                let hl_tbody = hl_table.lastChild;
                loadHLtbody(hl_tbody, storageChange.newValue - 1);
                chrome.storage.local.set({ hl_rule_add: 0 });
            }
            else if (key == "ce_rule_add" && storageChange.newValue) {
                let ce_table = document.getElementById("ce_rules");
                let ce_tbody = ce_table.lastChild;
                loadCEtbody(ce_tbody, storageChange.newValue - 1);
                chrome.storage.local.set({ ce_rule_add: 0 });
            }
        }
    }
});
