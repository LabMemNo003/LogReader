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

debugger;

let reObj = /a/gi;

let textNodeArray = [];
let stack = [document];
while (stack.length) {
    let node = stack.pop();

    if (node instanceof Text) {
        textNodeArray.push(node);
        continue;
    }

    let child = node.lastChild;
    while (child) {
        stack.push(child);
        child = child.previousSibling;
    }
}

let wrapElem = document.createElement("spam");
wrapElem.style.background = "green";

wrapMatchedTextInNodes(reObj, textNodeArray, wrapElem)
    .then(countArray => {
        let count = countArray.reduce((pre, cur) => pre + cur, 0);
        alert(count);
    })
