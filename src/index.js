import rs from './core'
rs.use('./event');
rs.use('./load-remote-script');
let _$ = window.$;
window.$ = rs;
rs.noConflict = function() {
    window.$ = _$;
    window.rs = rs;
    return rs;
};
export default rs;