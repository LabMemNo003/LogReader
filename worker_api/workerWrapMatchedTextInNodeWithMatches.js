self.importScripts("xml_for_script/tinyxmlsax.js");
self.importScripts("xml_for_script/tinyxmlw3cdom.js");

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
self.onmessage = event => {
    let { xml, matches } = event.data;
    workerWrapMatchedTextInNodeWithMatches_w(xml, matches)
        .then(result => self.postMessage(result));
}

async function workerWrapMatchedTextInNodeWithMatches_w(xml, matches) {
    let parser = new DOMImplementation();
    let domDoc = parser.loadXML(xml);

    let textElem = domDoc.getElementById("text");

if(textElem.firstChild == null){
    debugger;
}

    let text = textElem.firstChild.data;
    let wrapElem = domDoc.getElementById("wrap");
    wrapElem.removeAttribute("id");
    let listElem = domDoc.getElementById("list");

    let lastIndex = 0;
    for (let match of matches) {
        if (lastIndex < match.index) {
            let foreText = text.substring(lastIndex, match.index);
            let foreNode = domDoc.createTextNode(foreText);
            listElem.appendChild(foreNode);
        }

        let targText = text.substr(match.index, match.length);
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

    return listElem.getXML();
}
