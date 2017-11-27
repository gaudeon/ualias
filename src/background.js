let ALIASES = {};

// initial alias list loading
function loadAliases (callback) {
    if ("function" !== typeof callback)
        callback = () => {};

    const setAliases = (result) => {
        ALIASES = result.aliases || {};        
        callback(ALIASES);
    };

    const onError = (error) => {
        const errorText = `Error: ${error}`;
        callback(errorText);
    };

    let getting = browser.storage.local.get("aliases");
    getting.then(setAliases, onError);
}

loadAliases((result) => {
    // This finds the appropriate alias to set the tab url location to
    const checkForAlias = (query) => {
        let params = query.split(/\s+/);
        let alias = params.shift();

        if (ALIASES[alias]) {
            let url = ALIASES[alias];
           
            // replace params 
            for(let param_count = 1; param_count <= params.length; param_count++) {
                let pattern = new RegExp('\\[_' + param_count +'\\]');
                url = url.replace(pattern, params[param_count - 1]);
            }

            // remove remaining params
            url = url.replace(/\[_\d+\]/, '');

            // redirect tab location
            browser.tabs.update(null, { url: url });
        }
    };

    // This generates our alias suggestion list
    const suggestAliases = (text, suggest) => {
        // we only want the first argument when giving suggestsions
        text = text.split(/\s+/).shift(); 

        let suggestions = [];
        Object.keys(ALIASES).forEach((el) => {
            let pattern = new RegExp('^' + text);
            if (el == text || el.match(pattern)) {
                suggestions.push({ description: 'alias: ' + el, content: el });
            }
        });

        // pass back array of suggestions to omnibox
        suggest(suggestions); 
    };

    browser.omnibox.onInputEntered.addListener( checkForAlias );
    browser.omnibox.onInputChanged.addListener( suggestAliases );
});

// update our alias list when our preferences our updated
browser.storage.onChanged.addListener((changes, areaName) => {
    ALIASES = changes.aliases.newValue;
});
