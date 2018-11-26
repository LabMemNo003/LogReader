let buttonImport = document.getElementById("import");
let textareaPortal = document.getElementById("portal");

buttonImport.onclick = () => {
    rules = JSON.parse(textareaPortal.value);
    chrome.storage.local.set({ rules });
}

chrome.storage.local.get(
    { rules: [] },
    result => {
        textareaPortal.value = JSON.stringify(result.rules);
    }
);

let keys = ["pattern", "color", "hint", "link", "isRegExp", "isCensitive", "isMultiline"];
let tableRules = document.getElementById("rules");
{
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    for (let key of keys) {
        let th = document.createElement("th");
        th.innerHTML = key;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    tableRules.appendChild(thead);
}
{
    let tbody = document.createElement("tbody");
    chrome.storage.local.get(
        { rules: [] },
        result => {
            let rules = result.rules;
            for (let row = 0; row < rules.length; row++) {
                let rule = rules[row];
                let tr = document.createElement("tr");
                for (let col = 0; col < keys.length; col++) {
                    let key = keys[col];
                    let td = document.createElement("td");
                    let button = document.createElement("button");
                    button.innerHTML = rule[key];
                    button.id = "index_" + row + "_" + col;
                    button.onclick = event => {
                        let [_, row, col] = event.target.id.split("_");
                        let input = prompt("update to:");
                        if (col == 4 || col == 5 || col == 6) {
                            if (input == "true") input = true;
                            else if (input == "false") input = false;
                        }
                        rules[row][keys[col]] = input;
                        chrome.storage.local.set({ rules });
                        document.location.reload(true);
                    }
                    td.appendChild(button);
                    tr.appendChild(td);
                }
                let td = document.createElement("td");
                let button = document.createElement("button");
                button.innerHTML = "delete";
                button.id = "index_" + row;
                button.onclick = event => {
                    let [_, row] = event.target.id.split("_");
                    rules.splice(row, 1);
                    chrome.storage.local.set({ rules });
                    document.location.reload(true);
                }
                td.appendChild(button);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    )
    tableRules.appendChild(tbody);
}
