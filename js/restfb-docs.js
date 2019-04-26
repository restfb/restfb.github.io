!function ($) {
      'use strict';
	  
	  $(function () {
 
          // Scrollspy
          var $window = $(window)
          var $body = $(document.body)
          var navHeight = $('.navbar.fixed-top').outerHeight(true) + 5;
  
          /* smooth scrolling sections */
          $('a[href*=\'#\']:not([href=\'#\'])').not('.tab').click(function () {
              if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                 var target = $(this.hash);
                  target = target.length ? target : $('[name=\'' + this.hash.slice(1) + '\']');
                  if (target.length) {
                       $('html,body').stop().animate({
                       scrollTop: target.offset().top - navHeight
                       }, 1500, 'easeInOutExpo');
                      return false;
                  }
              }
          });
  
          $window.on('load', function () {
              $body.scrollspy('refresh')
          })
  
          // Kill links
          $('.container [href=\'#\']').click(function (e) {
              e.preventDefault()
          })
	  })
  }
  (jQuery)