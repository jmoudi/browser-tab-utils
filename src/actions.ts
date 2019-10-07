export const commands = {
    'onDOMContentLoaded': (text) => {
        const script = document.createElement('script');
        script.className = 'my-scripts';
        script.text = text;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        log('Appended');
    }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    log('message:',message);
    const action = commands[message['type']];
    if (action){
        log('action', action);
        action('(()=> { console.log("test")})();');
        action(message['payload']);
    } else {
        throw new Error('ERR: ' + message);
    }
});