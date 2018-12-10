// ----------------------------------------------------------------------------
// Update options ui when the stored data change.
// ----------------------------------------------------------------------------
// chrome.storage.onChanged.addListener(() => {
//     document.location.reload(true);
// });

// ----------------------------------------------------------------------------
// Export or import rules.
// ----------------------------------------------------------------------------
let buttonImport = document.getElementById("import");
let buttomReset = document.getElementById("reset");
let textareaPortal = document.getElementById("portal");

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
};

buttomReset.onclick = () => {
    chrome.storage.local.get("defaultRules", result => {
        chrome.storage.local.set(result.defaultRules);
    });
};

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

let colorPalette = document.createElement("input");
{
    colorPalette.type = "color";
    {
        let presetColors = document.createElement("datalist");
        presetColors.id = "presetColors";
        let colors = ["red", "yellow", "green"];
        for (let color of colors) {
            let option = document.createElement("option");
            option.value = colorKeywordToHexValue(color);
            presetColors.appendChild(option);
        }
        document.body.appendChild(presetColors);
        colorPalette.setAttribute("list", "presetColors");
    }
}

// ----------------------------------------------------------------------------
// Display and operate on rules.
// ----------------------------------------------------------------------------
{ // Highlight Text
    let table = document.getElementById("hl_rules");
    let heads = ["Index", "Pattern", "Color", "Hint", "Link", "RegExp", "Censitive", "Multiline", "Delete"];
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
        chrome.storage.local.get(
            { highlightRules: [] },
            result => {
                let rules = result.highlightRules;
                for (let row = 0; row < rules.length; row++) {
                    {
                        let tr = document.createElement("tr");
                        let td = document.createElement("td");
                        td.colSpan = heads.length;
                        let hr = document.createElement("hr");
                        td.appendChild(hr);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                    {
                        let rule = rules[row];
                        let tr = document.createElement("tr");
                        { // index
                            let td_index = document.createElement("td");
                            td_index.innerText = row;
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
                                    let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                    rules[row]["pattern"] = input;
                                    chrome.storage.local.set({ highlightRules: rules });
                                }
                            };
                            td_pattern.appendChild(bt_pattern);
                            tr.appendChild(td_pattern);
                        }
                        { // color
                            let td_color = document.createElement("td");
                            let input_color = colorPalette.cloneNode(true);
                            let color = colorKeywordToHexValue(rule["color"]);
                            if (color) input_color.value = color;
                            else input_color.value = rule["color"];
                            input_color.onchange = event => {
                                let target = event.target;
                                let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[row]["color"] = input_color.value;
                                chrome.storage.local.set({ highlightRules: rules });
                            };
                            td_color.appendChild(input_color);
                            tr.appendChild(td_color);
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
                                    let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                    rules[row]["hint"] = input;
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
                                    let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                    rules[row]["link"] = input;
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
                                let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[row]["isRegExp"] = target.checked;
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
                                let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[row]["isCensitive"] = target.checked;
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
                                let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules[row]["isMultiline"] = target.checked;
                                chrome.storage.local.set({ highlightRules: rules });
                            }
                            td_Multiline.appendChild(input_Multiline);
                            tr.appendChild(td_Multiline);
                        }
                        { // Delete
                            let td_delete = document.createElement("td");
                            let bt_delete = document.createElement("button");
                            bt_delete.innerText = "Del";
                            bt_delete.onclick = event => {
                                let target = event.target;
                                let row = Number(target.parentNode.parentNode.firstChild.innerText);
                                rules.splice(row, 1);
                                chrome.storage.local.set({ highlightRules: rules });
                                target.parentNode.parentNode.previousSibling.remove();
                                target.parentNode.parentNode.remove();
                                let children = tbody.children;
                                for (let i = 0; i < children.length; i++) {
                                    children[i * 2 + 1].firstChild.innerText = i;
                                }
                            }
                            td_delete.appendChild(bt_delete);
                            tr.appendChild(td_delete);
                        }
                        tbody.appendChild(tr);
                    }
                }
                table.appendChild(tbody);
            }
        );
    }
}

{ // Collapse/Expand
    let table = document.getElementById("ce_rules");
    let heads = ["Index", "Start\nEnd", "Pattern", "Color", "Hint", "Link", "RegExp", "Censitive", "Multiline", "Delete"];
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
        chrome.storage.local.get(
            { collapseExpandRules: [] },
            result => {
                let rules = result.collapseExpandRules;
                for (let row = 0; row < rules.length; row++) {
                    {
                        let tr = document.createElement("tr");
                        let td = document.createElement("td");
                        td.colSpan = heads.length;
                        let hr = document.createElement("hr");
                        td.appendChild(hr);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                    {
                        let rule = rules[row];
                        let tr = document.createElement("tr");
                        tbody.appendChild(tr);
                        let td = document.createElement("td");
                        tr.appendChild(td);
                        

                    //     let s_rule = rule.start;
                    //     let th = document.createElement("th");
                    //     th.innerText = "start";
                    //     tr.appendChild(th);
                    //     for (let col = 0; col < keys.length; col++) {
                    //         let key = keys[col];
                    //         let td = document.createElement("td");
                    //         let button = document.createElement("button");
                    //         button.innerText = s_rule[key];
                    //         button.id = "index_" + row + "_" + col;
                    //         button.onclick = event => {
                    //             let [_, row, col] = event.target.id.split("_");
                    //             let input = prompt("update to:", event.target.innerText);
                    //             if (col == 4 || col == 5 || col == 6) {
                    //                 if (input == "true") input = true;
                    //                 else if (input == "false") input = false;
                    //             }
                    //             rules[row].start[keys[col]] = input;
                    //             chrome.storage.local.set({ collapseExpandRules: rules });
                    //         }
                    //         td.appendChild(button);
                    //         tr.appendChild(td);
                    //     }
                    //     let td = document.createElement("td");
                    //     let button = document.createElement("button");
                    //     button.innerText = "delete";
                    //     button.id = "index_" + row;
                    //     button.onclick = event => {
                    //         let [_, row] = event.target.id.split("_");
                    //         rules.splice(row, 1);
                    //         chrome.storage.local.set({ collapseExpandRules: rules });
                    //         document.location.reload(true);
                    //     }
                    //     td.appendChild(button);
                    //     tr.appendChild(td);
                    //     tbody.appendChild(tr);
                    // }
                    // {
                    //     let tr = document.createElement("tr");
                    //     let e_rule = rule.end;
                    //     let th = document.createElement("th");
                    //     th.innerText = "end";
                    //     tr.appendChild(th);
                    //     for (let col = 0; col < keys.length; col++) {
                    //         let key = keys[col];
                    //         let td = document.createElement("td");
                    //         let button = document.createElement("button");
                    //         button.innerText = e_rule[key];
                    //         button.id = "index_" + row + "_" + col;
                    //         button.onclick = event => {
                    //             let [_, row, col] = event.target.id.split("_");
                    //             let input = prompt("update to:", event.target.innerText);
                    //             if (col == 4 || col == 5 || col == 6) {
                    //                 if (input == "true") input = true;
                    //                 else if (input == "false") input = false;
                    //             }
                    //             rules[row].end[keys[col]] = input;
                    //             chrome.storage.local.set({ collapseExpandRules: rules });
                    //         }
                    //         td.appendChild(button);
                    //         tr.appendChild(td);
                    //     }
                    //     let td = document.createElement("td");
                    //     let button = document.createElement("button");
                    //     button.innerText = "delete";
                    //     button.id = "index_" + row;
                    //     button.onclick = event => {
                    //         let [_, row] = event.target.id.split("_");
                    //         rules.splice(row, 1);
                    //         chrome.storage.local.set({ collapseExpandRules: rules });
                    //         document.location.reload(true);
                    //     }
                    //     td.appendChild(button);
                    //     tr.appendChild(td);
                    //     tbody.appendChild(tr);
                    }
                }
            }
        )
        table.appendChild(tbody);
    }
}

// Collapse and expand.
// {
//     let thead = document.createElement("thead");
//     let tr = document.createElement("tr");
//     let th = document.createElement("ht");
//     tr.appendChild(th);
//     for (let head of heads) {
//         let th = document.createElement("th");
//         th.style.scope
//         th.innerText = head;
//         tr.appendChild(th);
//     }
//     thead.appendChild(tr);
//     table.appendChild(thead);
// }
// {
// }



function colorKeywordToHexValue(keyword) {
    let colors = {
        "black": "#000000", "silver": "#c0c0c0", "gray": "#808080", "white": "#ffffff", "maroon": "#800000",
        "red": "#ff0000", "purple": "#800080", "fuchsia": "#ff00ff", "green": "#008000", "lime": "#00ff00",
        "olive": "#808000", "yellow": "#ffff00", "navy": "#000080", "blue": "#0000ff", "teal": "#008080",
        "aqua": "#00ffff", "orange": "#ffa500", "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aquamarine": "#7fffd4",
        "azure": "#f0ffff", "beige": "#f5f5dc", "bisque": "#ffe4c4", "blanchedalmond": "#ffebcd", "blueviolet": "#8a2be2",
        "brown": "#a52a2a", "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e",
        "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
        "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400",
        "darkgrey": "#a9a9a9", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f", "darkorange": "#ff8c00",
        "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f", "darkslategrey": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3", "deeppink": "#ff1493",
        "deepskyblue": "#00bfff", "dimgray": "#696969", "dimgrey": "#696969", "dodgerblue": "#1e90ff", "firebrick": "#b22222",
        "floralwhite": "#fffaf0", "forestgreen": "#228b22", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700",
        "goldenrod": "#daa520", "greenyellow": "#adff2f", "grey": "#808080", "honeydew": "#f0fff0", "hotpink": "#ff69b4",
        "indianred": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080",
        "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2", "lightgray": "#d3d3d3", "lightgreen": "#90ee90", "lightgrey": "#d3d3d3",
        "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899",
        "lightslategrey": "#778899", "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "limegreen": "#32cd32", "linen": "#faf0e6",
        "magenta": "#ff00ff", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370db",
        "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585",
        "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5", "navajowhite": "#ffdead",
        "oldlace": "#fdf5e6", "olivedrab": "#6b8e23", "orangered": "#ff4500", "orchid": "#da70d6", "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#db7093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9",
        "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1", "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57",
        "seashell": "#fff5ee", "sienna": "#a0522d", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090",
        "slategrey": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4", "tan": "#d2b48c",
        "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3",
        "whitesmoke": "#f5f5f5", "yellowgreen": "#9acd32", "rebeccapurple": "#663399",
    };
    if (typeof colors[keyword.toLowerCase()] != 'undefined')
        return colors[keyword.toLowerCase()];
    return false;
}

