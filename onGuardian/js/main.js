'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressCircle = function () {
  function ProgressCircle(percent, radius, elementClass, innerNumber) {
    _classCallCheck(this, ProgressCircle);

    this._percent = percent;
    this._radius = radius;
    this._innerNumber = innerNumber;
    this._elementClass = elementClass;
  }

  _createClass(ProgressCircle, [{
    key: 'calcDashOffset',
    value: function calcDashOffset() {
      var circumference = Math.PI * (2 * this.radius);
      return Math.floor(circumference - this.percent / 100 * circumference);
    }
  }, {
    key: 'createCSS',
    value: function createCSS() {
      document.querySelectorAll('.' + this._elementClass + ' .donut__svg .donut__svg__circle--one')[0].style.strokeDashoffset = this.calcDashOffset();
    }
  }, {
    key: 'updateText',
    value: function updateText() {
      document.querySelectorAll('.' + this.elementClass + ' .js-donut-figure')[0].innerText = this.innerNumber;
    }
  }, {
    key: 'updateFigure',
    value: function updateFigure(newStat) {
      this._percent = newStat;
      this.updateText();
      this.createCSS();
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      this.updateText();

      setTimeout(function () {
        _this.createCSS();
      }, 300);
    }
  }, {
    key: 'percent',
    get: function get() {
      return this._percent;
    }
  }, {
    key: 'radius',
    get: function get() {
      return this._radius;
    }
  }, {
    key: 'elementClass',
    get: function get() {
      return this._elementClass;
      return document.getElementsByClassName(this._elementClass)[0];
    }
  }, {
    key: 'innerNumber',
    get: function get() {
      return this._innerNumber;
  }}]);

  return ProgressCircle;
}();

var queryDonut = document.querySelectorAll('.donut');
if(queryDonut.length) {
  var progress1 = new ProgressCircle(14, 125, 'donut-1', 24);
  var progress2 = new ProgressCircle(90, 125, 'donut-2', 90);
  var progress3 = new ProgressCircle(100, 125, 'donut-3', 117);
}


$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});



$(document).ready(function($) {

    $(window).resize(function() {
      resizeBxSlider();
    });
    $(window).load(function() {
      resizeBxSlider();
    });

    $('#bx-slider').bxSlider({
        touchEnabled: true,
        mode: 'fade',
        pager: true,
        nextText: '',
        prevText: '',
        auto: true,
        speed: 500,
        onSlideAfter: function(currentSlide, totalSlides, currentSlideHtmlObject){
          $('#bx-slider li').removeClass('active-slide');
          $('#bx-slider li').eq(currentSlideHtmlObject).addClass('active-slide');
        },
        onSliderLoad: function(){
          $('#bx-slider li').eq(0).addClass('active-slide');
        }
    });
    $('#how-section .tab-content').bxSlider({
        touchEnabled: true,
        mode: 'fade',
        pager: true,
        nextText: '',
        prevText: '',
        auto: false,
        speed: 500,
        adaptiveHeight: true,
        onSlideBefore: function(currentSlide, totalSlides, currentSlideHtmlObject){
          $('.fixed-header .nav.nav-pills li').removeClass('active');
          $('.fixed-header .nav.nav-pills li').eq(currentSlideHtmlObject).addClass('active');
        },
        onSlideAfter: function(){
          $('.fixed-header').blur();
        }
    });
    $('.fixed-header .nav.nav-pills li a').on('click', function(e){
      var index = $('.fixed-header .nav.nav-pills li').index($(this).parent());
      $('.fixed-header .nav.nav-pills li').remo
      e.preventDefault();
      $('#how-section .bx-pager .bx-pager-item').eq(index).find('a').trigger('click');
    });
    $('#how-section a.bx-pager-link').on('click', function(e){
      $('html,body').animate({
         scrollTop: $('#how-section').offset().top
      });
      e.preventDefault();
    })
    $('#about-section .tab-content').bxSlider({
        touchEnabled: true,
        mode: 'fade',
        pager: true,
        pagerCustom: $('#about-section .nav.nav-pills'),
        nextText: '',
        prevText: '',
        auto: false,
        speed: 500,
        adaptiveHeight: true,
        onSlideBefore: function(currentSlide, totalSlides, currentSlideHtmlObject){
          $('.fixed-header .nav.nav-pills li').removeClass('active');
          $('.fixed-header .nav.nav-pills li').eq(currentSlideHtmlObject).addClass('active');
        },
        onSlideAfter: function(){
          $('.fixed-header').blur();
        }
    });
    $('#testimonials-slider').bxSlider({
        touchEnabled: true,
        mode: 'horizontal',
        auto: false,
        pager: false,
        nextText: '',
        prevText: '',
        speed: 500,
        adaptiveHeight: true
    });


    function getScrollTop(){
        if(typeof pageYOffset!= 'undefined'){
            return pageYOffset;
        }
        else{
            var B= document.body;
            var D= document.documentElement;
            D= (D.clientHeight)? D: B;
            return D.scrollTop;
        }
    }

    $(window).scroll(function() {
        if (getScrollTop() > 200 && queryDonut.length) {
            progress1.init();
            progress2.init();
            progress3.init();
        }
    });



    $('#contact-form').validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      }
    });
    $('#app-form').validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        appSystem: {
          required: "This field is required."
        }
      }
    });


  // ===== jQuery Sidebar Navigation Settings ===== //

    $(".nav-btn").attr("data-side", "left");
    $('.sidebar-nav').addClass("left");

    $(".sidebar-nav.left").sidebar({
      side: "left"
    });

    $(".nav-btn[data-action]").on("click", function () {
        var $this = $(this);
        var action = $this.attr("data-action");
        var side = $this.attr("data-side");
        if(action == "open") $('.nav-open').hide();
        else $('.nav-open').show();
        $(".sidebar-nav." + side).trigger("sidebar:" + action);
        return false;
    });

    $(".nav-menu li a").on("click", function () {
      $(".sidebar-nav").trigger("sidebar:close");
      $('.nav-open').show();
    });

    if (navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i)
    ) {
        $('#main-menu .nav-menu').css( { "margin-bottom" : "100px" } );
    }


    $(document).ready(function(){
      $('.nav-open').midnight();
      $('#myScrollspy').midnight();
    });

    $('.modal').on('show.bs.modal', function(){
      $(".sidebar-nav.left").trigger("sidebar:close");
      $('.nav-open').show();
    });

    $('#videoModal').on('shown.bs.modal', function(){
      var vid = document.getElementById("modelVideo");
      //vid.load();
      vid.play();
    });
    $('#videoModal').on('hide.bs.modal', function(e) {
      $('#videoModal').hide();
      var vid = document.getElementById("modelVideo");
      vid.load();
    });



    $('#howPhone a.how-block').on('click', function(){
      var src = $(this).attr('data-screen-src');
      $('#howPhone a.how-block.active').removeClass('active');
      $(this).addClass('active');
      $('.device-image-phone span').empty().append('<img src="' + src + '">')
    });
    $('#howPhone a.how-block.active').trigger('click');
    $('#howLaptop a.how-block').on('click', function(){
      var src = $(this).attr('data-screen-src');
      $('#howLaptop a.how-block.active').removeClass('active');
      $(this).addClass('active');
      $('.device-image-laptop span').empty().append('<img src="' + src + '">')
    });
    $('#howLaptop a.how-block.active').trigger('click');


    window.sr = ScrollReveal();
    sr.reveal('#solution-section .container');
    sr.reveal('.white-section');
    sr.reveal('.fixed-header');
    sr.reveal('#testimonials-section');
    sr.reveal('#contacts-section .container');
    sr.reveal('footer .container');
    sr.reveal('.about-people__ava-wrap', {'origin': 'left'});
    sr.reveal('.about-people__name, .about-people__position');
    sr.reveal('.about-people__text', {'delay': 100 })


    $('.about-banner').addClass('about-banner--loaded')
});


function resizeBxSlider() {

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    if (windowHeight < 750) {
      windowHeight = 750;
    }
    var sliderHeight = windowHeight;

    $('#bx-slider li, #bx-slider-section .bx-viewport, #bx-slider').css({ height: sliderHeight });



    var sliderControl = $('#bx-slider-section .bx-pager-custom');
    var sliderCount = sliderControl.find('.bx-pager-item').length;
    var sliderItemHeight = 65;
    var sliderOffset = 4;

    if (sliderCount > 0) {
      var controlHeight = sliderCount * sliderItemHeight - sliderItemHeight;
      var controlPadding = (sliderHeight / 2) - (controlHeight / 2) - sliderOffset;
      sliderControl.css('padding-top',controlPadding+'px');

    }
}