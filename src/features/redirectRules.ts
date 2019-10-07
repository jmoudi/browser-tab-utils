
export function createFilter(pattern: RegExp) {
    return { urlMatches: escapeRegExp(pattern) }
}
export function createFilters(patterns: RegExp[]) {
    const urlFilters: browser.webNavigation.EventUrlFilters = { 
        url: patterns.map(p => createFilter(p))
    };
    return urlFilters
}
export function createUrlFilter(patterns: string[]){
    const filter = patterns.map(p => { return { urlMatches: p }})
    return {
        url: filter
    }
}



export async registerMatcher() {
    try {
        const urlFilters = this.redirect.patterns;
        
        log('registerMatcher', urlFilters); 
        WebNav.onBeforeNavigate((details) => { 
            log(`details;`, details);
            const res = this.redirect.filter(details.url);
            log(`result;`, res);
            for (const { action } of res){
                action(details);
            }
        }, { filter: [] })
        
        return { success: true }
    } catch (err) { console.log(err) }
}