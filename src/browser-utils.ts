 

type Context = browser.contextMenus.OnClickData
export function createMiddleware(ctx){
    const ctx: Context = { info };
}
export function cickMiddleware(ctx){
    const ctx: Context = { info };

}

browser.contextMenus.onClicked.addListener(createMiddleware(cickMiddleware()))




const webNavigation = browser.webNavigation;
const tabs = browser.tabs;


export function createUrlFilter(patterns: string[]){
    const filter = patterns.map(p => { return { urlMatches: p }})
    return {
        url: filter
    }
}


export async function bindWebNav(registry: Map<string, JsScript>){
    for (const [name,js] of registry){
        if (!js.matches || !js || !js.code){ throw new Error(`js.matches`); }
        webNavigation.onBeforeNavigate.addListener((details) => {
            const code = js.code
            if (!code){ throw new Error(`code`); }
            log(`NAV`, name, details, code.length);
            tabs.executeScript(details.tabId, {
                code: code,
                runAt: `document_start`
            });
        },
        createUrlFilter(js.matches));
    }
    return true

}


/* async function bindMatchers(registry: Map<string, JsScript>){
    for (const [name,js] of this._scripts){
        browser.webNavigation.onDOMContentLoaded.addListener(async (details) => {
            this.logger.log(`COMMAND: ${CAT.Inject}`, name, details, js.code.length);
            const js2 = this._scripts.get(name);
            commands[CAT.Inject](details.tabId, js2.code);
        },
        createUrlFilter(js.matches));
    }
    this.logger.log(`bound scripts`, this._scripts);
    return true
} */


export async function updateTabs(scripts: JsScriptRegistry){
    const tabs = await browser.tabs.query({ status: 'complete' }); 
    for (const tab of tabs){ 
        for (const [name,js] of scripts){
            if (!tab.id || !js.matches || !js.code){ throw new Error(`js.matches`); }
            const isMatch = js.matches.some(r => new RegExp(r).test(tab.url as string));
            if (isMatch){ 
                log(`isMatch`, tab, name, js.code.length);
                injectScript(tab.id, js.code);
/*                 browser.tabs.executeScript(tab.id, {
                    code: js.code,
                    runAt: `document_start`
                });   //this.injectScript(tab.id, { name }); */
            }
        }
    }
}


export async function updateActiveTab(script: JsScript){
    const activeTab = await tabs.query({ currentWindow: true, active: true }).then(t => t[0]);
    if (!activeTab.id){ throw new Error(`tab`); }
    const code = script.code
    if (!code){ throw new Error(`code`); }
    tabs.executeScript(activeTab.id, {
        code: code,
        runAt: `document_start`
    })
}