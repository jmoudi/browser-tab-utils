
import {log} from "@lib/logger";
import {escapeRegExpCharacters} from "@lib/string";

const webNavigation = browser.webNavigation;
const tabs = browser.tabs;

 

export function onBeforeNavigate(cb: (details: WebNav.OnBeforeNavigateDetails) => void, options?: WebNavOptions) {
    const filter = options ? { url: options.filter } : undefined;
    webNavigation.onBeforeNavigate.addListener((details) => cb(details));
} 
 
 

/*
export function onBeforeNavigate(
    callback: (details: chrome.webNavigation.WebNavigationParentedCallbackDetails) => void, 
    filter = null 
   ){
    return chrome.webNavigation.onBeforeNavigate.addListener((details) => {
        log(` <${details.url}> onBeforeNavigate tabId:`, details.tabId);
        callback(details);
    },
    filter
    );
}



export function onCommitted(callback: (details: ComittedDetails) => void, filter?: WebNavFilter){
    return chrome.webNavigation.onCommitted.addListener((details) => {
        callback(details);
    },
    filter
    );
}

 


export function onBeforeRequest(cb: (details: WebReq.OnBeforeRequestDetails) => void, filter?: WebReq.RequestFilter){
    return chrome.webRequest.onBeforeRequest.addListener((details) => {
        log(` <${details.url}> BeforeRequest received:`, details);
        cb(details);
    },
    filter,
    ["blocking"]);
}
export function onHeaders(cb: (details: WebReq.HeadersDetails) => void, filter?: WebReq.RequestFilter){
    return chrome.webRequest.onHeadersReceived.addListener((details) => {
        log(` <${details.url}> Headers received:`, details.responseHeaders);
        cb(details);
    },
    filter,
    ["blocking"]);
}