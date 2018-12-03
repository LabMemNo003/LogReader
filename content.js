// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// text: The string to be matched.
// **Return values**
// matches: An array of objects which contains the matched string's length and index.
async function reObjExecText(reObj, text) {
    return new Promise((resolve, _) => {
        let matches = [];
        let match;
        while (match = reObj.exec(text)) {
            matches.push(
                {
                    length: match[0].length,
                    index: match.index,
                }
            );
        }
        resolve(matches);
    });
}

// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textArray: An array contains the strings to be matched.
// **Return values**
// matchesArray: An array contains the results of reObjExecText()
async function reObjExecTextArray(reObj, textArray) {
    return Promise.all(textArray.map(item => {
        return reObjExecText(reObj, item);
    }));
}

// **Parameters**
// textNode: The text node in which the text to be wrapped.
// wrapElem: The element in which the matched string to be wrapped.
// matches: An array contains the matched string's index and length.
// **Return values**
// count: The amount of matches.
async function wrapMatchedTextInNodeWithMatches(textNode, wrapElem, matches) {
    return new Promise((resolve, _) => {
        let newNodes = [];
        let text = textNode.data;
        let lastIndex = 0;
        for (let match of matches) {
            if (lastIndex < match.index) {
                let foreText = text.substring(lastIndex, match.index);
                let foreNode = document.createTextNode(foreText);
                newNodes.push(foreNode);
            }

            let targText = text.substr(match.index, match.length);
            let targNode = document.createTextNode(targText);
            let targElem = wrapElem.cloneNode(true);
            targElem.appendChild(targNode);
            newNodes.push(targElem);

            lastIndex = match.index + match.length;
        }
        if (lastIndex < text.length) {
            let lastText = text.substring(lastIndex);
            let lastNode = document.createTextNode(lastText);
            newNodes.push(lastNode);
        }
        textNode.replaceWith(...newNodes);
        resolve(matches.length);
    });
}

// **Parameters**
// textNodeArray: An array of nodes in which the text to be wrapped.
// wrapElem: The element in which the matched string to be wrapped.
// matchesArray: An array of matches results to corresponding nodes in textNodeArray.
// **Return values**
// countArray: An array of the amount of matches.
async function wrapMatchedTextInNodesWithMatches(textNodeArray, wrapElem, matchesArray) {
    return Promise.all(textNodeArray.map((textNode, index) => {
        return wrapMatchedTextInNodeWithMatches(textNode, wrapElem, matchesArray[index]);
    }));
}

// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textNode: The node in which the text to be matched.
// wrapElem: The element in which the matched string to be wrapped.
// **Return values**
// count: The amount of matches.
async function wrapMatchedTextInNode(reObj, textNode, wrapElem) {
    let text = textNode.data;
    return reObjExecText(reObj, text)
        .then(matches => {
            return wrapMatchedTextInNodeWithMatches(textNode, wrapElem, matches);
        });
}

// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textArray: An array contains the strings to be matched.
// **Return values**
// countArray: An array of the amount of matches.
async function wrapMatchedTextInNodes(reObj, textNodeArray, wrapElem) {
    return Promise.all(textNodeArray.map(textNode => {
        return wrapMatchedTextInNode(reObj, textNode, wrapElem);
    }));
}
async function wrapMatchedTextInNodes_(reObj, textNodeArray, wrapElem) {
    let textArray = textNodeArray.map(textNode => textNode.data);
    return reObjExecTextArray(reObj, textArray)
        .then(matchesArray => {
            return wrapMatchedTextInNodesWithMatches(textNodeArray, wrapElem, matchesArray);
        });
}

const LABEL = {
    classHint: "lr_ht", // log reader hint
    classWhiteList: "lr_wl", // log reader white list
}

// **Parameters**
// rootElem: The node under which the text nodes are found.
// **Return values**
// textNodeArray: The text nodes found under rotNode.
async function getTextNodeArray(rootElem = document) {
    return new Promise((resolve, _) => {
        let textNodeArray = [];
        let stack = [rootElem];
        while (stack.length) {
            let node = stack.pop();

            if (node instanceof Text) {
                textNodeArray.push(node);
                continue;
            }

            if (node instanceof Element &&
                node.classList.contains(LABEL.classWhiteList)) {
                continue;
            }

            let child = node.lastChild;
            while (child) {
                stack.push(child);
                child = child.previousSibling;
            }
        }
        resolve(textNodeArray);
    });
}

// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// hint: The message shows near cursor when hover on matched text.
// link: The hyperlink binds to matched text.
// className: Used to explicitly set wrapElem's class.
// rootElem: The node under which the text nodes are found.
async function highlightText(reObj, color = "yellow", hint = undefined, link = undefined, className = undefined, rootElem = document) {

    if (!className || !className.length) {
        className = reObj.toString();
    }

    let wrapElem = document.createElement("a");
    wrapElem.classList.add(className);
    wrapElem.classList.add(LABEL.classWhiteList);
    wrapElem.style.backgroundColor = color;

    if (link && link.length) {
        wrapElem.href = link;
    }

    let hintFlag, hintElement;
    if (hint && hint.length) {
        hintFlag = true;
        hintElement = document.createElement("div");
        hintElement.classList.add(LABEL.classHint);
        hintElement.classList.add(LABEL.classWhiteList);
        hintElement.innerHTML = hint;
        document.body.append(hintElement);
    }

    return getTextNodeArray(rootElem)
        .then(textNodeArray => {
            return wrapMatchedTextInNodes(reObj, textNodeArray, wrapElem);
        })
        .then(countArray => {
            let elements = document.getElementsByClassName(className);
            for (let curElem of elements) {
                if (hintFlag) {
                    curElem.onmouseover = event => {
                        hintElement.style.left = event.pageX + 1 + "px";
                        hintElement.style.top = event.pageY + 1 + "px";
                        hintElement.style.display = "block";
                    };
                    curElem.onmouseout = () => {
                        hintElement.style.display = "none";
                    };
                }
            }

            let count = countArray.reduce((pre, cur) => pre + cur, 0);
            return count;
        });
}

// Read all rules from local storage, and apply them to highlight the text.
function triggerHighlightText() {

    chrome.storage.local.get(
        { highlightRules: [] },
        result => {
            let promise = new Promise((resolve, _) => resolve(0));
            for (let rule of result.highlightRules) {
                let reObj;
                if (rule.isRegExp) {
                    let flag = "g";
                    if (!rule.isCensitive) flag += "i";
                    if (rule.isMultiline) flag += "m";
                    reObj = new RegExp(rule.pattern, flag);
                }
                else {
                    function escapeRegExp(string) {
                        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
                    }
                    let pattern = escapeRegExp(rule.pattern);
                    reObj = new RegExp(pattern, "g");
                }
                promise = promise.then(_ => {
                    return highlightText(reObj, rule.color, rule.hint, rule.link);
                });
            }
        }
    );
}


debugger;

highlightText(/\/mnt\/tests\/kernel\/kdump\/crash-sysrq-c/gi, "yellow", undefined, undefined, "mmarkk")
    .then(count => {
        let elems = document.getElementsByClassName("mmarkk");
        let e1 = elems[0];
        let e2 = elems[1];

        let container = document.createElement("span");
        while (e1.nextSibling != e2) {
            container.appendChild(e1.nextSibling);
        }
        e2.before(container);

        e1.onclick = event => {
            if(this.coin == undefined) this.coin=true;
            coin=!coin;
            e1.nextSibling.style.display = coin ? "inline" : "none";
        }
    });