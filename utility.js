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

// Compare two reObj without compiling them
function compareReObjRule(rule1, rule2) {
    if (rule1.isRegExp != rule2.isRegExp)
        return false;
    if (rule1.isRegExp == false &&
        rule1.pattern != rule2.pattern)
        return false;
    if (rule1.isCensitive != rule2.isCensitive ||
        rule1.isMultiline != rule2.isMultiline ||
        rule1.pattern != rule2.pattern)
        return false;
    return true;
}

// See element.normalize()
function normalize(rootNode = document) {
    if (this.done == undefined) {
        this.done = true;
        rootNode.normalize();
    }
}
