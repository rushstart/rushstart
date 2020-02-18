import $ from './../src/index';

$('<div class="wrapper"><div id="container" class="container"></div></div>').forEach(element => document.body.append(element));

test('first test', () => {
    expect($('.container').length).toBe(1)
});