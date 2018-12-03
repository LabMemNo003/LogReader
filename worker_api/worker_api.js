// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// text: The string to be matched.
// **Return values**
// result: An array of objects which contains the matched string and its index.
async function reObjExecText(reObj, text) {
    let result = [];
    let match;
    while (match = reObj.exec(text)) {
        result.push(
            {
                strlen: match[0].length,
                index: match.index,
            }
        );
    }
    return result;
}

// Same to reObjExecText(), but delegate workload to new Worker()
/* async function workerReObjExecText(reObj, text) {
    return new Promise((resolve, _) => {
        let worker = new Worker("workerReObjExecText.js");
        worker.postMessage({ reObj, text });
        worker.onmessage = event => {
            resolve(event.data);
            worker.terminate();
        };
    });
} */

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// text: The string to be matched.
// threshold[0]: Determine whether to call workerReObjExecText()
//               Default to call reObjExecText()
// **Return values**
// result: An array of objects which contains the matched string and its index.
// async function scheduleReObjExecText(reObj, text, threshold = [Infinity]) {
// /*     if (text.length > threshold[0]) {
//         return workerReObjExecText(reObj, text);
//     } */
//     return reObjExecText(reObj, text);
// }

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textArray: An array contains the strings to be matched.
// **Return values**
// result: An array contains the results of reObjExecText()
async function reObjExecTextArray(reObj, textArray) {
    return Promise.all(textArray.map(item => reObjExecText(reObj, item)));
}

// Same to reObjExecTextArray(), but delegate workload to new Worker()
/* async function workerReObjExecTextArray(reObj, textArray) {
    return new Promise((resolve, _) => {
        let worker = new Worker("workerReObjExecTextArray.js");
        worker.postMessage({ reObj, textArray });
        worker.onmessage = event => {
            resolve(event.data);
            worker.terminate();
        };
    });
} */

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textArray: An array contains the strings to be matched.
// threshold[0]: Determine whether to call workerReObjExecText()
// threshold[1]: Determine wherter to call workerReObjExecTextArray()
//               Default to call reObjExecTextArray()
// **Return values**
// result: An array contains the results of reObjExecText()
async function scheduleReObjExecTextArray(reObj, textArray, threshold = [Infinity, Infinity]) {
    let promises = [];
    let results = [];

    let textLength = textArray.map(item => item.length);
    let hash = textLength.sortIndices((a, b) => a > b ? -1 : a < b ? 1 : 0);
    let fore = 0;
    let tail = hash.length - 1;

/*     while (fore <= tail && textLength[hash[fore]] > threshold[0]) {
        let index = fore;
        promises.push(
            workerReObjExecText(reObj, textArray[hash[index]])
                .then(result => { results[hash[index]] = result; })
        );
        fore++;
    } */

    let workload = 0, indices = [];
    while (fore <= tail) {
        workload = 0;
        indices = [];
        while (fore <= tail && workload + textLength[hash[fore]] <= threshold[1]) {
            indices.push(fore);
            workload += textLength[hash[fore]];
            fore++;
        }
/*         while (fore <= tail && workload + textLength[hash[tail]] <= threshold[1]) {
            indices.push(tail);
            workload += textLength[hash[tail]];
            tail--;
        }
        if (fore <= tail) {
            indices.push(tail);
            tail--;
            promises.push(
                workerReObjExecTextArray(reObj, indices.map(item => textArray[hash[item]]))
                    .then(result => { result.forEach((item, index) => results[hash[indices[index]]] = item); })
            );
        } */
    }
    if (indices.length > 0) {
        promises.push(
            reObjExecTextArray(reObj, indices.map(item => textArray[hash[item]]))
                .then(result => { result.forEach((item, index) => results[hash[indices[index]]] = item); })
        );
    }

    return Promise.all(promises).then(_ => results);
}

// **Parameters**
// textNode: The node in which the text to be wrapped.
// wrapElem: The element in which the matched string to be wrapped.
// matches: An array contains the matched string's index and length.
async function wrapMatchedTextInNodeWithMatches_g(textNode, wrapElem, matches) {
    let newNodes = [];
    let text = textNode.data;
    let lastIndex = 0;
    for (let match of matches) {
        if (lastIndex < match.index) {
            let foreText = text.substring(lastIndex, match.index);
            let foreNode = document.createTextNode(foreText);
            newNodes.push(foreNode);
        }

        let targText = text.substr(match.index, match.strlen);
        let targNode = document.createTextNode(targText);
        let targElem = wrapElem.cloneNode(true);
        targElem.appendChild(targNode);
        newNodes.push(targElem);

        lastIndex = match.index + match.strlen;
    }

    if (lastIndex < text.length) {
        let lastText = text.substring(lastIndex);
        let lastNode = document.createTextNode(lastText);
        newNodes.push(lastNode);
    }

    textNode.replaceWith(...newNodes);
}

// Same to wrapMatchedTextInNodeWithMatches_g(), but delegate workload to new Worker() 
/* async function workerWrapMatchedTextInNodeWithMatches_g(textNode, wrapElem, matches) {
    return new Promise((resolve, _) => {
        // xml: The XML typed string which contains the text to be matched and the template used to wrap the matched string.
        //      The worker uses id to get each data, so no matter what type the tag is.
        //      <tag id="list"> The result nodes </tag>
        //      <tag id="wrap"> The template used to wrap the matched string </tag>
        //      <tag id="text"> The text to be matched </tag>
        // matches: An array contains the matched string's index and length.
        // **Retrun values**
        // xml: The XML typed string which contains the result nodes.
        //      The worker uses id to get each data, so no matter what type the tag is.
        //      <tag id="list"> The result nodes </tag>
        let textElem = document.createElement("span");
        textElem.id = "text";
        textElem.innerText = textNode.data;

        wrapElem.id = "wrap";

        let listElem = document.createElement("span");
        listElem.id = "list";

        let rootElem = document.createElement("span");
        rootElem.appendChild(textElem);
        rootElem.appendChild(wrapElem);
        rootElem.appendChild(listElem);

        let serializer = new XMLSerializer();
        let xml = serializer.serializeToString(rootElem);
        xml = xml.replace(/<br \/>/g, "\n");

        let worker = new Worker("workerWrapMatchedTextInNodeWithMatches.js");
        worker.postMessage({ xml, matches });
        worker.onmessage = event => {
            let xml = event.data;
            let parser = new DOMParser();
            let domDoc = parser.parseFromString(xml, "text/html");
            let listElem = domDoc.getElementById("list");
            textNode.replaceWith(...listElem.childNodes);
            resolve();
            worker.terminate();
        };
    });
} */

// **Parameters**
// textNode: The node in which the text to be wrapped.
// wrapElem: The element in which the matched string to be wrapped.
// matches: An array contains the matched string's index and length.
// threshold[0]: Determine whether to call wrapMatchedTextInNodeWithMatches_g()
//               Default to call workerWrapMatchedTextInNodeWithMatches_g()
// async function scheduleWrapMatchedTextInNodeWithMatches_g(textNode, wrapElem, matches, threshold = [Infinity]) {
// /*     if (textNode.data.length + wrapElem.outerHTML * matches.length > threshold[0]) {
//         return workerWrapMatchedTextInNodeWithMatches_g(textNode, wrapElem, matches);
//     } */
//     return wrapMatchedTextInNodeWithMatches_g(textNode, wrapElem, matches);
// }

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textNode: The node in which the text to be matched.
// wrapElem: The element in which the matched string to be wrapped.
// threshold[0]: Determine whether to call workerReObjExecText()
//               Default to call reObjExecText()
// threshold[1]: Determine whether to call workerWrapMatchedTextInNodeWithMatches_g()
//               Default to call wrapMatchedTextInNodeWithMatches_g()
// **Return values**
// result: The amount of matches.
async function wrapMatchedTextInNode_g(reObj, textNode, wrapElem, threshold = [Infinity, Infinity]) {
    let promise = reObjExecText(reObj, textNode.data);
    let matches = await promise;
    await wrapMatchedTextInNodeWithMatches_g(textNode, wrapElem, matches);
    return matches.length;
}

// Same to wrapMatchedTextByDom_g(), but delegate workload to new Worker()
/* async function workerWrapMatchedTextInNode_g(reObj, textNode, wrapElem, threshold = [Infinity, Infinity]) {
    return new Promise((resolve, _) => {
        // **Caution**
        // Do add global flag to regular expression object.
        // **Parameters**
        // reObj: The regular expression object used to match (Do add global flag).
        // xml: The XML typed string which contains the text to be matched and the template used to wrap the matched string.
        //      The worker uses id to get each data, so no matter what type the tag is.
        //      <tag id="list"> The result nodes </tag>
        //      <tag id="wrap"> The template used to wrap the matched string </tag>
        //      <tag id="text"> The text to be matched </tag>
        // **Retrun values**
        // xml: The XML typed string which contains the result nodes.
        //      The worker uses id to get each data, so no matter what type the tag is.
        //      <tag id="list"> The result nodes </tag>
        let textElem = document.createElement("span");
        textElem.id = "text";
        textElem.innerText = textNode.data;

        wrapElem.id = "wrap";

        let listElem = document.createElement("span");
        listElem.id = "list";

        let rootElem = document.createElement("span");
        rootElem.appendChild(textElem);
        rootElem.appendChild(wrapElem);
        rootElem.appendChild(listElem);

        let serializer = new XMLSerializer();
        let xml = serializer.serializeToString(rootElem);
        xml = xml.replace(/<br \/>/g, "\n");

        let worker = new Worker("workerWrapMatchedTextInNode.js");
        worker.postMessage({ reObj, xml, threshold });
        worker.onmessage = event => {
            let { xml, count } = event.data;
            let parser = new DOMParser();
            let domDoc = parser.parseFromString(xml, "text/html");
            let listElem = domDoc.getElementById("list");
            textNode.replaceWith(...listElem.childNodes);
            resolve(count);
            worker.terminate();
        };
    });
} */

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textNode: The node in which the text to be matched.
// wrapElem: The element in which the matched string to be wrapped.
// threshold[0]: Determine whether to call workerReObjExecText()
//               Default to call reObjExecText()
// threshold[1]: Determine whether to call workerWrapMatchedTextInNodeWithMatches_g()
//               Default to call wrapMatchedTextInNodeWithMatches_g()
// threshold[2]: Determine whether to call workerWrapMatchedTextInNode_g()
//               Default to call wrapMatchedTextInNode_g()
// **Return values**
// result: The amount of matches.
async function scheduleWrapMatchedTextInNode_g(reObj, textNode, wrapElem, threshold = [Infinity, Infinity, Infinity]) {
/*     if (textNode.data.length > threshold[2]) {
        return workerWrapMatchedTextInNode_g(reObj, textNode, wrapElem, [threshold[0], threshold[1]]);
    } */
    return wrapMatchedTextInNode_g(reObj, textNode, wrapElem, [threshold[0], threshold[1]]);
}

// textNodeArray: An array of nodes in which the text to be wrapped.
// wrapElem: The element in which the matched string to be wrapped.
// matchesArray: An array of matches results to corresponding nodes in textNodeArray.
// threshold[0]: Determine whether to call workerwrapMatchedTextInNodeWithMatches_g()
//               Default to call wrapMatchedTextInNodeWithMatches_g()
async function wrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, matchesArray, threshold = [Infinity]) {
    await Promise.all(
        textNodeArray.map((textNode, index) =>
        wrapMatchedTextInNodeWithMatches_g(textNode, wrapElem, matchesArray[index])
        )
    );
}

// Same to wrapMatchedTextInNodesWithMatches_g,  but delegate workload to new Worker()
/* async function workerWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, matchesArray, threshold = [Infinity]) {
    return new Promise((solve, _) => {
        let textElem = document.createElement("span");
        textElem.id = "text";
        wrapElem.id = "wrap";
        let listElem = document.createElement("span");
        listElem.id = "list";
        let rootElem = document.createElement("span");
        rootElem.appendChild(textElem);
        rootElem.appendChild(wrapElem);
        rootElem.appendChild(listElem);
        let serializer = new XMLSerializer();

        let xmls = textNodeArray.map(textNode => {
            textElem.innerText = textNode.data;
            let xml = serializer.serializeToString(rootElem);
            return xml.replace(/<br \/>/g, "\n");
        });

        let worker = new Worker("workerWrapMatchedTextInNodesWithMatches.js");
        worker.postMessage({ xmls, matchesArray, threshold });
        worker.onmessage = event => {
            let parser = new DOMParser();
            event.data.forEach((xml, index) => {
                let domDoc = parser.parseFromString(xml, "text/html");
                let listElem = domDoc.getElementById("list");
                textNodeArray[index].replaceWith(...listElem.childNodes);
            });
            solve();
            worker.terminate();
        };
    });
} */

// textNodeArray: An array of nodes in which the text to be wrapped.
// wrapElem: The element in which the matched string to be wrapped.
// matchesArray: An array of matches results to corresponding nodes in textNodeArray.
// threshold[0]: Determine whether to call workerWrapMatchedTextInNodeWithMatches_g()
//               Default to call wrapMatchedTextInNodeWithMatches_g()
// threshold[1]: Determine whether to call scheduleWrapMatchedTextInNodeWithMatches_g()
// threshold[2]: Determine whether to call workerWrapMatchedTextInNodesWithMatches_g()
//               Default to call wrapMatchedTextInNodesWithMatches_g()
async function scheduleWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, matchesArray, threshold = [Infinity, Infinity, Infinity]) {
    let promises = [];

    let textLength = textNodeArray.map(item => item.data.length);
    let hash = textLength.sortIndices((a, b) => a > b ? -1 : a < b ? 1 : 0);
    let fore = 0;
    let tail = hash.length - 1;

/*     while (fore <= tail && textLength[hash[fore]] > threshold[1]) {
        let index = fore;
        promises.push(
            scheduleWrapMatchedTextInNodeWithMatches_g(textNodeArray[hash[index]], wrapElem, matchesArray[hash[index]], [threshold[0]])
        );
        fore++;
    } */

    let workload = 0, indices = [];
    while (fore <= tail) {
        workload = 0;
        indices = [];
        while (fore <= tail && workload + textLength[hash[fore]] <= threshold[2]) {
            indices.push(fore);
            workload += textLength[hash[fore]];
            fore++;
        }
/*         while (fore <= tail && workload + textLength[hash[tail]] <= threshold[2]) {
            indices.push(tail);
            workload += textLength[hash[tail]];
            tail--;
        }
        if (fore <= tail) {
            indices.push(tail);
            tail--;
            promises.push(
                workerWrapMatchedTextInNodesWithMatches_g(indices.map(item => textNodeArray[hash[item]]), wrapElem, indices.map(item => matchesArray[hash[item]]), [threshold[0]])
            );
        } */
    }
    if (indices.length > 0) {
        promises.push(
            wrapMatchedTextInNodesWithMatches_g(indices.map(item => textNodeArray[hash[item]]), wrapElem, indices.map(item => matchesArray[hash[item]]), [threshold[0]])
        );
    }

    await Promise.all(promises);
}

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textArray: An array contains the strings to be matched.
// threshold[0]: Determine whether to call workerReObjExecText()
// threshold[1]: Determine whether to call workerReObjExecTextArray()
//               Default to call reObjExecTextArray()
// **Return values**
// result: An array contains the results of reObjExecText()
async function wrapMatchedTextInNodes_g(reObj, textNodeArray, wrapElem, threshold = [Infinity, Infinity]) {
    let textArray = textNodeArray.map(item => item.data);
    let promise = scheduleReObjExecTextArray(reObj, textArray, [threshold[0], threshold[1]]);
    let matchesArray = await promise;


}