// The data shown in panel need to implement following interface
class SPData {
    isZeroCount() { return false; }
    isEqualByRule(item) { return false; }
    getSummary() { return "[ Dummy - statistic panel ]"; }
    getElement() {
        let dummy = document.createElement("span");
        dummy.classList.add(LABEL.classSP);
        dummy.classList.add(LABEL.classDummy);
        dummy.classList.add(LABEL.classWhiteList);
        dummy.style.backgroundColor = "gray";
        dummy.innerText = this.getSummary();
        return dummy;
    }
}

// rules about Highlight text and its corresponding results
class HLData extends SPData {
    constructor(rule, result) {
        super();
        this.rule = rule;
        this.result = result;
        this.index = 0;
        this.nodes = document.getElementsByClassName(result.className);
    }
    isZeroCount() {
        return this.result.count == 0;
    }
    isEqualByRule(item) {
        if (item instanceof HLData) {
            return compareReObjRule(this.rule, item.rule);
        }
        return false;
    }
    getSummary() {
        let str1 = summarizeReObjRule(this.rule);
        let str2 = "count: " + this.result.count;
        return [str1, str2].join(", ");
    }
    getElement() {
        let index = this.index;
        let nodes = this.nodes;
        let count = this.result.count;

        let containerElem = document.createElement("span");
        containerElem.classList.add(LABEL.classSP);
        containerElem.classList.add(LABEL.classWhiteList);

        let bannerElem = document.createElement("a");
        bannerElem.style.backgroundColor = this.rule.color;
        bannerElem.innerText = this.getSummary();
        if (this.rule.link && this.rule.link.length) {
            bannerElem.href = this.rule.link;
        }
        containerElem.appendChild(bannerElem);

        let minusElem = document.createElement("button");
        minusElem.innerText = "-";
        minusElem.onclick = () => {
            if (index) {
                nodes[index - 1].style.fontWeight = "normal";
            }
            index--;
            if (index < 1) {
                index = count;
            }
            indexElem.innerText = index;
            let node = nodes[index - 1];
            while (node.parentElement) {
                if (node.classList.contains(LABEL.classCE)) {
                    node.style.display = "inline";
                }
                node = node.parentElement;
            }
            nodes[index - 1].style.fontWeight = "bold";
            nodes[index - 1].scrollIntoView(true);
        };
        containerElem.appendChild(minusElem);

        let indexElem = document.createElement("span");
        indexElem.innerText = index;
        containerElem.appendChild(indexElem);

        let plusElem = document.createElement("button");
        plusElem.innerText = "+";
        plusElem.onclick = () => {
            if (index) {
                nodes[index - 1].style.fontWeight = "normal";
            }
            index++;
            if (index > count) {
                index = 1;
            }
            indexElem.innerText = index;
            let node = nodes[index - 1];
            while (node.parentElement) {
                if (node.classList.contains(LABEL.classCE)) {
                    node.style.display = "inline";
                }
                node = node.parentElement;
            }
            nodes[index - 1].style.fontWeight = "bold";
            nodes[index - 1].scrollIntoView(true);
        }
        containerElem.appendChild(plusElem);

        return containerElem;
    }
}

// rules about Collapse/Expand and its corresponding results
class CEData extends SPData {
    constructor(rule, result) {
        super();
        this.rule = rule;
        this.result = result;
    }
    isZeroCount() {
        return this.result.count == 0;
    }
    isEqualByRule(item) {
        if (item instanceof CEData) {
            return (
                compareReObjRule(this.rule.start, item.rule.start) &&
                compareReObjRule(this.rule.end, item.rule.end)
            );
        }
        return false;
    }
    getSummary() {
        let str1 = "start: " + summarizeReObjRule(this.rule.start, false);
        let str2 = "end: " + summarizeReObjRule(this.rule.end, false);
        let str3 = "count: " + this.result.count;
        return [str1, str2, str3].join(", ");
    }
}

class SPDataSet extends Array {
    removeZeroCountDatas() {
        for (let i = this.length - 1; i >= 0; i--) {
            if (this[i].isZeroCount()) {
                this.splice(i, 1);
            }
        }
    }
    deuplicateDatas() {
        for (let i = 0; i < this.length; i++) {
            for (let j = this.length - 1; j > i; j--) {
                if (this[i].isEqualByRule(this[j])) {
                    this.splice(j, 1);
                }
            }
        }
    }
}

let HL_dataset;
let CE_dataset;
function SP_initialize() {
    HL_dataset = new SPDataSet();
    CE_dataset = new SPDataSet();
}

async function getDatumElements(...datasets) {
    return new Promise((resolve, _) => {
        for (let dataset of datasets) {
            dataset.removeZeroCountDatas();
            dataset.deuplicateDatas();
        }
        let SP_dataset = (new SPDataSet).concat(...datasets);
        elements = SP_dataset.map(data => {
            return data.getElement();
        });
        resolve(elements);
    });
}

async function showElementsOnRightTop(elements) {
    return new Promise((resolve, _) => {
        let offsetX = 10;
        let offsetY = 10;
        let gap = 5;
        for (let elem of elements) {
            elem.classList.add(LABEL.classSP);
            elem.style.right = offsetX + "px";
            elem.style.top = offsetY + "px";
            document.body.appendChild(elem);
            offsetY += elem.offsetHeight + gap;
        }
        resolve(0);
    });
}

async function tirggerStatisticPanel() {
    return getDatumElements(HL_dataset, CE_dataset)
        .then(elements => {
            return showElementsOnRightTop(elements);
        });
}
