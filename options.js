let inputIndex = document.getElementById("index");
let buttonRemove = document.getElementById("remove");
let buttonRemoveAll = document.getElementById("removeAll");
let buttonImport = document.getElementById("import");
let textareaRules = document.getElementById("rules");

buttonRemove.onclick = () => {
    let index = Number(inputIndex.value);
    chrome.storage.local.get(
        { rules: [] },
        result => {
            result.rules.splice(index, 1);
            chrome.storage.local.set({ rules: result.rules });
        }
    )
    document.location.reload(true);
};

buttonRemoveAll.onclick = () => {
    chrome.storage.local.set({ rules: [] });
    document.location.reload(true);
}

buttonImport.onclick = () => {
    rules = JSON.parse(textareaRules.value);
    chrome.storage.local.set({ rules });
}

chrome.storage.local.get(
    { rules: [] },
    result => {
        textareaRules.value = JSON.stringify(result.rules);
    }
);
