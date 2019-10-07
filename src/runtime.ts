import Emittery from 'emittery';
import {Logger} from '@lib/logger';
import { TabEvents } from './TabEvents';

const logger = new Logger();
const wNav = browser.webNavigation;
const tabs = browser.tabs;

const urlListener = new Emittery();

export class Runner extends Emittery {


    init(){
        wNav.onTabReplaced.addListener((details) => this.emit(TabEvents.closeTab, details));
        wNav.onCommitted.addListener((details) => this.emit(TabEvents.closeTab, details))
        wNav.onTabReplaced.addListener((details) => this.emit(TabEvents.closeTab, details))
        tabs.onUpdated.addListener((details) => this.emit(TabEvents.closeTab, details))
        tabs.onCreated.addListener((details) => this.emit(TabEvents.closeTab, details))
        tabs.onReplaced.addListener((details) => this.emit(TabEvents.closeTab, details))
    }
}

const runner = new Runner();

