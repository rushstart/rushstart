import rs from './core'

/**
 * Attach an event handler function for one or more events to the elements.
 * If the handler returns `false`, the `event.preventDefault()` will be called
 * @param {String} event
 * @param handler
 * @param {String} filter
 * @param {Boolean} once
 * @returns {ElementList}
 */
rs.fn.on = function (event, handler, filter, once = false) {
    this.forEach(element => {
        let listener = e => {
            if (filter) {
                e.composedPath().forEach(contender => {
                    element.querySelectorAll(filter).forEach(child => {
                        child === contender && handler.call(child, e) === false && e.preventDefault();
                    });
                });
            } else {
                handler.call(element, e) === false && e.preventDefault();
            }
        };
        Object.defineProperty(listener, "name", {value: handler.name});
        element.addEventListener(event, listener, {once: once});
        element.eventListeners[event] ?
            element.eventListeners[event].push(listener) :
            element.eventListeners[event] = [listener];
    });
    return this;
};

/**
 * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
 * If the handler returns `false`, the `event.preventDefault()` will be called
 * @param event
 * @param handler
 * @param filter
 * @returns {ElementList}
 */
rs.fn.one = function (event, handler, filter) {
    return this.on(event, handler, filter, true);
};

/**
 * Execute all handlers attached to the elements for the given event type.
 * @param event
 * @returns {ElementList}
 */
rs.fn.trigger = function (event) {
    this.forEach(element => {
        element.dispatchEvent(event instanceof Event ? event : new Event(event, {bubbles: true}));
    });
    return this;
};

/**
 * Remove an event handler.
 * @param event
 * @param handler
 * @returns {ElementList}
 */
rs.fn.off = function (event, handler) {
    this.forEach(element => {
        if (element.eventListeners[event]) {
            element.eventListeners[event].forEach(listener => {
                if (!handler || !handler.name || handler.name === listener.name) {
                    element.removeEventListener(event, listener);
                }
            })
        }
    });
    return this;
};