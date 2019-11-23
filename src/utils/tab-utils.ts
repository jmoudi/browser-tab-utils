
export function getDuplicates(tabs: Tabs.Tab[]){
 
}

export function jumpToActiveMedia(tabs: Tabs.Tab[]) {

	}

export function focus(tab: Tabs.Tab) {

	}

    export async function focusPrev2(ctx: App) {
        const currentTab = await tabs.query({ active: true });
        log(`cur`, currentTab);
    }
    export async function focusNext2(ctx: App) {
        const currentTab = await tabs.query({ active: true });
        log(`cur`, currentTab);
    
    }
    export async function focusPrev() {
        console.time('1')
        const currentTab = await browser.tabs.query({ active: true });
        browser.tabs.update(currentTab[0].id as number - 1, {
            active: true
        });
        console.timeEnd('1');
        console.log(`cur`, currentTab);
    }
    
    export async function focusNext() {
        console.time('1')
        const currentTab = await browser.tabs.query({ active: true });
        browser.tabs.update(currentTab[0].id as number + 1, {
            active: true
        });
        console.timeEnd('1');
        console.log(`cur`, currentTab);
    }
    
    export function forceStopLoading(tab: Tabs.Tab) {
        const id = tab.id ? tab.id : 1;
        if (tab.status !== "complete") {
            browser.tabs.update(id, { active: true });
        }
    }
    
    export function getSelected(){
            return browser.tabs.query({ highlighted: true });
    }
    export function getAll(){
            return browser.windows.getAll({ populate: true });
        }
    export function getAllinWindow(){
        return browser.tabs.query({ currentWindow: true });
    }


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


export const isTabComplete = tab => tab.status === "complete";

export const isTabLoading = tab => tab.status === "loading";

export const getTab = (tabId) => {
    return new Promise((resolve) => {
        chrome.tabs.get(tabId, tab => {
            if (chrome.runtime.lastError) console.error("getTab error:", chrome.runtime.lastError.message);
            resolve(chrome.runtime.lastError ? null : tab);
        });
    });
};

export const getTabs = (queryInfo) => {
    return new Promise((resolve) => {
        queryInfo.windowType = "normal";
        chrome.tabs.query(queryInfo, tabs => {
            if (chrome.runtime.lastError) console.error("getTabs error:", chrome.runtime.lastError.message);
            resolve(chrome.runtime.lastError ? null : tabs);
        });
    });
};

export const getWindow = (windowId) => browser.windows.get(windowId);

/*     return new Promise((resolve) => {
        chrome.windows.get(windowId, windows => {
            if (chrome.runtime.lastError) console.error("getWindow error:", chrome.runtime.lastError.message);
            resolve(chrome.runtime.lastError ? null : windows);
        });
    });
}; */

export const getWindows = () => {
    return new Promise((resolve) => {
        chrome.windows.getAll(null, windows => {
            if (chrome.runtime.lastError) console.error("getWindows error:", chrome.runtime.lastError.message);
            resolve(chrome.runtime.lastError ? null : windows);
        });
    });
};

export const updateWindow = (windowId, updateProperties) => {
    return new Promise((resolve) => {
        chrome.windows.update(windowId, updateProperties, () => {
            if (chrome.runtime.lastError) console.error("updateWindow error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

export const getActiveTab = async (windowId) => {
    const tabs = await getTabs({ windowId: windowId, active: true });
    return tabs ? tabs[0] : null;
};

export const reloadTab = (tabId) => {
    return new Promise((resolve) => {
        chrome.tabs.reload(tabId, () => {
            if (chrome.runtime.lastError) console.error("reloadTab error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

export const getActiveWindowId = async () => {
    const tabs = await getTabs({ currentWindow: true, active: true });
    return tabs ? tabs[0].windowId : null;
};

export const getCurrentwindow = async () => {
    return new Promise((resolve) => {
        chrome.windows.getCurrent(null, focusedWindow => {
            if (chrome.runtime.lastError) console.error("getCurrentwindow error:", chrome.runtime.lastError.message);
            resolve(focusedWindow);
        });
    });
};

export const updateTab = (tabId, updateProperties) => {
    return new Promise((resolve) => {
        chrome.tabs.update(tabId, updateProperties, () => {
            if (chrome.runtime.lastError) console.error("updateTab error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

export const activateWindow = (windowId) => updateWindow(windowId, { focused: true });

export const activateTab = async (tabId, windowId) => {
    if (windowId) {
        const window = await getWindow(windowId);
        if (!window) return;
        if (!window.focused) await activateWindow(windowId);
    }
    updateTab(tabId, { active: true });
};

export const moveTab = (tabId, moveProperties) => {
    return new Promise((resolve) => {
        chrome.tabs.move(tabId, moveProperties, () => {
            if (chrome.runtime.lastError) console.error("moveTab error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

export const setIcon = (details) => {
    return new Promise((resolve) => {
        chrome.browserAction.setIcon(details, () => {
            if (chrome.runtime.lastError) console.error("setIcon error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

export const getTabBadgeText = (tabId) => {
    return new Promise((resolve) => {
        chrome.browserAction.getBadgeText({ tabId: tabId }, badgeText => {
            if (chrome.runtime.lastError) console.error("getTabBadgeText error:", chrome.runtime.lastError.message);
            resolve(badgeText);
        });
    });
};

export const getWindowBadgeText = (windowId) => {
    return browser.browserAction.getBadgeText({ windowId: windowId });
};

export const setTabBadgeText = (tabId, text) => {
    return new Promise((resolve) => {
        chrome.browserAction.setBadgeText({ tabId: tabId, text: text }, () => {
            if (chrome.runtime.lastError) console.error("setTabBadgeText error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

export const setWindowBadgeText = (windowId, text) => {
    return browser.browserAction.setBadgeText({ windowId: windowId, text: text });
};

export const setTabBadgeBackgroundColor = (tabId, color) => {
    return new Promise((resolve) => {
        chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: color }, () => {
            if (chrome.runtime.lastError) console.error("setTabBadgeBackgroundColor error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

export const setWindowBadgeBackgroundColor = (windowId, color) => {
    return browser.browserAction.setBadgeBackgroundColor({ windowId: windowId, color: color });
};

export const getStoredOptions = () => {
    return Promise.all([
        new Promise((resolve) => {
            chrome.storage.local.get(null, localOptions => {
                if (chrome.runtime.lastError) console.error("getStoredOptions error on getting local storage:", chrome.runtime.lastError.message);
                resolve(localOptions);
            });
        }),
        // chrome.storage.managed is supported on Firefox 57 and later
        !chrome.storage.managed ? null : new Promise((resolve) => {
            chrome.storage.managed.get(null, managedOptions => {
                if (chrome.runtime.lastError) {
                    if (chrome.runtime.lastError.message === "Managed storage manifest not found") {
                        /* only log warning as that is expected when no manifest file is found */
                        console.warn("could not get managed options:", chrome.runtime.lastError.message);
                    }
                    else {
                        console.error("getStoredOptions error on getting managed storage:", chrome.runtime.lastError.message);
                    }
                }
                resolve(managedOptions);
            });
        })
    ]).then(results => {
        const [localOptions, managedOptions] = results;
        return {
            storedOptions: Object.assign({}, localOptions || {}, managedOptions || {}),
            lockedKeys: Object.keys(managedOptions || {})
        };
    });
};

/* exported clearStoredOptions */
export const clearStoredOptions = () => {
    return new Promise((resolve) => {
        chrome.storage.local.clear(() => {
            if (chrome.runtime.lastError) console.error("clearStoredOptions error:", chrome.runtime.lastError.message);
            resolve();
        });
    });
};

/* exported saveStoredOptions */
export const saveStoredOptions = async (options, overwrite) => {
    if (overwrite) await clearStoredOptions();
    return new Promise((resolve) => {
        chrome.storage.local.set(options, () => {
            if (chrome.runtime.lastError) console.error("saveStoredOptions error:", chrome.runtime.lastError.message);
            resolve(Object.assign({}, options));
        });
    });
};

/* exported getPlatformInfo */
export const getPlatformInfo = () => {
    return new Promise((resolve) => {
        chrome.runtime.getPlatformInfo(info => {
            if (chrome.runtime.lastError) console.error("getPlatformInfo error:", chrome.runtime.lastError.message);
            resolve(info);
        });
    });
};

/* exported getFirefoxMajorVersion */
export const getFirefoxMajorVersion = async () => {
    const browserInfo = await browser.runtime.getBrowserInfo();
    const majorVersion = parseInt(browserInfo.version.split(".")[0]);
    return majorVersion;
};
