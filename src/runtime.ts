
import {onCreatedTab,onBeforeNavigate} from '@/handlers';

import {mapKeys,mapValues,reduce} from '@std/fp';
import { logger } from '@/utils/utils';
import { initGlobal } from '@/init';

/**
 * Loads TabUtils global object or returns one, if already loaded. This function is
 * idempotent - you can call it as many times as you like. Throws if not successful.
 */

/**
 * Synchronously tries to returns TabUtils global object. Throws if not successful.
 */
export async function getSettings(){
    return global.settings
}

/**
 * explicit import syntax to highlight that module is important
 */
const importModule = async () => {
    const mod = await import('./api/tabs-api');
    logger.info(mod);
    return mod
}

const app: App = {
    actions: {},
    commands: {}
} as App;



export const loadActions = async (cmdStr: string) => {
    const apimod = await importModule();
    const functionsMap = reduce(apimod, (a, f) => {
        const createName = (fn, namespace) => `${namespace}:${fn.name}`
        if (typeof f == 'function'){a.set(createName(f, 'Tabs'), f); return a }
    }, new Map<string, Function>());
    app.actions = functionsMap;
    app.commands = functionsMap;
    logger.debug("functionsMap", functionsMap);
};

export const onCommand = (cmdStr: string) => {
    const handler = app.commands.get(cmdStr);
    logger.debug("onCommand", cmdStr,  handler);
	if (handler){
		handler();
	}
};

export class Runner {


    async init(){
        await initGlobal();
        logger.info('Init', 1);
        await loadActions('');
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

 



