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

// Summarize a rule into sting
function summarizeReObjRule(rule, showHint = true, showLink = false, separator = "  ") {
    let strArr = [];

    let pattern = "pattern: " + rule.pattern;
    strArr.push(pattern);

    let flag = "flag: ";
    if (rule.isRegExp) flag += "r";
    if (rule.isCensitive) flag += "c";
    if (rule.isMultiline) flag += "m";
    strArr.push(flag);

    if (showHint) {
        let hint = "hint: " + rule.hint;
        strArr.push(hint);
    }

    if (showLink) {
        let link = "link: " + rule.link;
        strArr.push(link);
    }
    return "[ " + strArr.join(separator) + " ]";
}

// See element.normalize()
function normalize(rootNode = document) {
    if (this.done == undefined) {
        this.done = true;
        rootNode.normalize();
    }
}
