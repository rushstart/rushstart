/**
 * For browsers that do not support `Element.matches()`,
 * IE9+ support
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill}
 */
if (!Element.prototype.matches) {
    // noinspection JSUnresolvedVariable
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}
/**
 * For browsers that do not support `Element.closest()`
 * IE9+ support
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill}
 */
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        let el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
/**
 * For browsers that do not support `Event.composedPath()`
 * @see {@link https://gist.github.com/rockinghelvetica/00b9f7b5c97a16d3de75ba99192ff05c}
 */
if (!Event.prototype.composedPath) {
    Event.prototype.composedPath = function () {
        if (this.path) {
            return this.path;
        }
        let target = this.target;

        this.path = [];
        while (target.parentNode !== null) {
            this.path.push(target);
            target = target.parentNode;
        }
        this.path.push(document, window);
        return this.path;
    }
}

const htmlStringRegex = /^<[\w\W]+>$/;

/**
 * Collection of elements
 */
class ElementList extends Array {

    /**
     * Return a collection of matched elements either found in the DOM based on passed argument(s).
     * @constructor
     * @param selector
     * @param context
     * @returns {ElementList}
     */
    constructor(selector = null, context = document) {
        super();

        this._context = context;
        this._selector = selector;

        Object.defineProperties(this, {
            "_selector": {enumerable: false},
            "_context": {enumerable: false},
        });

        if (typeof this._selector === "string") {
            this._selector = this._selector.trim();
            if (htmlStringRegex.test(this._selector)) {
                let div = document.createElement('div');
                div.innerHTML = this._selector;
                this.push(...div.childNodes);
            } else {
                this._context.querySelectorAll(this._selector).forEach(element => {
                    this.push(element);
                });
            }
        } else if (this._selector instanceof NodeList || this._selector instanceof ElementList) {
            this.push(...this._selector);
        } else if (this._selector instanceof HTMLElement) {
            this.push(this._selector);
        }

        return this;
    }

    /**
     * Finds all parent elements matching the selector
     * @param selector
     * @returns {ElementList}
     */
    parents(selector = "*") {
        let elementList = new ElementList;
        this.forEach(element => {
            let p = element.parentElement;
            while (p !== document) {
                let o = p;
                if (o.matches(selector)) {
                    elementList.push(o);
                }
                p = o.parentElement;
            }
        });
        return elementList;
    }

    /**
     * Finds the first parent elements that match the selector
     * or the nearest parent elements if the selector is not set
     * @param selector
     * @returns {ElementList}
     */
    parent(selector) {
        let elementList = new ElementList;
        this.forEach(element => {
            selector ? elementList.push(element.closest(selector)) : elementList.push(element.parentElement);
        });
        return elementList;
    }

    /**
     * Finds the child elements matching the selector
     * @param selector
     * @returns {ElementList}
     */
    find(selector) {
        let elementList = new ElementList;
        this.forEach(element => elementList.push(...element.querySelectorAll(selector)));
        return elementList;
    }

    /**
     * Pushes only unique element
     * @returns {number}
     */
    push() {
        for (let i = 0; i < arguments.length; i++) {
            let element = arguments[i];
            if (this.isUnique(element)) {
                super.push(element);
            }
        }
        return this.length;
    }

    /**
     * Checks the element in this instance on unique
     * @param element
     * @returns {boolean}
     */
    isUnique(element) {
        return this.every(contender => element !== contender);
    }

    /**
     * Not supported
     */
    fill(){
        return this;
    }
}

const source = {
    fn: ElementList.prototype,
    /**
     * @constructor
     */
    constructor: ElementList,

    use(plugin) {
        Object.assign(ElementList.prototype, require(`${plugin}`).default);
    },
};

export default Object.assign(
    (selector, context) => new ElementList(selector, context),
    source
);