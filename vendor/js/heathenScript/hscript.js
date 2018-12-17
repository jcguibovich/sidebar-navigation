//hammy toggle icon
$(document).ready(function () {
  var trigger = $('.hammy'),
    //overlay = $('.overlay'),
    isClosed = false;

  trigger.click(function () {
    hammy_cross();
  });

  function hammy_cross() {

    if (isClosed == true) {
      //overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {
      //overlay.show();
      trigger.removeClass('is-closed');
      trigger.addClass('is-open');
      isClosed = true;
    }
  }
});
$('[data-toggle="offcanvas"]').click(function () {
  $('.slide-in-col-left ').toggleClass('toggled');
});

// menu hight and scrolling control
// $(document).ready(function () {
//   var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
//   $('div.sidebar__nav__scroller').css("height", vh - 20);
//   //$('#wrapper').toggleClass('toggled');

//   $(window).on('resize', function () {
//     //console.log(vh);
//     var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
//     $('div.sidebar__nav__scroller').css("height", vh - 20);
//   });

// });

// menu highlight current page
// $('li.nav-item a').click(function() {

// });

$(document).ready(function navHighlighter() {
  var url = window.location.hash;
  var filename = url.substr(url.lastIndexOf('/') + 1);
  //console.log(url, filename);
  $('li.sidebar-nave__menu-item a[href$="' + filename + '"]').parent().addClass("active");
});

$(document).ready(function() {
  var url = window.location.hash;
  var filename = url.substr(url.lastIndexOf('/') + 1);
  console.log(url, filename);
  $('a.sidebar__nav__menu__link[href$="' + filename + '"]').parent().addClass("active");


})

// toggle dropdowns
$('.js-tgl').click(function(cb){
  $(this).toggleClass('active')
  var target_el = $(this).attr('data-target')
  $(target_el).toggleClass('is-open'), cb
})


//$('body').scrollspy({ target: '#wrapper' })
