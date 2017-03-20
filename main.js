class Images {
  constructor() {
    $.get('main.html', html => {
     $('main').html(html);
          this.gallery = ['ivaka.jpg', 'evalakis.jpg', 'barovci.jpg', 'mutrata.jpg'];
    this.id = 0;
    this.path = 'images/';
    $('.presentation .prev').prop('src', this.path + this.gallery[this.gallery.length - 1]);
    $('.presentation .next').prop('src', this.path + this.gallery[1]);
    $('.presentation .main-image').prop('src', this.path + this.gallery[0]);
    });

  }
  next() {
    if (this.gallery[this.id + 1] !== undefined) {
      this.id++;
    } else {
      this.id = 0;
    }
    this.changeHtml(this.id);
  }
  prev() {
    if (this.gallery[this.id - 1] !== undefined) {
      this.id--;
    } else {
      this.id = this.gallery.length - 1;
    }
    this.changeHtml(this.id);
  }
  changeHtml(id) {
    let prev,
        next;
   
    if (id === 0) {
      prev = this.gallery[this.gallery.length - 1];
    } else {
      prev = this.gallery[id - 1];
    }
    
    if (id === this.gallery.length - 1) {
      next = this.gallery[0];
    } else {
      next = this.gallery[id + 1];
    }
    
    $('.presentation > .main-image').prop('src', this.path + this.gallery[id]);
    $('.presentation > .prev').prop('src', this.path + prev);
    $('.presentation > .next').prop('src', this.path + next);
  }
}

let Gallery = new Images();
let $main = $('main');
let $body = $('body');
let $topMenu = $('.top-menu li');

$topMenu.on('click', context => {
  $target = $(context.target);
  $topMenu.removeClass('active');
  $target.addClass('active');

  $.get($target.data('href') + '.html', html => {
    if($target.data('href') === 'main') {
      new Images();
    } else {
      $main.html(html);
    }
  });
});

$body.on('click', 'aside li', context => {
  let info = $(context.target).data('href');
  $.get(info + '.html', html => {
    $('.events article', 'body').html(html);
  });
});

$body.on('click', '.next', () => {
  Gallery.next();
});

$body.on('click', '.prev', () => {
  Gallery.prev();
});