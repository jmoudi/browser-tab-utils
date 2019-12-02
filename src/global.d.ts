type onBeforeNavigateHandler = Parameters<typeof browser.webNavigation.onBeforeNavigate.addListener>[0];
type onCreatedHandler = Parameters<typeof browser.tabs.onCreated.addListener>[0];
type onUpdatedHandler = Parameters<typeof browser.tabs.onUpdated.addListener>[0];

interface TabUtilsOpts {

}

namespace Tabs {
    type Tab = browser.tabs.Tab;
}


interface State {
    initialized: boolean; 
}
interface Settings {
    showNotification?: boolean; 
    autoCloseTab?: boolean;
}
interface Global {
    debug: boolean;
    env: object;
    settings: Settings;
    state: State;
    extension: browser.management.ExtensionInfo,
};

interface App {
    actions: Map<string,any>
    commands: Map<string,any>
}

//export type global = Window & RedirectAPI;

declare const global: Global;

//export {global, Global,Settings}


type EventUrlFilter = browser.webNavigation.EventUrlFilters;
type UrlFilter = browser.events.UrlFilter //browser.webNavigation.EventUrlFilters;


declare namespace WebReq {

    type Event = keyof typeof chrome.webNavigation;
    type NavDetails = chrome.webNavigation.WebNavigationParentedCallbackDetails;
    type RequestFilter = chrome.webRequest.RequestFilter
    type EventFilter = chrome.webNavigation.WebNavigationEventFilter;
    type OnBeforeRequestDetails = chrome.webRequest.WebRequestBodyDetails;
    type HeadersDetails = chrome.webRequest.WebResponseHeadersDetails;
}

