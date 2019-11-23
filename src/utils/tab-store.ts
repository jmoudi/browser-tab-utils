import {observable, action, reaction, observe, ObservableMap, computed} from 'mobx';
import { logger } from './utils';

//const port = window['SIDEBAR'].port as chrome.runtime.Port;

export class TabStore extends ObservableMap {

    @observable
    tabs = new Map<number, Tab>(); //tabs: Tabs.Tab[] = [];

	@computed
	get All(){
		return [...this.tabs.values()]//Array.from(this.tabs.values())
	}

    @action
    add(id: number, tab: Tab){
		this.tabs.set(id, tab);
        logger.debug(`tab added`, tab);
	}
	@action
    remove(id: number){
		this.tabs.delete(id);
		const getAll = this.All
        logger.debug(`tab removed`, id, getAll, this.tabs);
	}
	dispatch(){}
	

/*     subscribe() {
		reaction(
			() => this.tabs,
			(tabs) => tabs && fetch('/api/todos', {
				method: 'post',
				body: JSON.stringify({ todos }),
				headers: new Headers({ 'Content-Type': 'application/json' })
			})
		); */
}


export const createTabStore = () => {
    const tabsMap = new ObservableMap();
    tabsMap
}
const tabStore = createTabStore();
const onUp: onUpdatedHandler = (tabId, details, tab) => {
    tabStore();
}
browser.tabs.onUpdated.addListener(cb)