import { initializeOptions } from './utils/settings';
import {onCreatedTab,onBeforeNavigate,onCommand, closeDuplicateTabs} from '@/handlers';


export const logger = console;

//export const global = {} as any;

//declare const global: Global = {} as never;
const global: Global = {} as never;
const app = {
    commands:{
	"close-duplicate-tabs": closeDuplicateTabs
    }

}

async function initGlobal(name = 'TabUtils'){
    const defaultSettings = {
        debug: false,
        showNotification: true,
        env: process.env
    }
    const defaultState = {
        initialized: false
    }

    //global.actions = {} //new ActionsRegistry();
    
    window[name] = {
        env: {},
        state: {},
        settings: {},
        extension: {}
    }
    // @ts-ignore
    const global: Global = window[name];
    global.extension = await browser.management.getSelf();
    global.state = defaultState;
    global.settings = defaultSettings;
    global.env = process.env;
    global.debug = false;
    return global;
}
export async function init(global: Global) {
    try {
        await initGlobal();
        //await initObservers();
        //browser.runtime.onMessageExternal.addListener(handleTSTMessage);
    }
    catch (err) {
        console.warn(err);
    }
}

export class Runner {


    async init(){
		logger.info('Init', 1);
		await initializeOptions();
		logger.info('Gl', global);
        browser.tabs.onCreated.addListener(onCreatedTab);
        browser.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate);
        browser.commands.onCommand.addListener(onCommand);
        logger.info('Gddfdfdsfl', global, app);

    }
}


const start = async () => {

	
	
/* 	if (!environment.isAndroid) {
		setBadgeIcon();
		await refreshGlobalDuplicateTabsInfo();
	} */


/* 	chrome.tabs.onAttached.addListener(onAttached);
	chrome.tabs.onDetached.addListener(onDetachedTab);
	chrome.tabs.onUpdated.addListener(onUpdatedTab);
	chrome.tabs.onRemoved.addListener(onRemovedTab); */
	//if (!environment.isFirefox62Compatible) chrome.tabs.onActivated.addListener(onActivatedTab);
};

 



