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
    classSPFocus: "lr_spf", //log reader statistic panel focus
}

let isAtOriginalPage = true;
let originalBodyElementCopyHasSaved = false;
let originalBodyElementCopy;
let originalBodyElementHasSaved = false;
let originalBodyElement;
let processedBodyElementHasSaved = false;
let processedBodyElement;

// Trigger all trigger...functions
async function triggerAll() {
    if (originalBodyElementCopyHasSaved == false) {
        document.normalize();
        originalBodyElementCopy = document.body.cloneNode(true);
        originalBodyElementCopyHasSaved = true;
    }

    if (isAtOriginalPage == false) {
        if (originalBodyElementHasSaved == true) {
            document.body.replaceWith(originalBodyElement);
        }
        else {
            document.body.replaceWith(originalBodyElementCopy.cloneNode(true));
        }
    }

    SP_initialize();
    return triggerCE().then(_ => {
        return triggerHL();
    }).then(_ => {
        return tirggerStatisticPanel();
    }).then(_ => {
        isAtOriginalPage = false;
        originalBodyElementHasSaved = false;
        processedBodyElement = document.body;
        processedBodyElementHasSaved = true;
    });
}

function switchPage() {
    if (isAtOriginalPage == true) {
        if (processedBodyElementHasSaved == true) {
            document.body.replaceWith(processedBodyElement);
        }
        else {
            triggerAll();
        }
        isAtOriginalPage = false;
    }
    else {
        if (originalBodyElementHasSaved == true) {
            document.body.replaceWith(originalBodyElement);
        }
        else {
            document.body.replaceWith(originalBodyElementCopy.cloneNode(true));
            originalBodyElement = document.body;
            originalBodyElementHasSaved = true;
        }
        isAtOriginalPage = true;
    }
}
