
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

export class Context {
    errorStack = [];
    errorCode?: string;
    id: string;
    tab: { id: string }
}