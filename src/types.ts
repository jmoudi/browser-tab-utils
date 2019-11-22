
export interface RedirectAPI {
    test1: any;
} 

export declare namespace Route {
    export type Matcher = {
        matches: RegExp[];
        action: Action;
    }
}


export type Listener = (...v) => void;
export type Action = (...args: any[]) => any;
export type Message = { type: string, payload: any };

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


export class Context {
    errorStack = [];
    errorCode?: string;
    id: string;
    tab: { id: string }
}