# Log Reader
Make plain text more readable in browser.  
For more detail please refer to https://github.com/LabMemNo003/LogReader/wiki .

## Install on Chrome
Search "LogReader" in [chrome web store](https://chrome.google.com/webstore/category/extensions), or:

> ### Install latest version on Chrome with developer mode
> 1. Download package from [**here**](https://github.com/LabMemNo003/LogReader/releases) and unzip it.
> 2. Navigate to `chrome://extensions` in your browser.
> 3. Check the box next to **Developer Mode**.
> 4. Click **Load Unpacked Extension** and select **Log Reader**'s directory.

## Install on Firefox
Search "Log Reader" in [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/), or:

> ### Install latest version on Firefox with debugging mode
> 1. Download package from [**here**](https://github.com/LabMemNo003/LogReader/releases) and unzip it.
> 2. Type `about:debugging` in the Firefox URL bar.
> 3. Click **Load Temporary Add-on** and select any file in **Log Reader**'s directory.  
>    The extension will now be installed, and will stay until you restart Firefox.

---

## To-do list
- [x] H: Implement highlight text (callback) - 2018/11/23~2018/11/25
- [x] H: Performance improvement (promise) - 2018/11/27~2018/12/03
- [x] H: Implement collapse/expand text - 2018/12/03~2018/12/04
- [x] H: Reimplement collapse/expand text (extend RE) (recursive CE) - 2018/12/04~2018/12/05
- [x] M: Implement statistic of match results and show it - 2018/12/05~2018/12/07
- [x] M: Automatically scroll down to desired element - 2018/12/05~2018/12/07
- [x] H: Documnetation about installation - 2018/12/07~2018/12/09
- [x] H: Ctrl+F to switch between original log and processed log - 2018/12/08~2018/12/09
- [x] H: Implement setting or resetting default rules in extension - 2018/12/08~2018/12/09
- [x] H: Dynamically update web page instead of reloading it - 2018/12/05~2018/12/11
- [x] H: Allow to change precedence of rules - 2018/12/05~2018/12/11
- [x] H: Use `<input type="color">` to choose color - 2018/12/05~2018/12/12
- [x] M: Add more default rules in extension - 2018/12/09~2018/12/12
- [ ] H: Documentation about rules - 2018/12/09
- [ ] M: Add URL filters to select rules to be executed - 2018/12/06
- [ ] M: Improve the performance about statistic panel - 2018/12/07
- [ ] M: When stroke Ctrl+Shift+F, switch to exactly same place in the log 2018/12/09
- [ ] M: Implement Element.scrollIntoViewIfNeeded() for firefox - 2018/12/09
- [ ] L: Performance improvement on collapseExpand() (Break loop) - 2018/12/05
- [ ] L: Add link to collapse/expand's start/end element - 2018/12/05
- [ ] L: Imigrate to TamperMonkey - 2018/12/08
- [ ] P: Process log during its loading phase - 2018/12/07
- [ ] P: Need to resolve the overlap of matched strings - 2018/12/10
