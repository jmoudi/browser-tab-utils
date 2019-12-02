import { findDuplicateTabs } from '@/utils/helpers';
import { logger } from '@/utils/utils';


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