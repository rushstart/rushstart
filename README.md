## Get it
```
$ npm i @rushstart/core
```

## Use it

Add a `<script>` element for rushstart.js

```html
<script src="path/to/rushstart/dist/rushstart.min.js"></script>
```

Or include it like webpack module

```javascript
import $ from '@rushstart/core';
```

And write very fast code:

```javascript

/**
* Append a wrapper
*/
$('<div id="wrapper"></div>').forEach(function (element) {
    document.body.append(element);
});

/**
* Attach an event handler to a child element that has not yet been created
*/
$('#wrapper').on("click", function() {
    console.log("clicked on", this);
}, '.clicker');

/**
* Append the child element
*/
$('<a class="clicker"></a>').forEach(function (element) {
    document.wrapper.append(element);
});
```