const LABEL = {
    classText: "log_reader_text",
    classHint: "log_reader_hint",
    classLink: "log_reader_link",
    classWhiteList: "log_reader_white_list",
}

function unionTextNodes() {

}

function wrapPlainText(targText, callback = (curNode, record = {}) => { }, record = {}, rootNode = document) {

    let stack = [rootNode];
    while (stack.length) {
        let node = stack.pop();

        if (node instanceof Element &&
            node.classList.contains(LABEL.classWhiteList)) {
            continue;
        }

        let child = node.lastChild;
        while (child) {
            stack.push(child);
            child = child.previousSibling;
        }

        if (node instanceof Text) {
            while (true) {
                let text = node.data;

                let index = text.indexOf(targText);
                if (index == -1) {
                    break;
                }

                let foreText = text.substr(0, index);
                let foreNode = document.createTextNode(foreText);

                let targNode = document.createElement("span");
                targNode.classList.add(LABEL.classWhiteList);
                targNode.classList.add(LABEL.classText);
                targNode.innerHTML = targText;
                callback(targNode, record);

                let tailText = text.substr(index + targText.length);
                let tailNode = document.createTextNode(tailText);

                node.replaceWith(tailNode);
                node = tailNode;
                node.before(foreText);
                node.before(targNode);
            }
        }
    }
    return record;
}

// Do not use global match.
function wrapMatchedText(targReObj, callback = (curNode, record = {}) => { }, record = {}, rootNode = document) {

    let stack = [rootNode];
    while (stack.length) {
        let node = stack.pop();

        if (node instanceof Element &&
            node.classList.contains(LABEL.classWhiteList)) {
            continue;
        }

        let child = node.lastChild;
        while (child) {
            stack.push(child);
            child = child.previousSibling;
        }

        if (node instanceof Text) {
            while (true) {
                let text = node.data;

                let match = targReObj.exec(text);
                if (match == null) {
                    break;
                }

                let foreText = text.substr(0, match.index);
                let foreNode = document.createTextNode(foreText);

                let targNode = document.createElement("span");
                targNode.classList.add(LABEL.classWhiteList);
                targNode.classList.add(LABEL.classText);
                targNode.innerHTML = match[0];
                callback(targNode, record);

                let tailText = text.substr(match.index + match[0].length);
                let tailNode = document.createTextNode(tailText);

                node.replaceWith(tailNode);
                node = tailNode;
                node.before(foreText);
                node.before(targNode);
            }
        }
    }
    return record;
}

function wrapText(targPattern, callback = (curNode, record = {}) => { }, record = {}, rootNode = document) {
    let wrapTextFunc;
    if (typeof targPattern == "string") { //Use typeof for "simple built-in types"
        wrapTextFunc = wrapPlainText;
    }
    else if (targPattern instanceof RegExp) { //Use instanceof for "custom types" or "complex built-in types"
        wrapTextFunc = wrapMatchedText;
    }
    else {
        console.log("Error: targPattern should be String or RegExp.");
    }

    return wrapTextFunc(
        targPattern,
        (curNode, record) => {
            callback(curNode, record);

            record.count++;
        },
        Object.assign(
            record,
            {
                count: 0,
            }
        ),
        rootNode
    )
}

function highlightText(targPattern, color = "yellow", hint = undefined, link = undefined) {
    let hintFlag, hintElement;
    if (hint && hint.length) hintFlag = true;

    let linkFlag, linkElement;
    if (link && link.length) linkFlag = true;

    if (hintFlag) {
        hintElement = document.createElement("div");
        hintElement.classList.add(LABEL.classWhiteList);
        hintElement.classList.add(LABEL.classHint);
        hintElement.innerHTML = hint;
        document.body.append(hintElement);
    }

    return wrapText(
        targPattern,
        (curNode, record) => {
            curNode.style.background = color;

            if (hintFlag) {
                curNode.onmouseover = event => {
                    hintElement.style.left = event.pageX + 1 + "px";
                    hintElement.style.top = event.pageY + 1 + "px";
                    hintElement.style.display = "block";
                }
                curNode.onmouseout = () => {
                    hintElement.style.display = "none";
                }
            }

            if (linkFlag) {
                linkElement = document.createElement("a");
                linkElement.classList.add(LABEL.classWhiteList);
                linkElement.classList.add(LABEL.classLink);
                linkElement.href = link;
                linkElement.innerHTML = curNode.innerHTML;

                curNode.innerHTML = "";
                curNode.append(linkElement);
            }
        }
    );
}

function triggerHighlightText() {
    chrome.storage.local.get(
        { rules: [] },
        result => {
            for (let rule of result.rules) {
                let targPattern = rule.pattern;
                if (rule.isRegExp) {
                    let flag = "";
                    if (!rule.isCensitive) flag += "i";
                    targPattern = new RegExp(rule.pattern, flag);
                }
                highlightText(targPattern, rule.color, rule.hint, rule.link);
            }
        }
    )
}
