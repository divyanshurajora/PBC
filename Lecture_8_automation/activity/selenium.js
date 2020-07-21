require("chromedriver");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();
let { email, password } = require("../../credentials.json");

let TabwillbeOpenedPromise = tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
let gCodesElement, gcInputBox, gTextArea;

TabwillbeOpenedPromise
    .then(function () {
        let findtimeoutP = tab.manage().setTimeouts({
            implicit: 10000
        });
        return findtimeoutP;
    })
    .then(function () {
        // go to email input box
        let inputboxpromise = tab.findElement(swd.By.css("#input-1"));
        return inputboxpromise;
    })
    .then(function (inputBox) {
        // enter email into input box
        let inputboxwillbefilledP = inputBox.sendKeys(email);
        return inputboxwillbefilledP;
    })
    .then(function () {
        // go to password box
        let inputboxpromise2 = tab.findElement(swd.By.css("#input-2"));
        return inputboxpromise2;
    })
    .then(function (inputBox2) {
        // enter password into pass box
        let inputboxwillbefilledP2 = inputBox2.sendKeys(password);
        return inputboxwillbefilledP2;
    })
    .then(function () {
        // go to to login button
        let loginwillselectedP = tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
        return loginwillselectedP;
    })
    .then(function (LoginBtn) {
        //click login button
        let loginwillbeclickedP = LoginBtn.click();
        return loginwillbeclickedP;
    })
    .then(function () {
        //go to interview preparation 
        let IpbuttonwillbefoundP = tab.findElement(swd.By.css("h3[title='Interview Preparation Kit']"));
        return IpbuttonwillbefoundP;
    })
    .then(function (IpBtn) {
        // click interview prep
        let IpBtnwillbeclickedP = IpBtn.click();
        return IpBtnwillbeclickedP;
    })
    .then(function () {
        // go to warmup challenges
        let WuBtnwillbeselectedP = tab.findElement(swd.By.css("a[data-attr1='warmup']"));
        return WuBtnwillbeselectedP;
    })
    .then(function (WuBBtn) {
        //click warmup challenges
        let WuBtnwillbeclickedP = WuBBtn.click();
        return WuBtnwillbeclickedP;
    })
    .then(function () {
        // console.log("Reached warm challenges page")
        // selenium
        //let urlofQP = tab.getCurrentUrl();
        //return urlofQP;
        let AllQtag = tab.findElements(swd.By.css("a.js-track-click.challenge-list-item"));
        return AllQtag;

    }).then(function (alQues) {
        //let questionWillBeSolvedPromise = questionSolver();
        //return questionWillBeSolvedPromise;
        let allQLinkP = alQues.map(function (anchor) {
            return anchor.getAttribute("href");
        })
        let allLinkPromise = Promise.all(allQLinkP);
        return allLinkPromise;
    })
    .then(function (allQLink) {
        // serial execution of all the promises
        let f1Promise = questionSolver(allQLink[0]);
        for (let i = 1; i < allQLink.length; i++) {
            f1Promise = f1Promise.then(function () {
                return questionSolver(allQLink[i])
            })
        }
        let lstQuestWillBeSolvedP = f1Promise;
        return lstQuestWillBeSolvedP;
    })
    .then(function () {
        console.log("All questions solved");
    })
    .catch(function (err) {
        console.log(err);
    })

function questionSolver(url) {
    return new Promise(function (resolve, reject) {
        let qPageWillBeOpenedP = tab.get(url);
        qPageWillBeOpenedP.then(function () {
            let EdtBtnwillbeselectedP = tab.findElement(swd.By.css("#Editorial"));
            return EdtBtnwillbeselectedP;
        })
        // let AllSolveChallengebtn = tab.findElements(swd.By.css(".challenge-submit-btn"));
        // AllSolveChallengebtn.then(function (CBtnArr) {
        //     let CBtnWillbeClickedP = CBtnArr[0].click();
        //     return CBtnWillbeClickedP;
        // })
        //     .then(function () {
        //         // go to Editorial button
        //         let EdtBtnwillbeselectedP = tab.findElement(swd.By.css("#Editorial"));
        //         return EdtBtnwillbeselectedP;
        //     })
            .then(function (EdtBtn) {
                //click Editorial button
                let EdtBtnwillbeclickedP = EdtBtn.click();
                return EdtBtnwillbeclickedP;
            })
            .then(function () {
                
                handleLockBtnP = handleLockBtn();
                console.log("1")
                return handleLockBtnP;
            })
            .then(function () {
                console.log("2")
                let CodeWillbecopied = copycode();
                return CodeWillbecopied;
            })
            .then(function (code) {
                let codeWillBepastedP = pasteCode(code);
                return codeWillBepastedP;
            })
            .then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    })
}


function handleLockBtn() {
    return new Promise( function(resolve,reject){


        let lockBtnWillBeFind = tab.findElement(swd.By.css(".editorial-content-locked button"))
        lockBtnWillBeFind
        .then(function(lockBtn){
            let lockBtnWillBeClicked = lockBtn.click()
            return lockBtnWillBeClicked;    
        })
        .then(function(){
            resolve()
        })
        .catch(function(){
            resolve()
        })

    })
}

function copycode() {
    return new Promise(function (resolve, reject) {
        let AllLangElementP = tab.findElements(swd.By.css(".hackdown-content h3"));
        let AllCodeElementP = tab.findElements(swd.By.css(".hackdown-content .highlight"));
        let bothArrP = Promise.all([AllLangElementP, AllCodeElementP]);
        bothArrP
            .then(function (bothArrays) {
                let LangsElement = bothArrays[0];
                gCodesElement = bothArrays[1];
                let AllLangTextP = [];
                for (let i = 0; i < LangsElement.length; i++) {
                    let cLangP = LangsElement[i].getText();
                    AllLangTextP.push(cLangP);
                }
                return Promise.all(AllLangTextP);
            }).then(function (AllLangs) {
                let codeofCP;
                for (let i = 0; i < AllLangs.length; i++) {
                    if (AllLangs[i].includes("C++")) {
                        codeofCP = gCodesElement[i].getText();
                        break;
                    }
                }
                return codeofCP;
            }).then(function (code) {
                console.log(code);
                resolve(code);
            })
            .catch(function (err) {
                reject(err);
            })
    })
}

function pasteCode(code) {
    return new Promise(function (resolve, reject) {
        // click on problem tab
        let pTabWillBeSelectedP = tab.findElement(swd.By.css("li#Problem"));
        pTabWillBeSelectedP.then(function (pTab) {
            let pTwillBeClickedP = pTab.click();
            return pTwillBeClickedP;
        }).then(function () {
            let inputBoxWBeSP = tab.findElement(swd.By.css(".custom-input-checkbox"));
            return inputBoxWBeSP;
        }).then(function (inputBox) {
            let inputbWillBeCP = inputBox.click();
            return inputbWillBeCP;
        }).then(function () {
            let cInputWillBeSelectedP = tab.findElement(swd.By.css(".custominput"));
            return cInputWillBeSelectedP;
        }).then(function (cInputBox) {
            gcInputBox = cInputBox;
            let codeWillBeEnteredP = cInputBox.sendKeys(code);
            return codeWillBeEnteredP;
        }).then(function () {
            let ctrlAWillBeSendP = gcInputBox.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBeSendP;
        }).then(function () {
            let ctrlXWillBeSendP = gcInputBox.sendKeys(swd.Key.CONTROL + "x");
            return ctrlXWillBeSendP;
        })
            .then(function () {
                let tAreaP = tab.findElement(swd.By.css("textarea"));
                //console.log(2);
                return tAreaP;
            }).then(
                function (tArea) {
                gTextArea = tArea;
                let CodeWillBeEP = tArea.sendKeys(swd.Key.CONTROL + "a");
                // console.log(3);
                return CodeWillBeEP;
            }).then(function () {
                let ctrlVWillBeSendP = gTextArea.sendKeys(swd.Key.CONTROL + "v");
                return ctrlVWillBeSendP;
            }).then(function () {
                let submitCodeBtnWillBeS = tab.findElement(swd.By.css("button.hr-monaco-submit"));
                return submitCodeBtnWillBeS;
            }).then(function (submitBtn) {
                let submitBtnWillBeClickedP = submitBtn.click();
                return submitBtnWillBeClickedP;
            })
            .then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
        // write the code 
        // submit the code 
    })
}