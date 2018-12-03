self.importScripts("worker_api.js");

// **Caution**
// Do add global flag to regular expression object.
// **Parameters**
// reObj: The regular expression object used to match (Do add global flag).
// text: The string to be matched.
// **Return values**
// result: An array of objects which contains the matched string and its index.
self.onmessage = event => {

    console.log("worker_api/workerReObjExecTextArray.js");

    let { reObj, textArray } = event.data;
    reObjExecTextArray(reObj, textArray).then(
        result => self.postMessage(result)
    );
};
