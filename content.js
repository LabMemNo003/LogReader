// debugger;

// let textNode = document.body.firstChild.firstChild;
// let nextNode = textNode.nextSibling;
// let wrapElem = document.createElement("span");
// wrapElem.style.background = "yellow";

// let start, end;

// start = new Date();
// Promise.all(getTextNodes(document).map(item => scheduleWrapMatchedTextInNode_g(/a/gi, item, wrapElem, [10000, Infinity, Infinity])))
//     .then(result => console.log(result.reduce((pre, cur) => pre + cur, 0)))
//     .then(_ => {
//         end = new Date();
//         console.log(start, end, end - start);
//     })
//     .then(_ => {

//         wrapElem.style.background = "green";
//         start = new Date();
//         Promise.all(getTextNodes(document).map(item => scheduleWrapMatchedTextInNode_g(/e/gi, item, wrapElem, [10000, 10000, 10000])))
//             .then(result => console.log(result.reduce((pre, cur) => pre + cur, 0)))
//             .then(_ => {
//                 end = new Date();
//                 console.log(start, end, end - start);
//             })
//             .then(_ => {


//                 wrapElem.style.background = "red";
//                 start = new Date();
//                 Promise.all(getTextNodes(document).map(item => scheduleWrapMatchedTextInNode_g(/i/gi, item, wrapElem, [10000, 10000, 10000])))
//                     .then(result => console.log(result.reduce((pre, cur) => pre + cur, 0)))
//                     .then(_ => {
//                         end = new Date();
//                         console.log(start, end, end - start);
//                     })
//                     .then(

//                     );

//             });

//     });

debugger;


new Promise((resolve, _) => resolve())
    .then(_ => {
        let start = new Date();
        let textNodeArray = getTextNodes(document);
        let textArray = textNodeArray.map(item => item.data);
        let wrapElem = document.createElement("span");
        wrapElem.style.background = "yellow";
        return scheduleReObjExecTextArray(/a/gi, textArray)
            .then(machesArray => {
                return scheduleWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, machesArray)
                    // return scheduleWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, machesArray, [30000, 30000, 30000])
                    .then(_ => {
                        let end = new Date();
                        console.log(
                            machesArray.map(item => item.length).reduce((pre, cur) => pre + cur, 0),
                            end - start
                        );
                    });
            });
    })
    .then(_ => {
        let start = new Date();
        let textNodeArray = getTextNodes(document);
        let textArray = textNodeArray.map(item => item.data);
        let wrapElem = document.createElement("span");
        wrapElem.style.background = "green";
        return scheduleReObjExecTextArray(/e/gi, textArray)
            .then(machesArray => {
                return scheduleWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, machesArray)
                    // return scheduleWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, machesArray, [30000, 30000, 30000])
                    .then(_ => {
                        let end = new Date();
                        console.log(
                            machesArray.map(item => item.length).reduce((pre, cur) => pre + cur, 0),
                            end - start
                        );
                    });
            });
    })
    .then(_ => {
        let start = new Date();
        let textNodeArray = getTextNodes(document);
        let textArray = textNodeArray.map(item => item.data);
        let wrapElem = document.createElement("span");
        wrapElem.style.background = "red";
        return scheduleReObjExecTextArray(/i/gi, textArray)
            .then(machesArray => {
                return scheduleWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, machesArray)
                    // return scheduleWrapMatchedTextInNodesWithMatches_g(textNodeArray, wrapElem, machesArray, [30000, 30000, 30000])
                    .then(_ => {
                        let end = new Date();
                        console.log(
                            machesArray.map(item => item.length).reduce((pre, cur) => pre + cur, 0),
                            end - start
                        );
                    });
            });
    });