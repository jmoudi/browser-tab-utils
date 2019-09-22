
/* const uniq = (arr, predicate) => {
    const urls = new Set();
    for (const [k,v] of arr){
        if (predicate(v,k)){
            urls.add(v)
        }
    }
    return urls
}; uniq([3, 3, 4, 6, 7]); */

require.resolve

(() => {
const log = console.log;
const uniq = (arr) => {
    const urls = new Map();
    for (const v of arr){
            console.log(v);
            urls.set(`${v.username}/${v.pkgname}`, v);
            //urls.set({url: v.url}, v)
    }
    return [...urls.values()]; //Object.values(urls);
}; //uniq([3, 3, 4, 6, 7]);
function getGitInfo(url){
    let res = {};
    const gitre = /(\/([^\/]+)\/([^\/]+))(?:\/|$)/;
    const giturl = new URL(url);
    if (gitre.test(giturl.pathname)){
        const [full, urlpart, username, pkgname] = gitre.exec(giturl.pathname);
        res = {
            url: giturl.origin + urlpart,
            host: giturl.hostname,
            username, 
            pkgname
        }
        log(res)
    }
    
    return res;
};

function generateCliCmd(init){
    const {url,host,username,pkgname} = init;
    const destdir=`${username}_${pkgname}`; //mkdir -p ${destdir}; 
    const cmd = `git clone -- '${url}' ${destdir}`;
    return cmd;
}
async function main(){
    try {
    const tabs = await browser.tabs.query({
        //currentWindow:true,
        //lastFocusedWindow: true,
        url: ['*://*.github.com/*']
    }); //, highlighted:true});
    log(tabs);
    const gi = tabs.filter(t => /github/.test(t.url)).map(t => getGitInfo(t.url));
    log(`gi`, gi);
    const cmds = uniq(gi).map(g => generateCliCmd(g)); //.then(onTabs);
    log(`TOTAL:`, cmds.length);
    console.log(cmds.join(`\n`));
} catch(err){console.warn(err)}
}; 
main();
})()

function onTabs(tabs){
    try {
    tabs.forEach(format);
} catch(err){console.warn(err)}
};