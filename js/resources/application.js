// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * JavaScript for Bootstrap's docs (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */

/* global ZeroClipboard */

!function ($) {
    'use strict';

    $(function () {

	// Scrollspy
	var $window = $(window)
	var $body = $(document.body)
	var navHeight = $('.navbar').outerHeight(true) + 10

	$body.scrollspy({
	    target: '.bs-docs-sidebar',
	    offset: navHeight
	})

	/* smooth scrolling sections */
	$('a[href*=#]:not([href=#])').click(function () {
	    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
		    $('html,body').scrollTop(target.offset().top - 50);
		    /* animated scrolling
		     $('html,body').animate({
		     scrollTop: target.offset().top - 50
		     }, 1000);*/
		    return false;
		}
	    }
	});

	$window.on('load', function () {
	    $body.scrollspy('refresh')
	})

	// Kill links
	$('.bs-docs-container [href=#]').click(function (e) {
	    e.preventDefault()
	})

	// Sidenav affixing
	setTimeout(function () {
	    var $sideBar = $('.bs-docs-sidebar')

	    $sideBar.affix({
		offset: {
		    top: function () {
			var offsetTop = $sideBar.offset().top
			var sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10)
			var navOuterHeight = $('.bs-docs-nav').height()
			var navBarHeight = $('#top').outerHeight(true) - $('#fixed-nav-header').height();

			return (this.top = offsetTop - navOuterHeight - sideBarMargin + navBarHeight)
		    },
		    bottom: function () {
			return (this.bottom = $('.bs-docs-footer').outerHeight(true))
		    }
		}
	    })
	}, 100)

	setTimeout(function () {
	    $('.bs-top').affix()
	}, 100)

	// Config ZeroClipboard
	ZeroClipboard.config({
	    moviePath: '/assets/flash/ZeroClipboard.swf',
	    hoverClass: 'btn-clipboard-hover'
	})

	// Insert copy to clipboard button before .highlight
	$('.highlight').each(function () {
	    var btnHtml = '<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div>'
	    $(this).before(btnHtml)
	})
	var zeroClipboard = new ZeroClipboard($('.btn-clipboard'))
	var htmlBridge = $('#global-zeroclipboard-html-bridge')

	// Handlers for ZeroClipboard
	zeroClipboard.on('load', function () {
	    htmlBridge
		    .data('placement', 'top')
		    .attr('title', 'Copy to clipboard')
		    .tooltip()
	})

	// Copy to clipboard
	zeroClipboard.on('dataRequested', function (client) {
	    var highlight = $(this).parent().nextAll('.highlight').first()
	    client.setText(highlight.text())
	})

	// Notify copy success and reset tooltip title
	zeroClipboard.on('complete', function () {
	    htmlBridge
		    .attr('title', 'Copied!')
		    .tooltip('fixTitle')
		    .tooltip('show')
		    .attr('title', 'Copy to clipboard')
		    .tooltip('fixTitle')
	})

	// Notify copy failure
	zeroClipboard.on('noflash wrongflash', function () {
	    htmlBridge
		    .attr('title', 'Flash required')
		    .tooltip('fixTitle')
		    .tooltip('show')
	})

    })

}(jQuery)