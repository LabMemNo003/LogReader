class Datum extends Array {
    isZeroCount(item) { return false; }
    compareRule(item1, item2) { return false; }
    getItemSummary(item) { return "[ Dummy - statistic panel ]"; }
    getItemElement(item) {
        let dummy = document.createElement("span");
        dummy.style.backgroundColor = "gray";
        dummy.innerText = this.getItemSummary(item);
        return dummy;
    }

    debugging() {
        for (let item of this) {
            console.log(this.getItemSummary(item));
        }
    }
    removeZeroCountItems() {
        for (let i = this.length - 1; i >= 0; i--) {
            if (this.isZeroCount(this[i])) {
                this.splice(i, 1);
            }
        }
    }
    deuplicateItems() {
        for (let i = 0; i < this.length; i++) {
            for (let j = i + 1; j < this.length; j++) {
                if (this.compareRule(this[i], this[j])) {
                    this.splice(j, 1);
                    j--;
                }
            }
        }
    }
}

// rules about Highlight text and its corresponding results
class HLDatum extends Datum {
    isZeroCount(item) {
        return item.result.count == 0;
    }
    compareRule(item1, item2) {
        return compareReObjRule(item1.rule, item2.rule);
    }
    getItemSummary(item) {
        return JSON.stringify(item);
    }
}

// rules about Collapse/Expand and its corresponding results
class CEDatum extends Datum {
    isZeroCount(item) {
        return item.result.count == 0;
    }
    compareRule(item1, item2) {
        return (
            compareReObjRule(item1.rule.start, item2.rule.end) &&
            compareReObjRule(item1.rule.end, item2.rule.end)
        );
    }
    getItemSummary(item) {
        return JSON.stringify(item);
    }
}

let HL_datum = new HLDatum();
let CE_datum = new CEDatum();

async function getDatumElements(...datums) {
    new Promise((resolve, _) => {
        let datum = new Datum();
        datum.concat(...datums);
        elements = datum.map(item => {
            return datum.getItemElement(item);
        });
        resolve(elements);
    });
}

async function showElementsOnRightTop(elements) {
    let offsetX = 10;
    let offsetY = 10;
    for (let elem of elements) {
        elem.classList.add(LABEL.classSP);
        elem.style.left = "10px";
        elem.style.top = offset + 20 + "px";
    }
    return 0;
}

async function tirggerStatisticPanel() {
    return new Promise((resolve, _) => {
        normalize();
        debugger;
        let offset = 20;
        for (let item of HL_datum) {
            let elem = HL_datum.getItemElement(item);
            elem.classList.add(LABEL.classSP);
            elem.style.left = "20px";
            elem.style.top = offset + "px";
            document.body.appendChild(elem);
            offset += 20;
        }
        resolve(0);
    });
}
