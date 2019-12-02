import { Runner } from './runtime';

declare global {
    interface Window {
      TabUtils?: TabUtils;
    }
}
export interface TabUtils {

}

const extension = {
    name: "TabUtils"
}



const global: Global = {} as never;
/**
 * Loads TabUtils global object or returns one, if already loaded. This function is
 * idempotent - you can call it as many times as you like. Throws if not successful.
 */
export const initExtension = (opts?: TabUtilsOpts): TabUtils => {
    if (typeof window !== 'object'){
        throw new TypeError('Not in browser-like environment.');
    }
    if (!window[extension.name]){
        window[extension.name] = {...opts};
    } else {
        return window[extension.name]
    }
    return window[extension.name];
};
/**
 * Synchronously tries to returns TabUtils global object. Throws if not successful.
 */
export const getExtension = (): TabUtils => {
    if (typeof window !== 'object'){
        throw new TypeError('Not in browser-like environment.');
    }
    if (!window[extension.name]){
        throw new Error('TabUtils not loaded.');
    }
    return window[extension.name];
};
/* const messages = {
    start: `STARTED`,
    error: (err) => `ERROR` + err
}
const app = {
    name: 'redirector'
} */
//export const global: Global = {} as any;



async function main(){
    console.log(global);
    initExtension();
    const runner = new Runner();
    await runner.init();
    console.log(`app started successfully`, Boolean(runner));

};
main().catch(err => console.error(err));
