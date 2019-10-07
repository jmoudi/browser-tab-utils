
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
        ;
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
        url: ['*://github.com/*/*']
    }); //, highlighted:true});
    log(tabs); 
    const tabReducer = (acc,tab) => {
        const info = getGitInfo(tab.url);
        if(info){
            acc.add(info.);
        }
        return acc;
    }
    const gi = tabs.reduce((acc,t) => handleGithubTab(t.url));
    const gi = tabs.map(t => getGitInfo(t.url));
    log(`gi`, gi);
    const cmds = uniq(gi).map(g => generateCliCmd(g)); //.then(onTabs);
    log(`TOTAL:`, cmds.length);
    tabs.forEach(t => browser.tabs.remove);
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

browser.tabs.query({
    //currentWindow:true,
    //lastFocusedWindow: true,
    url: ['*://github.com/*/*']
}).then(t => browser.tabs.remove(t.map(tab => tab.id)))


/api/products   // lists all
/api/products/:productid //lists all properties
/api/suppliers   //lists all
/api/suppliers/:supplierid //lists all properties
/api/suppliers/:supplierid?productid=:productid // list only product :productid
/api/suppliers/:supplierid?productid=:productid // list only product :productid
/api/suppliers/:supplierid?filter=products&pid=:id