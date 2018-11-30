// debugger;

// let reObj = new RegExp("a", "ig");
// let wrapElem = document.createElement("span");
// wrapElem.style.background = "green";

// let sum = 0;

// let stack = [document];
// while (stack.length) {
//     let node = stack.pop();

//     let child = node.lastChild;
//     while (child) {
//         stack.push(child);
//         child = child.previousSibling;
//     }

//     if (node instanceof Text) {
//         let text = node.data;
//         let mid = (text.length & 1 +text.length)/2;
//         let foreText = text.substr(0,mid);
//         let foreNode = document.createTextNode(foreText);
//         let tailText = text.substr(mid);
//         let tailNode = document.createTextNode(tailText);
//         node.replaceWith(foreNode,tailNode);

//         wrapMatchedText(
//             reObj,
//             foreNode,
//             wrapElem,
//             undefined,
//             (count, more) => {
//                 sum += count;
//                 console.log(count, sum);
//             }
//         );

//         wrapMatchedText(
//             reObj,
//             tailNode,
//             wrapElem,
//             undefined,
//             (count, more) => {
//                 sum += count;
//                 console.log(count, sum);
//             }
//         );
//     }
// }






debugger;


let wrapElem = document.createElement("span");

getTextNodes(document)
    .then(textNodes => {
        wrapElem.style.background = "green";
        return workerWrapMatchedTextInNodes(/a/gi, textNodes, wrapElem);
    })
    .then(value => {
        console.log(JSON.stringify(value));
        return true;
    })
    .then(_ => {
        return getTextNodes(document);
    })
    .then(textNodes => {
        wrapElem.style.background = "yellow";
        return workerWrapMatchedTextInNodes(/b/gi, textNodes, wrapElem);
    })
    .then(value => {
        console.log(JSON.stringify(value));
        return true;
    })
    .then(_ => {
        return getTextNodes(document);
    })
    .then(textNodes => {
        wrapElem.style.background = "red";
        return workerWrapMatchedTextInNodes(/c/gi, textNodes, wrapElem);
    })
    .then(value => {
        console.log(JSON.stringify(value));
        return true;
    });
