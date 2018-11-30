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
// **Retrun values**
// xml: The XML typed string which contains the result nodes.
//      The worker uses id to get each data, so no matter what type the tag is.
//      <tag id="list"> The result nodes </tag>
// count: The amount of matched strings.
self.onmessage = event => {
    let { reObj, xml, more } = event.data;

    let parser = new DOMImplementation();
    let domDoc = parser.loadXML(xml);

    let listElem = domDoc.getElementById("list");
    let wrapElem = domDoc.getElementById("wrap");
    wrapElem.removeAttribute("id");
    let textElem = domDoc.getElementById("text");
    let text = textElem.firstChild.data;

    workerReObjExec(reObj,text).then(result => {
        let lastIndex = 0;
        for (let match of result) {
            let foreText = text.substring(lastIndex, match.index);
            let foreNode = domDoc.createTextNode(foreText);
            listElem.appendChild(foreNode);
    
            let targText = match.string;
            let targNode = domDoc.createTextNode(targText);
            let targElem = wrapElem.cloneNode(true);
            targElem.appendChild(targNode);
            listElem.appendChild(targElem);
    
            lastIndex = match.index + targText.length;
        }
    
        let lastText = text.substring(lastIndex);
        let lastNode = domDoc.createTextNode(lastText);
        listElem.appendChild(lastNode);
    
        let xml = listElem.getXML();
    
        self.postMessage(
            {
                xml,
                count: result.length,
            }
        );
    });
};
