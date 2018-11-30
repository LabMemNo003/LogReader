let de = false;
function bug(...msg) {
    console.log(...msg);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getTextNodes(rootNode) {
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