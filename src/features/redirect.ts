

    
      export async function redirect(){
        wait(100).then(() => { // redirect with delay to avoid infinite loop of recursive redirections.
            if (tab.url != oldUrl)
              return;
            browser.tabs.update(tab.id, {
              url: url.replace(Constants.kSHORTHAND_ABOUT_URI, Constants.kSHORTHAND_URIS[shorthand] || 'about:blank')
            }).catch(ApiTabs.createErrorSuppressor(ApiTabs.handleMissingTabError));
            if (shorthand == 'group')
              tab.$TST.addState(Constants.kTAB_STATE_GROUP_TAB, { permanently: true });
          });
    }

/* 
      
export class Page1 {
    tester: Tester;
    match: anymatch.Matcher[];
    actions: {
        [k: string]: Action
    }

    redirect(url){
        this.match.find(matcher => Tester.test(url.
    }
}

export async function redirect(){

}
 */


function assign(newURL){ 
    if (newURL && newURL !== document.location.href){ 
        document.location.assign(newURL);
}}; 



class Matchers {

    redirect: [

    ]

    error = {
        login:/[/](login)\./,
        noitem:/[/](noitem|error|err|404)[/.]/,
       redirect: /(?:&rf=|redirect=|ref=|jump).*http/,
        security:/(?:[/]sec|antispider)/i,
    }
    
}

interface ISearchResult {
    selector: string;
    document?: HTMLDocument;
}



//import * from '@std/async';
import mm from 'micromatch'


export type Pattern = any;
export RedirectAction = any;
export class RedirectRule<Action> {
    urls: Pattern[];
    constructor(patterns: Pattern[], action: RedirectAction){

    } 

}


export class Registry<Action> {

}

export class RedirectRulesregistry {

    
}  */
 


function redirect(origin, destination = null) {
    let orig;
    let dest;
    if (arguments.length === 1) {
        orig = document.location.href;
        dest = origin();
    } else {
        orig = origin();
        dest = destination();
    }
    if (dest && dest !== orig) {
        console.log("DEST:", dest);
        navigate(dest);
    }
    //elementInfo
    //navigate();
}