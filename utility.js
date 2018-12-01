let de = false;
function bug(...msg) {
    console.log(...msg);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTextNodes(rootNode) {
    let textNodes = [];

    let stack = [rootNode];
    while (stack.length) {
        let node = stack.pop();

        if (node instanceof Text) {
            textNodes.push(node);
            continue;
        }

        let child = node.lastChild;
        while (child) {
            stack.push(child);
            child = child.previousSibling;
        }
    }

    return textNodes;
}

Array.prototype.sortIndices = function (cmp) {
    return Array.from(
        Array(this.length).keys()
    ).sort((a,b)=>{
        return cmp(this[a],this[b]);
    });
}