const LABEL = {
    classHighlight: "lr_hl", // log reader highlight
    classHint: "lr_ht", // log reader hint
    classWhiteList: "lr_wl", // log reader white list
    classCE: "lr_ce", // log reader collapse expand
    classCEStart: "lr_ces", // log reader collapse expand start
    classCEEnd: "lr_cee", // log reader collapse expand end
    classDummy: "lr_dm", // log reader dummy
    classEnter: "lr_et", // log reader enter
    classSP: "lr_sp", //log reader statistic panel
}

let de = false;
let bug_performance = (() => {
    let last;
    return message => {
        if (last) {
            let now = new Date();
            let interval = now - last;
            last = now;
            console.log(message, interval);
        }
        else {
            last = new Date();
            console.log(message, last);
        }
    }
})();

let innerHTMLHasSaved = false;
let innerHTMLCopy;
function initialize() {
    if (innerHTMLHasSaved == false) {
        innerHTMLCopy = document.body.innerHTML;
        innerHTMLHasSaved = true;
    }
    else {
        debugger;
        document.body.innerHTML = innerHTMLCopy;
    }
    document.normalize();

    SP_initialize();
}

// Trigger all trigger...functions
async function triggerAll() {

    de && bug_performance("triggerAll():");
    initialize();
    de && bug_performance("initialize():");
    return triggerCollapseExpand()
        .then(_ => {
            de && bug_performance("triggerCollapseExpand():");
            return triggerHighlightText();
        })
        .then(_ => {
            de && bug_performance("triggerHighlightText():");
            return tirggerStatisticPanel();
        })
        .then(_ => {
            de && bug_performance("tirggerStatisticPanel():");
        });
}
