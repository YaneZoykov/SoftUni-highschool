class Images {
  constructor() {
    let gallery = ['mutrata.jpg', 'ivaka.jpg', 'barovci.jpg', 'evalakis.jpg'];
    sessionStorage.setItem('gallery', JSON.stringify(gallery));
    this.path = 'images/gallery/';
    this.id = sessionStorage.getItem('id') !== null ? sessionStorage.getItem('id') : 0;
    this.loadHtml();
  }
  set id(id) {
    if (id !== null) {
      sessionStorage.setItem('id', id);
    }
  }
  get id() {
    return parseInt(sessionStorage.getItem('id'));
  }
  set gallery(item) {
    let gallery = JSON.parse(sessionStorage.getItem('gallery'));
    if (item instanceof Array) {
      for (let piece of item) {
        gallery.push(piece)
      }
    } else {
        gallery.push(item)
    }
    
    sessionStorage.setItem('gallery', JSON.stringify(gallery));
  }
  get gallery() {
    return JSON.parse(sessionStorage.getItem('gallery'));
  }
  next() {
    if (this.id !== this.gallery.length - 1) {
      this.id++;
    } else {
      this.id = 0;
    }
    
    this.changeHtml();
  }
  prev() {
    if (this.id !== 0) {
      this.id--;
    } else {
      this.id = this.gallery.length - 1;
    }
    
    this.changeHtml();
  }
  changeHtml() {
    let prev,
        next;
   
    if (this.id === 0) {
      prev = this.gallery[this.gallery.length - 1];
    } else {
      prev = this.gallery[this.id - 1];
    }
    
    if (this.id === this.gallery.length - 1) {
      next = this.gallery[0];
    } else {
      next = this.gallery[this.id + 1];
    }
    
    $('.presentation > .main-image').prop('src', this.path + this.gallery[this.id]);
    $('.presentation > .prev').prop('src', this.path + prev);
    $('.presentation > .next').prop('src', this.path + next);
  }
  loadHtml() {
    let prev = this.id === 0 ? this.gallery.length - 1 : this.id - 1;
    let next = this.id === this.gallery.length - 1 ? 0 : this.id +1;
    
    $.get('main.html', html => {
      $('main').html(html);
      $('.presentation .prev').prop('src', this.path + this.gallery[prev]);
      $('.presentation .next').prop('src', this.path + this.gallery[next]);
      $('.presentation .main-image').prop('src', this.path + this.gallery[this.id]);
    });
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
  
  if ($target.data('href') === 'main') {
    Gallery.loadHtml();
  } else {
    $.get($target.data('href') + '.html', html => {
      $main.html(html);
    });
  }
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