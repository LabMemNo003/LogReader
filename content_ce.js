// Use 'extract' to match 'pattern' and extract an index.
// Then replace the matched string with 'strings[index]'.
async function replacePattern(pattern, strings, extract = /\[:(\d+):\]/g) {
    return new Promise((resolve, _) => {
        strings = strings.map(item => {
            return item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        });
        pattern = pattern.replace(extract, (_, p1) => {
            let index = Number(p1);
            return strings[index];
        });
        resolve(pattern);
    });
}

function replacePattern(pattern, strings, extract = /\[:(\d+):\]/g) {
    // return new Promise((resolve, _) => {
    strings = strings.map(item => {
        return item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    return pattern.replace(extract, (_, p1) => {
        let index = Number(p1);
        return strings[index];
    });
    // resolve(pattern);
    // });
}

async function collapseExpand(rule = { start, end }, rootElem = document) {
    let { start, end } = rule;

    if (this.uniqueID == undefined) this.uniqueID = 0;
    else this.uniqueID++;
    if (!start.className || !start.className.length)
        start.className = LABEL.classCEStart + "_" + uniqueID;
    if (!end.className || !end.className.length)
        end.className = LABEL.classCEEnd + "_" + uniqueID;

    start.boring = end.boring = function boring() {
        this.wrapElem = document.createElement("a");
        this.wrapElem.classList.add(this.className);
        this.wrapElem.classList.add(this.classWhiteList);
        this.wrapElem.style.backgroundColor = this.color;
        if (this.link && this.link.length)
            this.wrapElem.href = this.link;
        if (this.hint && this.hint.length) {
            this.hintFlag = true;
            this.hintElement = document.createElement("div");
            this.hintElement.classList.add(LABEL.classHint);
            this.hintElement.classList.add(LABEL.classWhiteList);
            this.hintElement.innerText = this.hint;
            document.body.append(this.hintElement);
        }
    }
    start.boring();
    start.wrapElem.classList.add(LABEL.classCEStart);
    end.boring();
    end.wrapElem.classList.add(LABEL.classCEEnd);

    start.reObj = createReObj(start);
    debugger;
    let stack = [rootElem];
    while (stack.length) {
        let node = stack.pop();

        if (node instanceof Text) {
            while (start.match = start.reObj.exec(node.data)) {
                let text = node.data;
                if (start.match.index) {
                    let foreText = text.substring(0, start.match.index);
                    let foreNode = document.createTextNode(foreText);
                    node.before(foreNode);
                    stack.push(foreNode);
                }
                start.elemnt = start.wrapElem.cloneNode(true);
                start.elemnt.innerText = start.match[0];
                node.before(start.elemnt);
                let lastIndex = start.match.index + start.match[0].length;
                if (lastIndex < text.length) {
                    let lastText = text.substring(lastIndex);
                    let lastNode = document.createTextNode(lastText);
                    node.before(lastNode);
                }
                node.remove();


                console.log(start.match[0]);
                console.log(start.match[1]);
                //debugger;

                end.rawPattern = end.pattern;
                end.pattern = replacePattern(end.pattern, start.match);
                end.reObj = createReObj(end);
                end.pattern = end.rawPattern;

                console.log(end.reObj.source);
                //debugger;

                node = start.elemnt.nextSibling;
                let candidates = [];
                while (node) {
                    if (node instanceof Text) {
                        if (end.match = end.reObj.exec(node.data)) {
                            let text = node.data;
                            if (end.match.index) {
                                let foreText = text.substring(0, end.match.index);
                                let foreNode = document.createTextNode(foreText);
                                node.before(foreNode);
                                candidates.push(foreNode);//
                            }
                            end.elemnt = end.wrapElem.cloneNode(true);
                            end.elemnt.innerText = end.match[0];
                            node.before(end.elemnt);
                            let lastIndex = end.match.index + end.match[0].length;
                            if (lastIndex < text.length) {
                                let lastText = text.substring(lastIndex);
                                let lastNode = document.createTextNode(lastText);
                                node.before(lastNode);
                            }
                            node.remove();
                            node = end.elemnt.nextSibling;
                            addBrElement(end.elemnt);

                            let container = document.createElement("span");
                            container.classList.add(LABEL.classCE);
                            container.style.display = "none";
                            for (let candidate of candidates) {
                                container.appendChild(candidate);
                            }
                            start.elemnt.after(container);
                            start.elemnt.ondblclick = end.elemnt.ondblclick = _ => {
                                let status = container.style.display;
                                if (status == "inline") {
                                    container.style.display = "none";
                                }
                                else {
                                    container.style.display = "inline";
                                }
                            };
                            break;//
                        }
                    }
                    candidates.push(node);
                    node = node.nextSibling;
                }
            }
        }

        let child = node.firstChild;
        while (child) {
            stack.push(child);
            child = child.nextSibling;
        }
    }
    return true;
}




// **Return values"
// count: The amount of collapse/expand elements.
async function collapseExpandRestNodes(startColor = "lime", endColor = "green", rootElem = document) {
    return new Promise((resolve, _) => {
        let count = 0;
        let stack = [rootElem];

        while (stack.length) {
            let node = stack.pop();

            if (node instanceof Text) {
                if (node.data.trim().length) {
                    let container = document.createElement("span");
                    container.classList.add(LABEL.classCE);
                    container.style.display = "none";
                    node.before(container);
                    container.appendChild(node);

                    let sDummy = document.createElement("span");
                    sDummy.classList.add(LABEL.classDummy);
                    sDummy.classList.add(LABEL.classCEStart);
                    sDummy.classList.add(LABEL.classWhiteList);
                    sDummy.style.backgroundColor = startColor;
                    sDummy.innerText = "[ Dummy - collpase/expand start ]";
                    container.before(sDummy);

                    let eDummy = document.createElement("span");
                    eDummy.classList.add(LABEL.classDummy);
                    eDummy.classList.add(LABEL.classCEEnd);
                    eDummy.classList.add(LABEL.classWhiteList);
                    eDummy.style.backgroundColor = endColor;
                    eDummy.innerText = "[ Dummy - collpase/expand end ]";
                    container.after(eDummy);

                    sDummy.ondblclick = eDummy.ondblclick = _ => {
                        let status = container.style.display;
                        if (status == "inline") {
                            container.style.display = "none";
                        }
                        else {
                            container.style.display = "inline";
                        }
                    };

                    addBrElement(eDummy);
                    count++;
                }
                else {
                    node.remove();
                }
                continue;
            }

            let child = node.lastChild;
            while (child) {
                if (!(child instanceof Element) ||
                    !child.classList.contains(LABEL.classWhiteList) &&
                    !child.classList.contains(LABEL.classCE) &&
                    !child.classList.contains(LABEL.classCEStart) &&
                    !child.classList.contains(LABEL.classCEEnd) /* &&
                    !child.classList.contains(LABEL.classDummy) */
                ) {
                    stack.push(child);
                }

                child = child.previousSibling;
            }
        }
        resolve(count);
    });
}

// Add a <br /> element after node.
function addBrElement(node) {
    let br = document.createElement("br");
    // br.classList.add(LABEL.classDummy);
    node.after(br);
}

// Read all rules from local storage, and apply them to collapse and expand text.
async function triggerCollapseExpand() {
    return new Promise((resolve, _) => {
        normalize();
        chrome.storage.local.get(
            { collapseExpandRules: [] },
            result => {
                let promise = new Promise((resolve, _) => resolve(0));
                let rules = result.collapseExpandRules;
                for (let rule of rules) {
                    promise = promise.then(_ => {
                        return collapseExpand(rule);
                    });
                }
                promise.then(_ => {
                    resolve(true);
                });
            }
        );
    }).then(_ => {
        debugger;
        return collapseExpandRestNodes();
    });
}
