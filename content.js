const LABEL = {
    classHighlight: "lr_hl", // log reader highlight
    classHint: "lr_ht", // log reader hint
    classWhiteList: "lr_wl", // log reader white list
    classCE: "lr_ce", // log reader collapse expand
    classCEStart: "lr_ces", // log reader collapse expand start
    classCEEnd: "lr_cee", // log reader collapse expand end
    classDummy: "lr_dm", // log reader dummy
}

// Trigger all trigger...functions
async function triggerAll() {
    normalize();
    return triggerCollapseExpand()
        .then(_ => {
            return triggerHighlightText();
        });
}
