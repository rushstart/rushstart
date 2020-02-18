import rs from './core'
require('./event');
let _$ = window.$;
window.$ = rs;
rs.noConflict = function() {
    window.$ = _$;
    window.rs = rs;
    return rs;
};
export default rs;