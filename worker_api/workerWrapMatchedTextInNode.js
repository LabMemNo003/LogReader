self.importScripts("xml_for_script/tinyxmlsax.js");
self.importScripts("xml_for_script/tinyxmlw3cdom.js");
self.importScripts("worker_api.js");

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// xml: The XML typed string which contains the text to be matched and the template used to wrap the matched string.
//      The worker uses id to get each data, so no matter what type the tag is.
//      <tag id="list"> The result nodes </tag>
//      <tag id="wrap"> The template used to wrap the matched string </tag>
//      <tag id="text"> The text to be matched </tag>
// threshold[0]: Determine whether to call workerReObjExecText()
//               Default to call reObjExecText()
// **Retrun values**
// xml: The XML typed string which contains the result nodes.
//      The worker uses id to get each data, so no matter what type the tag is.
//      <tag id="list"> The result nodes </tag>
// count: The amount of matches.
self.onmessage = event => {

    console.log("worker_api/workerWrapMatchedTextInNode.js");

    let { reObj, xml, threshold } = event.data;

    let parser = new DOMImplementation();
    let domDoc = parser.loadXML(xml);

    let textElem = domDoc.getElementById("text");
    let textNode = textElem.firstChild
    let text = textNode.data;
    let wrapElem = domDoc.getElementById("wrap");
    wrapElem.removeAttribute("id");
    let listElem = domDoc.getElementById("list");

    scheduleReObjExecText(reObj, text, threshold[0])
        .then(matches => {
            if (text.length + wrapElem.outerHTML * matches.length > threshold[1]) {
                let worker = new Worker("workerWrapMatchedTextInNodeWithMatches.js");
                worker.postMessage({ xml, matches });
                worker.onmessage = event => {
                    self.postMessage(
                        {
                            xml: event.data,
                            count: matches.length
                        }
                    )
                };
            }
            else {
                let lastIndex = 0;
                for (let match of matches) {
                    if (lastIndex < match.index) {
                        let foreText = text.substring(lastIndex, match.index);
                        let foreNode = domDoc.createTextNode(foreText);
                        listElem.appendChild(foreNode);
                    }

                    let targText = text.substr(match.index, match.strlen);
                    let targNode = domDoc.createTextNode(targText);
                    let targElem = wrapElem.cloneNode(true);
                    targElem.appendChild(targNode);
                    listElem.appendChild(targElem);

                    lastIndex = match.index + targText.length;
                }

                if (lastIndex < text.length) {
                    let lastText = text.substring(lastIndex);
                    let lastNode = domDoc.createTextNode(lastText);
                    listElem.appendChild(lastNode);
                }

                self.postMessage(
                    {
                        xml: listElem.getXML(),
                        count: matches.length,
                    }
                );
            }
        });
};
