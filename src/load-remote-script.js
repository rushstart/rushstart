let rs = require("./core");

const _scriptCache = new Map();
/**
 * Load an external script.
 *
 * @param {string} url Absolute URL of script to load
 * @return {Promise}
 */
rs.loadRemoteScript = function(url) {
    let promise;

    if(_scriptCache.has(url)) {
        promise = _scriptCache.get(url);
    } else {
        promise = new Promise((resolve,reject) => {
            let s = document.createElement('script');
            s.onerror = () => reject(new Error(`Failed to load '${url}'`));
            s.onload = resolve;
            s.async = true;
            s.src = url;
            let ss = document.getElementsByTagName('script')[0];
            ss.parentNode.insertBefore(s, ss);
        });
        _scriptCache.set(url, promise);
    }

    return promise;
};