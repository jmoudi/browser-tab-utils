import { findDuplicateTabs } from '@/utils/helpers';
import { logger } from '@/utils/utils';
import { groupBy } from '@std/fp';
import {Dictionary} from 'lodash';

/* 
let selectTab = (direction) => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        if (tabs.length <= 1) {
            return
        }
        chrome.tabs.query({ currentWindow: true, active: true }, (currentTabInArray) => {
            let currentTab = currentTabInArray[0]
            let toSelect
            switch (direction) {
                case 'next':
                    toSelect = tabs[(currentTab.index + 1 + tabs.length) % tabs.length]
                    break
                case 'previous':
                    toSelect = tabs[(currentTab.index - 1 + tabs.length) % tabs.length]
                    break
                case 'first':
                    toSelect = tabs[0]
                    break
                case 'last':
                    toSelect = tabs[tabs.length - 1]
                    break
                default:
                    let index = parseInt(direction) || 0
                    if (index >= 1 && index <= tabs.length) {
                        toSelect = tabs[index - 1]
                    } else {
                        return
                    }
            }
            chrome.tabs.update(toSelect.id, { active: true })
        })
    })
}

 */

/* export function getDuplicates(tabs: Tabs.Tab[]) {

}

export function jumpToActiveMedia(tabs: Tabs.Tab[]) {

}

export function focus(tab: Tabs.Tab) {

}
 */
/* export async function focusPrev2(ctx: App) {
    const currentTab = await tabs.query({ active: true });
    log(`cur`, currentTab);
}
export async function focusNext2(ctx: App) {
    const currentTab = await tabs.query({ active: true });
    log(`cur`, currentTab);

} */

/* export const getCurrentTab = (): Tabs.Tab => { 
    const t = browser.tabs.query({ 
        currentWindow: true,
        active: true 
    });
    return t[0];
} */
export const getCurrentTab = () => 
    browser.tabs.query({ 
        currentWindow: true,
        active: true 
    }).then((t) => t[0])

export const findNext = (d: number) =>
    browser.tabs.query({ currentWindow: true, index: d }).then((t) => t[0])



export const focusPrev = async () => {
    console.time('1');
    const currentTab = await getCurrentTab();
    const ii = currentTab.index - 1;
    const t = await findNext(ii)
    browser.tabs.update(t.id, { active: true })
    console.timeEnd('1');
    console.log(`cur`, ii, currentTab, t);
}

export const focusNext = async () => {
    console.time('1');
    const currentTab = await getCurrentTab();
    const ii = currentTab.index + 1;
    const t = await findNext(ii)
    browser.tabs.update(t.id, { active: true })
    console.timeEnd('1');
    console.log(`cur`, ii, currentTab, t);
}
export async function focusNext1() {
    console.time('1')
    const currentTab = await browser.tabs.query({ active: true });
    browser.tabs.update(currentTab[0].id as number + 1, {
        active: true
    });
    console.timeEnd('1');
    console.log(`cur`, currentTab);
}

export function forceStopLoading(tab: browser.tabs.Tab) {
    const id = tab.id ? tab.id : 1;
    if (tab.status !== "complete") {
        browser.tabs.update(id, { active: true });
    }
}


export const closeDuplicateTabs = async (opts) => {
	const res = await findDuplicateTabs();
	logger.info(`findDuplicateTabs`, res);
}

export function moveTo(tab: browser.tabs.Tab) {
    const id = tab.id ? tab.id : 1;
    if (tab.status !== "complete") {

        browser.windows.update(windowId, {
            focused: tab.active         // prevent switching to moved tabs
        });
        chrome.tabs.update(id, { 
            active: true,
            
        });
    }
}


    
export function getSelected(){
    return browser.tabs.query({ highlighted: true });
}
export function getAll(){
    return browser.windows.getAll({ 
        windowTypes: ['normal'],
        populate: true 
    });
}
export function getAllinWindow(){
    return browser.tabs.query({ 
        windowTypes: ['normal'],
        currentWindow: true 
    });
}

export async function updateActiveTab(script){
    const activeTab = await browser.tabs.query({ currentWindow: true, active: true }).then(t => t[0]);
    if (!activeTab.id){ throw new Error(`tab`); }
    const code = script.code
    if (!code){ throw new Error(`code`); }
    //inject
    /* tabs.executeScript(activeTab.id, {
        code: code,
        runAt: `document_start`
    }) */
}


 

const normalizeTabUrl = (url) => url


export const getTabs = () => browser.tabs.query({ 
    windowType: 'normal',
    status: 'complete'
});

const getCurId = () => (browser.windows.WINDOW_ID_CURRENT)
 
export const findDuplicateTabs1 = async () => {
    //const wm = new WeakMap<object, browser.tabs.Tab[]>();
    const tt = await getTabs();
    const grouped: Dictionary<browser.tabs.Tab[]> = groupBy(tt, (tab) => {
        return normalizeTabUrl(tab.url);
    });
    return grouped;
}
 
 /* 
            if (chrome.runtime.lastError) console.error("getTabs error:", chrome.runtime.lastError.message);
            resolve(chrome.runtime.lastError ? null : tabs); */
 