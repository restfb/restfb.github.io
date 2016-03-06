!function ($) {
      'use strict';
  
      $(function () {
 
          // Scrollspy
          var $window = $(window)
          var $body = $(document.body)
          var navHeight = $('.navbar').outerHeight(true) + 10
  
          $body.scrollspy({
              target: '.restfb-sidebar',
              offset: navHeight
          })
 
          /* smooth scrolling sections */
          $('a[href*=\'#\']:not([href=\'#\'])').click(function () {
              if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                 var target = $(this.hash);
                  target = target.length ? target : $('[name=\'' + this.hash.slice(1) + '\']');
                  if (target.length) {
                       $('html,body').stop().animate({
                       scrollTop: target.offset().top - 100
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
