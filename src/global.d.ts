
interface State {
    initialized: boolean; 
}
interface Settings {
    showNotification?: boolean; 
    autoCloseTab?: boolean;
}
declare interface Global {
    debug: boolean;
    env: object;
    settings: Settings;
    state: State;
    extension: browser.management.ExtensionInfo,
};
//export type global = Window & RedirectAPI;

declare const global: Global;

//export {global, Global,Settings}