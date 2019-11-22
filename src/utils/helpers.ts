/// <reference types="lodash" />
/// <reference types="@types/lodash" />

import { groupBy } from '@std/fp';
import {Dictionary} from 'lodash';
const normalizeTabUrl = (url) => url


export const getTabs = () => browser.tabs.query({ 
    windowType: 'normal',
    status: 'complete'
})

 
export const findDuplicateTabs = async () => {
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
 