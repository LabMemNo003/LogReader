// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// text: The string to be matched.
// more: The data attached to worker.
// **Return values**
// result: An array of objects which contains the matched string and its index.
// more: The data attached to worker.
function workerReObjExec(
    reObj, text, more,
    callback = (result, more) => { }
) {
    let worker = new Worker("workerReObjExec.js");
    worker.onmessage = event => {
        let { result, more } = event.data;

        callback(result, more);

        worker.terminate();
    };
    worker.postMessage(
        {
            reObj,
            text,
            more,
        }
    );
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
// more: The data attached to worker.
// **Retrun values**
// xml: The XML typed string which contains the result nodes.
//      The worker uses id to get each data, so no matter what type the tag is.
//      <tag id="list"> The result nodes </tag>
// count: The amount of matched strings.
// more: The data attached to worker.
function workerWrapMatchedText(
    reObj, xml, more,
    callback = (xml, count, more) => { }
) {
    let worker = new Worker("workerWrapMatchedText.js");
    worker.onmessage = event => {
        let { xml, count, more } = event.data;

        callback(xml, count, more);

        worker.terminate();
    };
    worker.postMessage(
        {
            reObj,
            xml,
            more,
        }
    );
}

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// textNode: The node in which the text to be matched.
// wrapElem: The element in which the matched string to be wrapped.
// more: The data attached to worker.
// **Retrun values**
// count: The amount of matched strings.
// firstNode: The textNode will be replaced by an array of nodes, and this value is the first one.
// lastNode: The textNode will be replaced by an array of nodes, and this value is the first one.
// more: The data attached to worker.
function workerWrapMatchedTextInNode(
    reObj, textNode, wrapElem, more,
    callback = (count, firstNode, lastNode, more) => { }
) {
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

    workerWrapMatchedText(
        reObj,
        xml,
        more,
        (xml, count, more) => {
            let parser = new DOMParser();
            let domDoc = parser.parseFromString(xml, "text/html");
            let listElem = domDoc.getElementById("list");
            textNode.replaceWith(...listElem.childNodes);

            callback(count, more, listElem.firstChild, listElem.lastChild);
        }
    );
}

function workerWrapMatchedTextInNodes(
    reObj, textNodes, wrapElem, limit, timeout, more
    ) {
    for (let textNode of textNodes) {
        let interval = setInterval(() => {
            if (limit > 0) {
                limit--;

                workerWrapMatchedTextInNode(
                    reObj,
                    textNode,
                    wrapElem,
                    more,
                    (count, firstChild, lastNode, more) => {
                        limit++;
                    }
                )

                clearInterval(interval);
            }
        }, timeout);
    }
}