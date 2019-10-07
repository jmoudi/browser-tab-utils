
export class WebNavHandler {

 
    registered = new Map<string, WebNav.WebNavRoute>();

    constructor(init?){};

/*     on(type: string, callback, filter?){
        const event = chrome.webNavigation[type] as chrome.webNavigation.WebNavigationEvent<WebNavDetails>;
        if (event){
            if (this.registered.size > 0){

            }
            event.addListener((details) => callback(details), filter);
        } else { throw new TypeError(type); }
    } */

    loadRoutes(routes: Route.Matcher[]){
        for (const route of routes){
            const registered = this.registered.get(route.path);
            if (!registered){
                this.registered.set(route.path, route);
            }

        }

    }

    addRoute(route: Route.Matcher){
        const registered = this.registered.get(route.path);
        if (!registered){
            this.registered.set(route.path, route);
        }
    }


    createFilter(route: Route.Matcher) {
        const filter = {
            url: route.matches.map(re => {
                const filter: chrome.events.UrlFilter = { 
                    urlMatches: escapeRegExp(re) 
                }
                return filter;
            })
        };
        return filter;
    }

    filter(url: string){
        //url = asArray<string>(url);
        console.time('1')
        for (const f of this.registered.values()){
            const p = test(url, f.matches);
        }
        console.timeEnd('1');
        //log(`res`, url, res);
        return res;
    }
}


type Match = RegExp;
class Redir {
    action: Action;
    match: Match; 
}
export class Redirect {
    _redir = new Map<Action, Match>();
    redir: Redir[] = [
        { 
            match: /(github.com)/, action: ({ tabId, url }) => inject(tabId, { file: url })
        },
        { 
            match: /(google.com)/, action: ({ url }) => redirect(url)
        }
    ]
    patterns = []

    constructor({ patterns }){
        this.patterns = patterns;
        //this._redir =
    }


}

//type UrlFilter = chrome.events.UrlFilter;

export class UrlFilter implements chrome.webNavigation.WebNavigationEventFilter {
    url: chrome.events.UrlFilter[] = [];

    constructor(...patterns: WebEvent.FilterPattern[]){
        for (const pattern of patterns){
            const outp = this.transform(pattern);
            if (!isNull(outp)){
                this.url.push(outp);
            }
        }
    }

    transform(pattern) {
        const filter: IUrlFilter = {};
        switch(true){
            case isRegExp(pattern): 
                filter.urlContains = escapeRegex(pattern);
                return filter;
            case isString(pattern):
                filter.urlContains = pattern;
                return filter;
            default:
                return null;
        }
    }
}
export class UrlFilterFactory {

    static createUrlFilter(pattern){
        return new UrlFilter(pattern)
    }
    static createRequestFilter(pattern: FilterPattern[]){
        return pattern.map(p => {
            return UrlFilterFactory.createUrlFilter(p)
        });
    }
    
}


export class WebRoute {

    pattern: string;
    urls: string[] = [];
    _url: URL;
    rawURL: string;

    constructor(init){
        this.rawURL = init.host;
    }
    normalize(){
        return this.rawURL;
    }
    match(){
        //const re = new RegExp(this.pattern);
    }



    
}

export class RouteMap extends Map<string, WebRoute> {

    
    constructor(routes: object){
        super();
        for (const [k,v] of Object.entries(routes)){
            const exists = this.get(k);
            if (exists){
                exists.urls.push(v.pattern);
            } else {

            }
        }
        
    };
}


