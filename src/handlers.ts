import { isBlankUrl } from './utils/url-utils';
import { logger } from './utils/utils';
import { findDuplicateTabs } from './utils/helpers';





declare const global: Global;
export const handleTab = async (details) => {
	logger.debug("handleTab", details);
    //const wm = new WeakMap<object, browser.tabs.Tab[]>();
	const res = await findDuplicateTabs();
	logger.info(`dssdfuuu`, res);
}

export const onCreatedTab: onCreatedHandler = (tab) => {
	logger.debug("haonCreatedTabndleTab", tab);
	handleTab(tab);
	if (tab.status === "complete" && !isBlankUrl(tab.url)) {
		if (global.settings.autoCloseTab) {
			//handleTab(tab);
		}
	}
};
export const onBeforeNavigate: onBeforeNavigateHandler = async (details) => {
	logger.debug("onBeforeNavigate", details);
	handleTab(details);
	if (global.settings.autoCloseTab && (details.frameId == 0) && (details.tabId !== -1) && !isBlankUrl(details.url)) {
	}
};

declare const app: any
export const onCommand = (cmdStr: string) => {
	logger.debug("onCommand", cmdStr,  app.commands);
	if (app.commands[cmdStr]){
		app.commands[cmdStr](browser.windows.WINDOW_ID_CURRENT);
	}
};

export const closeDuplicateTabs = async (opts) => {
	const res = await findDuplicateTabs();
	logger.info(`findDuplicateTabs`, res);
}
 
const onUpdatedTab: onUpdatedHandler = (tabId, changeInfo, tab) => {
	if ((changeInfo.url || changeInfo.status) && !isBlankUrl(tab.url)) {
		if (tab.status === "complete") {
			if (options.autoCloseTab) {
				searchAndCloseNewDuplicateTabs({ tab: tab, eventType: "onUpdatedTab" });
			}
			else {
				refreshDuplicateTabsInfo(tab.windowId);
			}
		}
		else {
			if (tab.active) {
				setBadge({ tabId: tab.id, windowId: tab.windowId });
			}
		}
	}
};

const onAttached = async (tabId) => {
	const tab = await getTab(tabId);
	if (tab) {
		if (options.autoCloseTab) {
			searchAndCloseNewDuplicateTabs({ tab: tab, eventType: "onAttached" });
		}
		else {
			refreshDuplicateTabsInfo(tab.windowId);
		}
	}
};

const onRemovedTab = async (removedTabId, removeInfo) => {
	if (!removeInfo.isWindowClosing && hasDuplicatedTabs(removeInfo.windowId)) {
		addToIgnoreTabs(removedTabId);
		await refreshDuplicateTabsInfo(removeInfo.windowId);
		removeFromIgnoreTabs(removedTabId);
	}
};

const onDetachedTab = (detachedTabId, detachInfo) => {
	if (hasDuplicatedTabs(detachInfo.oldWindowId)) refreshDuplicateTabsInfo(detachInfo.oldWindowId);
};

const onActivatedTab = (activeInfo) => {
	if (isIgnoreTab(activeInfo.tabId)) return;
	setBadge({ tabId: activeInfo.tabId, windowId: activeInfo.windowId });
};
 */


