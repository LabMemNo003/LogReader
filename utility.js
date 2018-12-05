// Use the rule read from local storage to create a regular expression object.
function createGlobalReObj({ pattern, isRegExp, isCensitive, isMultiline }) {
    return createReObj({ pattern, isRegExp, isCensitive, isMultiline }, "g");
}

// Use the rule read from local storage to create a regular expression object.
function createReObj({ pattern, isRegExp, isCensitive, isMultiline }, flag = "") {
    if (isRegExp) {
        if (!isCensitive) flag += "i";
        if (isMultiline) flag += "m";
    }
    else {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    let reObj = new RegExp(pattern, flag);
    return reObj;
}

// See element.normalize()
function normalize(rootNode = document) {
    if (this.done == undefined) {
        this.done = true;
        rootNode.normalize();
    }
}
