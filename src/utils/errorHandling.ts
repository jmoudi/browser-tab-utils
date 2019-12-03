 
export const withCommand = (fn: Function, args: any[]) => fn(args);


export function serialize(inp: object){
    const outp = JSON.stringify(inp);
    return outp;
}
export function deserialize(inp: string){
    const outp = JSON.parse(inp);
    return outp;
}


 
 
const enum RuntimErrors {
    "Could not establish connection. Receiving end does not exist.",  /* Chrome & Firefox - ignore */
    "The message port closed before a response was received.",  /* Chrome - ignore */
    "Message manager disconnected",  /* Firefox - ignore */
}

export function checkError(){
    
    if (!chrome.runtime.lastError){
        return;
    } else {
        console.log(chrome.runtime.lastError.message);
    }
}

/************************************************************************/

/* Display alert notification */

function alertNotify(message)
{
    chrome.notifications.create("alert",{ type: "basic", iconUrl: "icon32.png", title: "SEARCH SITE WE", message: "" + message });
}

/************************************************************************/

/* Display debug notification */

function debugNotify(message)
{
    chrome.notifications.create("debug",{ type: "basic", iconUrl: "icon32.png", title: "SEARCH SITE WE - DEBUG", message: "" + message });
}