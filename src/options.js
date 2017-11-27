// save options into local storage
function saveOptions(e) {
    e.preventDefault();
    var aliasText = document.querySelector("#aliases").value;
    var aliasLines = aliasText.split(/\n/);
    var aliases = {};
    aliasLines.forEach(function(el) {
        var parts = el.split(/\s+/);
        if (parts[0] && parts[1]) {
            aliases[parts[0]] = parts[1];
        }
    }); 
    browser.storage.local.set({ aliases: aliases });
}

// load options from local storage
function restoreOptions() {
    var setAliases = function(result) {
        var aliases = result.aliases || {};
        var aliasText = "";

        Object.keys(aliases).forEach((el) => {
            if (el) {
                aliasText += el + "    " + aliases[el] + "\n";
            }
        });

        document.querySelector("#aliases").value = aliasText;
    };

    var onError = function(error) {
        console.log(`Error: ${error}`);
    };

    var getting = browser.storage.local.get("aliases");
    getting.then(setAliases, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
