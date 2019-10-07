

function listener(details) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    filter.ondata = event => {
        let str = decoder.decode(event.data, {
            stream: true
        });
        // Just change any instance of Example in the HTTP response
        // to WebExtension Example.
        str = str.replace(/Example/g, 'WebExtension Example');
        filter.write(encoder.encode(str));
        filter.disconnect();
    }

    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener, {
        urls: ["https://example.com/*"],
        types: ["main_frame"]
    }, ["blocking"]
);
chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }
        return {
            requestHeaders: details.requestHeaders
        };
    }, {
        urls: ["<all_urls>"]
    }, ["blocking", "requestHeaders"]);

    function redirListener({url, tabId}){
        for (let { pattern, action } of redirects){
            if (getPattern(pattern).test(url)){
                console.log(`getPattern(pattern).test(url):`, getPattern(pattern).test(url))
                const redir = action(url);
                console.log(`redir?:`, redir)
                if (redir && redir !== document.URL){
                    console.log(`Redirecting to new URL:`, redir)
                    chrome.tabs.update(tabId, {url: redir}, () => console.log(`Success`))
                }       
            }
        }
        console.log(`Done`, url);
    }
    


     

     