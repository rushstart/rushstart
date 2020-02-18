import $ from './../src/index';

$('<div class="wrapper"><div id="container" class="container"></div></div>').forEach(element => document.body.append(element));

test('search', () => {
    expect($('.container').length).toBe(1);
});

test('event', () => {
    $('.container').on('click', function(){
        expect(this.id).toBe('container')
    }).trigger('click');
});