jQuery(document).ready(function(){
	//cache DOM elements
	var mainContent = $('.cd-main-content'),
		header = $('.cd-main-header'),
		sidebar = $('.cd-side-nav'),
		sidebarTrigger = $('.cd-nav-trigger'),
		topNavigation = $('.cd-top-nav'),
		searchForm = $('.cd-search'),
		accountInfo = $('.account');

	//on resize, move search and top nav position according to window width
	var resizing = false;
	moveNavigation();
	$(window).on('resize', function(){
		if( !resizing ) {
			(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
			resizing = true;
		}
	});

	//on window scrolling - fix sidebar nav
	var scrolling = false;
	checkScrollbarPosition();
	$(window).on('scroll', function(){
		if( !scrolling ) {
			(!window.requestAnimationFrame) ? setTimeout(checkScrollbarPosition, 300) : window.requestAnimationFrame(checkScrollbarPosition);
			scrolling = true;
		}
	});

	//mobile only - open sidebar when user clicks the hamburger menu
	sidebarTrigger.on('click', function(event){
		event.preventDefault();
		$([sidebar, sidebarTrigger]).toggleClass('nav-is-visible');
	});

	//click on item and show submenu
	$('.has-children > a').on('click', function(event){
		var mq = checkMQ(),
			selectedItem = $(this);
		if( mq == 'mobile' || mq == 'tablet' ) {
			event.preventDefault();
			if( selectedItem.parent('li').hasClass('selected')) {
				selectedItem.parent('li').removeClass('selected');
			} else {
				sidebar.find('.has-children.selected').removeClass('selected');
				accountInfo.removeClass('selected');
				selectedItem.parent('li').addClass('selected');
			}
		}
	});

	//click on account and show submenu - desktop version only
	accountInfo.children('a').on('click', function(event){
		var mq = checkMQ(),
			selectedItem = $(this);
		if( mq == 'desktop') {
			event.preventDefault();
			accountInfo.toggleClass('selected');
			sidebar.find('.has-children.selected').removeClass('selected');
		}
	});

	$(document).on('click', function(event){
		if( !$(event.target).is('.has-children a') ) {
			sidebar.find('.has-children.selected').removeClass('selected');
			accountInfo.removeClass('selected');
		}
	});



	//Clara.IO functions

	//Clara IO
	(function () {
	  var uuid = '7b29fb8a-fbc0-4fe7-b079-920774fbde17';
		$('#clara').clara({id: uuid, timeline: false, logo: false, loadingImg: 'img/body.png'});
	})();

	//Overall
	$("#overall").on('click', function(){
		$('#clara').clara('script', {fn: function(ctx) {
			// ctx.exec("view", "showAllNodes");
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Body*#Properties').set({"visible":true});
			// ctx('Female_Body_S*#Properties').set({"visible":true});
		}});
	});

	//Muscular
	$("#muscular").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Muscular*#Properties').set({"visible":true});
			ctx('Female_Breast*#Properties').set({"visible":true});
			ctx('Female_Skeletal*#Properties').set({"visible":true});
			ctx('Female_Skeletal*#Properties').set({"visible":true});
		}});
	});

	//Skeletal
	$("#skeletal").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Skeletal*#Properties').set({"visible":true});
			// ctx('Female_Body_L_*#Properties').set({"visible":true});
			// ctx('Female_Body_R_*#Properties').set({"visible":true});
		}});
	});

	//Nervous
	$("#nervous").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Body_L_*#Properties').set({"visible":true});
			ctx('Female_Body_R_*#Properties').set({"visible":true});
			ctx('Female_Nervous*#Properties').set({"visible":true});
		}});
	});

	//Circulatory
	$("#circulatory").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Circu*#Properties').set({"visible":true});
		}});
	});

	//Respiratory
	$("#repository").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Resp*#Properties').set({"visible":true});
		}});
	});

	//Digestive
	$("#digest").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Digest*#Properties').set({"visible":true});
		}});
	});

	//Lymphatic
	$("#lymphatic").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Lymph*#Properties').set({"visible":true});
		}});
	});

	//Reproductive System
	$("#reproductive").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Reproduc*#Properties').set({"visible":true});
		}});
	});

	//Urinary System
	$("#urinary").on('click', function(event){
		$('#clara').clara('script', {fn: function(ctx) {
			ctx('Female_*#Properties').set({"visible":false});
			ctx('Female_Urina*#Properties').set({"visible":true});
		}});
	});

	

	//Slider Control

	$( "#slider-range-max" ).slider({
      range: "max",
      min: 0,
      max: 11,
      value: 0,
      slide: function( event, ui ) {
        switch(ui.value) {
        	case 0 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":false});
						ctx('Female_Body*#Properties').set({"visible":true});
						}}); break;
        	case 1 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
						ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
						ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						}}); break;
        	case 2 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
						ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
						ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						}}); break;
        	case 3 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						}}); break;
        	case 4 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						}}); break;
        	case 5 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						ctx('Female_Digest*#Properties').set({"visible":false});
						}}); break;
        	case 6 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						ctx('Female_Digest*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						}}); break;
        	case 7 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						ctx('Female_Digest*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Urina*#Properties').set({"visible":false});
						}}); break;
        	case 8 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						ctx('Female_Digest*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Urina*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						}}); break;
        	case 9 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						ctx('Female_Digest*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Urina*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Resp*#Properties').set({"visible":false});
						}}); break;
        	case 10 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						ctx('Female_Digest*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Urina*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Resp*#Properties').set({"visible":false});
						ctx('Female_Circu*#Properties').set({"visible":false});
						}}); break;
        	case 11 : $('#clara').clara('script', {fn: function(ctx) { 
        				ctx('Female_*#Properties').set({"visible":true});
						ctx('Female_Body*#Properties').set({"visible":false});
				ctx('Female_Body_L_Eye*#Properties').set({"visible":true});
				ctx('Female_Body_R_Eye*#Properties').set({"visible":true});
						ctx('Female_Muscular*#Properties').set({"visible":false});
						ctx('Female_Breast*#Properties').set({"visible":false});
						ctx('Female_Lymph*#Properties').set({"visible":false});
						ctx('Female_Digest*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Urina*#Properties').set({"visible":false});
						ctx('Female_Reproduc*#Properties').set({"visible":false});
						ctx('Female_Resp*#Properties').set({"visible":false});
						ctx('Female_Circu*#Properties').set({"visible":false});
						ctx('Female_Skeletal*#Properties').set({"visible":false});
						}}); break;

        }
      }
    });

	//Color Picker
	$("#custom").spectrum({
	palette: [ ],
	color: "#000",
	maxSelectionSize: 5,
    selectionPalette: ["black", "white", "red", "green", "blue"],
    preferredFormat: "hex",
    showInput: true,
    showPalette: true,
    change: function(color) {
    	$('#clara').clara('script', {fn: function(ctx) {
    	console.log(color['_r'] +color['_g'] +color['_b'] )
    	if(color['_r'] === 0 && color['_g'] === 0 && color['_b'] === 0) {
    		ctx('Human Body Browser#Environment[name=Environment]').set({"backgroundStyle":0});	
    	} else {
    		ctx('Human Body Browser#Environment[name=Environment]').set({"backgroundStyle":1});
    	}

    	ctx('Human Body Browser#Environment[name=Environment]').set({"backgroundColor":{"r":color['_r'],"g":color['_g'],"b":color['_b']}});
    	}});
		}
	});


	//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
	sidebar.children('ul').menuAim({
        activate: function(row) {
        	$(row).addClass('hover');
        },
        deactivate: function(row) {
        	$(row).removeClass('hover');
        },
        exitMenu: function() {
        	sidebar.find('.hover').removeClass('hover');
        	return true;
        },
        submenuSelector: ".has-children",
    });

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-main-content'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	function moveNavigation(){
  		var mq = checkMQ();
        
        if ( mq == 'mobile' && topNavigation.parents('.cd-side-nav').length == 0 ) {
        	detachElements();
			topNavigation.appendTo(sidebar);
			searchForm.removeClass('is-hidden').prependTo(sidebar);
		} else if ( ( mq == 'tablet' || mq == 'desktop') &&  topNavigation.parents('.cd-side-nav').length > 0 ) {
			detachElements();
			searchForm.insertAfter(header.find('.cd-logo'));
			topNavigation.appendTo(header.find('.cd-nav'));
		}
		checkSelected(mq);
		resizing = false;
	}

	function detachElements() {
		topNavigation.detach();
		searchForm.detach();
	}

	function checkSelected(mq) {
		//on desktop, remove selected class from items selected on mobile/tablet version
		if( mq == 'desktop' ) $('.has-children.selected').removeClass('selected');
	}

	function checkScrollbarPosition() {
		var mq = checkMQ();
		
		if( mq != 'mobile' ) {
			var sidebarHeight = sidebar.outerHeight(),
				windowHeight = $(window).height(),
				mainContentHeight = mainContent.outerHeight(),
				scrollTop = $(window).scrollTop();

			( ( scrollTop + windowHeight > sidebarHeight ) && ( mainContentHeight - sidebarHeight != 0 ) ) ? sidebar.addClass('is-fixed').css('bottom', 0) : sidebar.removeClass('is-fixed').attr('style', '');
		}
		scrolling = false;
	}
});