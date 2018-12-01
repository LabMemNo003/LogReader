self.importScripts("xml_for_script/tinyxmlsax.js");
self.importScripts("xml_for_script/tinyxmlw3cdom.js");
self.importScripts("workerWrapMatchedTextInNodeWithMatches.js")

self.onmessage = event => {
    let { xmls, matchesArray, threshold } = event.data;

    Promise.all(
        xmls.map((xml, index) => {
            if (xml.length > threshold[0]) {
                return new Promise((resolve, _) => {
                    let worker = new Worker("workerWrapMatchedTextInNodeWithMatches.js");
                    worker.postMessage({ xml, matches: matchesArray[index] });
                    worker.onmessage = event => resolve(event.data);
                });
            }
            else {
                return workerWrapMatchedTextInNodeWithMatches_w(xml, matchesArray[index]);
            }
        })
    ).then(result => self.postMessage(result));
}