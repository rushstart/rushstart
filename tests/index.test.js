import $ from './../src/index';

$.createElements('<div class="wrapper"><div id="container" class="container"></div></div>')
    .forEach(function (element) {
        document.body.append(element);
    });

test('first test', () => {
    expect($('.container').length).toBe(1);
});