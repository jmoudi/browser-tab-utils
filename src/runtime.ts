import { initializeOptions } from './utils/settings';
import {onCreatedTab,onBeforeNavigate,onCommand} from '@/handlers';


export const logger = console;

export const global = {} as any;

export class Runner {


    async init(){
        await initializeOptions();
        browser.tabs.onCreated.addListener(onCreatedTab);
        browser.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate);
        browser.commands.onCommand.addListener(onCommand);

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

 



