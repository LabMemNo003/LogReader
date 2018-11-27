const LABEL = {
    classText: "log_reader_text",
    classHint: "log_reader_hint",
    classLink: "log_reader_link",
    classWhiteList: "log_reader_white_list",
}

// Union adjacent text nodes.
// Reason: When open log with a browser, the log will be divided into several
// text nodes in DOM, which will cause the count of matched text to be error.
function unionTextNodes() {
    if (unionTextNodes.done == true) return;
    unionTextNodes.done = true;

    let stack = [document];
    while (stack.length) {
        let node = stack.pop();

        let child = node.lastChild;
        while (child) {
            stack.push(child);
            child = child.previousSibling;
        }

        if (node instanceof Text &&
            node.previousSibling instanceof Text) {
            node.previousSibling.innerHTML += node.innerHTML;
            node.remove();
        }
    }
}

// Match the text verbatimly, and wrap the matched text by span element.
// targText: target pattern (String)
// callback: do some processes with wrapped text (span element)
// record: returned data used by callback function
// rootNode: the root node to be searched in DOM
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

// Match the text by regular expression, and wrap the matched text by span element.
// targReObj: target pattern (Regular Expression Object)(Do not use global match)
// callback: do some processes with wrapped text (span element)
// record: returned data used by callback function
// rootNode: the root node to be searched in DOM
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

// Wrap wrapPlainText() and wrapMatchedText(), and do some general processes.
// Add 'count' in record to return the amount of matched pattern.
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

// Highlight the matched text with given color, also provide more infomation.
// targPattern: a string or a regular expression object to be matched
// color: the background color of matched text
// hint: the message shows near cursor when hover on matched text
// link: the hyperlink binds to matched text
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

// Read all rules from local storage, and apply them to highlight the text.
function triggerHighlightText() {
    unionTextNodes();

    chrome.storage.local.get(
        { rules: [] },
        result => {
            for (let rule of result.rules) {
                let targPattern = rule.pattern;
                if (rule.isRegExp) {
                    let flag = "";
                    if (!rule.isCensitive) flag += "i";
                    if (rule.isMultiline) flag += "m";
                    targPattern = new RegExp(rule.pattern, flag);
                }
                highlightText(targPattern, rule.color, rule.hint, rule.link);
            }
        }
    )
}
