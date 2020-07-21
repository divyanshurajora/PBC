let ppt = require("puppeteer");
let { email, password } = require('../../credentials.json');

(async function () {
    let browser = await ppt.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: null,
        args: ["--start-maximized"]
    });

    let pkArray = await browser.pages();
    let page = pkArray[0];
    await page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    await page.type("#input-1", email);
    await page.type("#input-2", password);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click("button[data-analytics='LoginPassword']")]);
    await page.waitForSelector("a[data-analytics='NavBarProfileDropDown']", { visible: true });
    await page.click("a[data-analytics='NavBarProfileDropDown']");
    await page.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']", { visible: true });
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click("a[data-analytics='NavBarProfileDropDownAdministration']")]);
    await page.waitForSelector("a[href='/administration/challenges']", { visible: true });
    await page.click("a[href='/administration/challenges']");
    await handeSinglePage(page,browser);

})();

async function handeSinglePage(page,browser){
    await page.waitForSelector("a.backbone.block-center");
    let allChallenges = await page.$$("a.backbone.block-center");
    let allHrefP = [];
    for(let i = 0 ; i < allChallenges.length ; i++){
        let hrefP = page.evaluate(function (elem){
            return elem.getAttribute("href");
        },allChallenges[i]);
        allHrefP.push(hrefP);
    }
    let allHref = await Promise.all(allHrefP);
    let parallelTaskP = [];
    for(let i = 0 ; i < allHrefP.length ; i++){
        let newTab = await browser.newPage();
        let p = solveSingleQues(newTab,`https://www.hackerrank.com${allHref[i]}`);
        parallelTaskP.push(p);
    }
    await Promise.all(parallelTaskP);
    let liList = await page.$$(".pagination ul li");
    let next = await page.evaluate(function (elem){
        return elem.getAttribute("class");
    },liList[5]);
    if(next != "disabled"){
        await Promise.all([page.waitForNavigation({waitUntil : "networkidle0"}),page.click("a[data-attr1='Right']")]);
        await handeSinglePage(page,browser);
    }
    
}
async function solveSingleQues(newTab,link){
    await newTab.goto(link,{waitUntil : "networkidle0"});
    await newTab.waitForSelector("li[data-tab='moderators'] a",{visible : true});
    await newTab.click("li[data-tab='moderators'] a");
    await newTab.waitForSelector("#moderator");
    await newTab.type("#moderator","Nick");
    await newTab.keyboard.press('Enter');
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.close();
}