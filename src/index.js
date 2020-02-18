let rs = require("./core");
rs.use('./event');
rs.use('./load-remote-script');
let _$ = window.$;
window.$ = rs;
rs.noConflict = function() {
    window.$ = _$;
    window.rs = rs;
    return rs;
};
module.exports = rs;
// Allow use of default import syntax in TypeScript
module.exports.default = rs;