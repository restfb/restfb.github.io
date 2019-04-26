$(() => {
  const stuckClass = 'is-stuck';
  const $stickyTopElements = $('.sticky-top');

  const determineSticky = () => {
    $stickyTopElements.each((i, el) => {
      const $el = $(el);
      const stickPoint = parseInt($el.css('top'), 10);
      const currTop = el.getBoundingClientRect().top;
      const isStuck = currTop <= stickPoint;
      $el.toggleClass(stuckClass, isStuck);
    });
  };

  //run immediately
  determineSticky();

  //Run when the browser is resized or scrolled
  //Uncomment below to run less frequently with a debounce
  //let debounce = null;
  $(window).on('resize scroll', () => {
    //clearTimeout(debounce);
    //debounce = setTimeout(determineSticky, 100);

    determineSticky();
  });

});