// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// text: The string to be matched.
// **Return values**
// result: An array of objects which contains the matched string and its index.
function reObjExec(reObj,text){
    let result = [];
    let match;
    while (match = reObj.exec(text)) {
        result.push(
            {
                "string": match[0],
                "index": match.index,
            }
        );
    }
    return result;
}


// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// text: The string to be matched.
// threshold: If text's length greater than threshold, start a new worker.
// **Return values**
// result: An array of objects which contains the matched string and its index.
async function workerReObjExec(reObj, text, threshold = 2000) {
    if(text.length<= threshold){
        return reObjExec(reObj,text);
    }

    let worker = new Worker("workerReObjExec.js");
    let promise = new Promise((resolve, _) => {
        worker.postMessage(
            {
                reObj,
                text,
            }
        );
        worker.onmessage = event => {
            let { result } = event.data;
            resolve(result);
        };
    });
    promise.then(_ => {
        worker.terminate();
    });
    return promise;
}

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
// count: The amount of matched strings.
async function workerWrapMatchedText(reObj, xml) {
    let worker = new Worker("workerWrapMatchedText.js");
    let promise = new Promise((resolve, _) => {
        worker.postMessage(
            {
                reObj,
                xml,
            }
        );
        worker.onmessage = event => {
            let { xml, count } = event.data;
            resolve({ xml, count });
        };
    });
    promise.then(_ => {
        worker.terminate();
    });
    return promise;
}

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textNode: The node in which the text to be matched.
// wrapElem: The element in which the matched string to be wrapped.
// **Retrun values**
// count: The amount of matched strings.
// firstNode: The textNode will be replaced by an array of nodes, and this value is the first one.
// lastNode: The textNode will be replaced by an array of nodes, and this value is the first one.
async function workerWrapMatchedTextInNode(reObj, textNode, wrapElem) {
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

    return workerWrapMatchedText(reObj, xml)
        .then(({ xml, count }) => {
            let parser = new DOMParser();
            let domDoc = parser.parseFromString(xml, "text/html");
            let listElem = domDoc.getElementById("list");
            let firstNode = listElem.firstChild;
            let lastNode = listElem.lastChild;
            textNode.replaceWith(...listElem.childNodes);
            let result = { count, firstNode, lastNode, };
            return result;
        });
}

/* 
function workerWrapMatchedTextInNodes(reObj, textNodes, wrapElem, limit = [30, 15], timeout = [59, 29, 23, 19], length = 100) {
    let countWorkers = 0;
    let targWorkers = textNodes.length * 2 - 1;

    let countMatches = 0;

    let firstNodes = [];
    let lastNodes = [];

    for (let index = 0; index < textNodes.length; index++) {
        let textNode = textNodes[index];
        let interval = setInterval(() => {
            console.log("0");
            if (limit[0] > 0) {
                limit[0]--;
                clearInterval(interval);

                workerWrapMatchedTextInNode(reObj, textNode, wrapElem)
                    .then(value => {
                        let { count, firstNode, lastNode } = value;
                        countMatches += count;
                        firstNodes[index] = firstNode;
                        lastNodes[index] = lastNode;

                        limit[0]++;
                        countWorkers++;
                    });
            }
        }, timeout[0]);
    }

    for (let index = 1; index < textNodes.length; index++) {
        let outterInterval = setInterval(() => {
            console.log("1");
            if (lastNodes[index - 1] && firstNodes[index]) {
                clearInterval(outterInterval);

                if (lastNodes[index - 1].nextSibling === firstNodes[index]) {

                    if (lastNodes[index - 1].data &&
                        lastNodes[index - 1].data.length > length) {
                        let text = lastNodes[index - 1].data;

                        let preForeText = text.substring(0, text.length - length);
                        let preForeNode = document.createTextNode(preForeText);

                        let preLastText = text.substring(text.length - length);
                        let preLastNode = document.createTextNode(preLastText);

                        if (firstNodes[index - 1] === lastNodes[index - 1]) {
                            firstNodes[index - 1] = preForeNode;
                        }
                        lastNodes[index - 1].replaceWith(preLastNode);
                        lastNodes[index - 1] = preLastNode;
                        lastNodes[index - 1].before(preForeNode);
                    }

                    if (firstNodes[index].data &&
                        firstNodes[index].data.length > length) {
                        let text = firstNodes[index].data;

                        let curFirstText = text.substring(0, length);
                        let curFirstNode = document.createTextNode(curFirstText);

                        let curNextText = text.substring(length);
                        let curNextNode = document.createTextNode(curNextText);

                        if (firstNodes[index] === lastNodes[index]) {
                            lastNodes[index] = curNextNode;
                        }
                        firstNodes[index].replaceWith(curFirstNode);
                        firstNodes[index] = curFirstNode;
                        firstNodes[index].after(curNextNode);
                    }

                    let text = "";
                    if (lastNodes[index - 1].data) text += lastNodes[index - 1].data;
                    if (firstNodes[index].data) text += firstNodes[index].data;
                    let textNode = document.createTextNode(text);

                    firstNodes[index].replaceWith(textNode);
                    firstNodes[index] = textNode;
                    lastNodes[index - 1] = textNode;

                    let innerInterval = setInterval(() => {
                        console.log("2");
                        if (limit[1] > 0) {
                            limit[1]--;
                            clearInterval(innerInterval);

                            workerWrapMatchedTextInNode(reObj, textNode, wrapElem)
                                .then(value => {
                                    let { count, firstNode, lastNode } = value;
                                    countMatches += count;

                                    limit[1]++;
                                    countWorkers++;
                                });
                        }
                    }, timeout[2]);
                }
                else {
                    targWorkers--;
                }
            }
        }, timeout[1]);
    }

    return new Promise((resolve, _) => {
        let interval = setInterval(() => {
            console.log("3");
            if (countWorkers == targWorkers) {
                clearInterval(interval);
                resolve(
                    {
                        countWorkers,
                        countMatches,
                    }
                );
            }
        }, timeout[3]);
    });
}
 */


function workerWrapMatchedTextInNodes(reObj, textNodes, wrapElem, limit = [30, 15], timeout = [59, 29, 23, 19], length = 100) {
    let countWorkers = 0;
    let targWorkers = textNodes.length * 2 - 1;

    let countMatches = 0;

    let firstNodes = [];
    let lastNodes = [];

    for (let index = 0; index < textNodes.length; index++) {
        let textNode = textNodes[index];
        (function foo() {
            de&&bug("0","wait");
            if (limit[0] > 0) {
                de&&bug("0","pass");
                limit[0]--;
                workerWrapMatchedTextInNode(reObj, textNode, wrapElem)
                    .then(value => {
                        let { count, firstNode, lastNode } = value;
                        // de&&bug("0",count);
                        countMatches += count;
                        firstNodes[index] = firstNode;
                        lastNodes[index] = lastNode;

                        limit[0]++;
                        countWorkers++;
                    });
            }
            else {
                setTimeout(foo, timeout[0]+getRndInteger(-5,5));
            }
        })();
    }

    for (let index = 1; index < textNodes.length; index++) {
        (function outterFoo() {
            de&&bug("1","wait");
            if (lastNodes[index - 1] && firstNodes[index]) {
                de&&bug("1","pass");

                if (lastNodes[index - 1].nextSibling === firstNodes[index]) {

                    if (lastNodes[index - 1].data &&
                        lastNodes[index - 1].data.length > length) {
                        let text = lastNodes[index - 1].data;

                        let preForeText = text.substring(0, text.length - length);
                        let preForeNode = document.createTextNode(preForeText);

                        let preLastText = text.substring(text.length - length);
                        let preLastNode = document.createTextNode(preLastText);

                        if (firstNodes[index - 1] === lastNodes[index - 1]) {
                            firstNodes[index - 1] = preForeNode;
                        }
                        lastNodes[index - 1].replaceWith(preLastNode);
                        lastNodes[index - 1] = preLastNode;
                        lastNodes[index - 1].before(preForeNode);
                    }

                    if (firstNodes[index].data &&
                        firstNodes[index].data.length > length) {
                        let text = firstNodes[index].data;

                        let curFirstText = text.substring(0, length);
                        let curFirstNode = document.createTextNode(curFirstText);

                        let curNextText = text.substring(length);
                        let curNextNode = document.createTextNode(curNextText);

                        if (firstNodes[index] === lastNodes[index]) {
                            lastNodes[index] = curNextNode;
                        }
                        firstNodes[index].replaceWith(curFirstNode);
                        firstNodes[index] = curFirstNode;
                        firstNodes[index].after(curNextNode);
                    }

                    let text = "";
                    if (lastNodes[index - 1].data) text += lastNodes[index - 1].data;
                    if (firstNodes[index].data) text += firstNodes[index].data;
                    let textNode = document.createTextNode(text);

                    firstNodes[index].replaceWith(textNode);
                    firstNodes[index] = textNode;
                    lastNodes[index - 1] = textNode;

                    (function innerFoo() {
                        de&&bug("2","wait");
                        if (limit[1] > 0) {
                            de&&bug("2","pass");
                            limit[1]--;
                            workerWrapMatchedTextInNode(reObj, textNode, wrapElem)
                                .then(value => {
                                    let { count, firstNode, lastNode } = value;
                                    // de&&bug("2",count);
                                    countMatches += count;

                                    limit[1]++;
                                    countWorkers++;
                                });
                        }
                        else {
                            setTimeout(innerFoo, timeout[2]+getRndInteger(-5,5));
                        }
                    })();
                }
                else {
                    targWorkers--;
                }
            }
            else {
                setTimeout(outterFoo, timeout[1]+getRndInteger(-5,5));
            }
        })();
    }

    return new Promise((resolve, _) => {
        (function foo() {
            de&&bug("3","wait");
            if (countWorkers == targWorkers) {
                de&&bug("3","pass");
                resolve(
                    {
                        countWorkers,
                        countMatches,
                    }
                );
            }
            else {
                setTimeout(foo, timeout[3]+getRndInteger(-5,5));
            }
        })();
    });
}
