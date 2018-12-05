// ----------------------------------------------------------------------------
// Update options ui when the stored data change.
// ----------------------------------------------------------------------------
chrome.storage.onChanged.addListener(() => {
    document.location.reload(true);
});

// ----------------------------------------------------------------------------
// Export or import rules.
// ----------------------------------------------------------------------------
let buttonImport = document.getElementById("import");
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
}

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

// ----------------------------------------------------------------------------
// Display and operate on rules.
// ----------------------------------------------------------------------------
let heads = ["pattern", "color", "hint", "link", "isRegExp", "isCensitive", "isMultiline"];
let keys = ["pattern", "color", "hint", "link", "isRegExp", "isCensitive", "isMultiline"];

// Highlight text.
let hl_tableRules = document.getElementById("hl_rules");
{
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    for (let head of heads) {
        let th = document.createElement("th");
        th.style.scope
        th.innerText = head;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    hl_tableRules.appendChild(thead);
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
                    td.colSpan = 7;
                    let hr = document.createElement("hr");
                    td.appendChild(hr);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                let rule = rules[row];
                let tr = document.createElement("tr");
                for (let col = 0; col < keys.length; col++) {
                    let key = keys[col];
                    let td = document.createElement("td");
                    let button = document.createElement("button");
                    button.innerText = rule[key];
                    button.id = "index_" + row + "_" + col;
                    button.onclick = event => {
                        let [_, row, col] = event.target.id.split("_");
                        let input = prompt("update to:", event.target.innerText);
                        if (col == 4 || col == 5 || col == 6) {
                            if (input == "true") input = true;
                            else if (input == "false") input = false;
                        }
                        rules[row][keys[col]] = input;
                        chrome.storage.local.set({ highlightRules: rules });
                    }
                    td.appendChild(button);
                    tr.appendChild(td);
                }
                let td = document.createElement("td");
                let button = document.createElement("button");
                button.innerText = "delete";
                button.id = "index_" + row;
                button.onclick = event => {
                    let [_, row] = event.target.id.split("_");
                    rules.splice(row, 1);
                    chrome.storage.local.set({ highlightRules: rules });
                    document.location.reload(true);
                }
                td.appendChild(button);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    )
    hl_tableRules.appendChild(tbody);
}

// Collapse and expand.
let ce_tableRules = document.getElementById("ce_rules");
{
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th = document.createElement("ht");
    tr.appendChild(th);
    for (let head of heads) {
        let th = document.createElement("th");
        th.style.scope
        th.innerText = head;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    ce_tableRules.appendChild(thead);
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
                    let hr = document.createElement("hr");
                    td.appendChild(hr);
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.colSpan = 7;
                    hr = document.createElement("hr");
                    td.appendChild(hr);
                    tr.appendChild(td);

                    tbody.appendChild(tr);
                }
                let rule = rules[row];
                {
                    let tr = document.createElement("tr");
                    let s_rule = rule.start;
                    let th = document.createElement("th");
                    th.innerText = "start";
                    tr.appendChild(th);
                    for (let col = 0; col < keys.length; col++) {
                        let key = keys[col];
                        let td = document.createElement("td");
                        let button = document.createElement("button");
                        button.innerText = s_rule[key];
                        button.id = "index_" + row + "_" + col;
                        button.onclick = event => {
                            let [_, row, col] = event.target.id.split("_");
                            let input = prompt("update to:");
                            if (col == 4 || col == 5 || col == 6) {
                                if (input == "true") input = true;
                                else if (input == "false") input = false;
                            }
                            rules[row].start[keys[col]] = input;
                            chrome.storage.local.set({ collapseExpandRules: rules });
                        }
                        td.appendChild(button);
                        tr.appendChild(td);
                    }
                    let td = document.createElement("td");
                    let button = document.createElement("button");
                    button.innerText = "delete";
                    button.id = "index_" + row;
                    button.onclick = event => {
                        let [_, row] = event.target.id.split("_");
                        rules.splice(row, 1);
                        chrome.storage.local.set({ collapseExpandRules: rules });
                        document.location.reload(true);
                    }
                    td.appendChild(button);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                {
                    let tr = document.createElement("tr");
                    let e_rule = rule.end;
                    let th = document.createElement("th");
                    th.innerText = "end";
                    tr.appendChild(th);
                    for (let col = 0; col < keys.length; col++) {
                        let key = keys[col];
                        let td = document.createElement("td");
                        let button = document.createElement("button");
                        button.innerText = e_rule[key];
                        button.id = "index_" + row + "_" + col;
                        button.onclick = event => {
                            let [_, row, col] = event.target.id.split("_");
                            let input = prompt("update to:", event.target.innerText);
                            if (col == 4 || col == 5 || col == 6) {
                                if (input == "true") input = true;
                                else if (input == "false") input = false;
                            }
                            rules[row].end[keys[col]] = input;
                            chrome.storage.local.set({ collapseExpandRules: rules });
                        }
                        td.appendChild(button);
                        tr.appendChild(td);
                    }
                    let td = document.createElement("td");
                    let button = document.createElement("button");
                    button.innerText = "delete";
                    button.id = "index_" + row;
                    button.onclick = event => {
                        let [_, row] = event.target.id.split("_");
                        rules.splice(row, 1);
                        chrome.storage.local.set({ collapseExpandRules: rules });
                        document.location.reload(true);
                    }
                    td.appendChild(button);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
            }
        }
    )
    ce_tableRules.appendChild(tbody);
}
