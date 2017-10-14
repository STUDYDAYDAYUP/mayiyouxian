(function () {
  'use strict';
  var pageX;
  var pageY;
  var slider;
  var deltaX;
  var deltaY;
  var offsetX;
  var lastSlide;
  var startTime;
  var resistance;
  var sliderWidth;
  var slideNumber;
  var isScrolling;
  var scrollableArea;
    
  var getSlider = function (target) {
    var i;
    var sliders = document.querySelectorAll('.slider > .slide-group');

    for (; target && target !== document; target = target.parentNode) {
      for (i = sliders.length; i--;) {
        if (sliders[i] === target) {
          return target;
        }
      }
    }
  };

  var getScroll = function () {
    if ('webkitTransform' in slider.style) {
      var translate3d = slider.style.webkitTransform.match(/translate3d\(([^,]*)/);
      var ret = translate3d ? translate3d[1] : 0;
      return parseInt(ret, 10);
    }
  };

  var setSlideNumber = function (offset) {
    var round = offset ? (deltaX < 0 ? 'ceil' : 'floor') : 'round';
    slideNumber = Math[round](getScroll() / (scrollableArea / slider.children.length));
    slideNumber += offset;
    slideNumber = Math.min(slideNumber, 0);
    slideNumber = Math.max(-(slider.children.length - 1), slideNumber);
  };

  var onTouchStart = function (e) {
      
    slider = getSlider(e.target);

    if (!slider) {
      return;
    }
    api.setFrameAttr({
	    name: 'home',
	    bounces:false
    });
    var firstItem  = slider.querySelector('.slide');
    scrollableArea = firstItem.offsetWidth * slider.children.length;
    isScrolling    = undefined;
    sliderWidth    = slider.offsetWidth;
    resistance     = 1;
    lastSlide      = -(slider.children.length - 1);
    startTime      = +new Date();
    pageX          = e.touches[0].pageX;
    pageY          = e.touches[0].pageY;
    deltaX         = 0;
    deltaY         = 0;

    setSlideNumber(0);

    slider.style['-webkit-transition-duration'] = 0;
  };

  var onTouchMove = function (e) {
    if (e.touches.length > 1 || !slider) {
      return; // Exit if a pinch || no slider
    }

    deltaX = e.touches[0].pageX - pageX;
    deltaY = e.touches[0].pageY - pageY;
    pageX  = e.touches[0].pageX;
    pageY  = e.touches[0].pageY;

    if (typeof isScrolling === 'undefined') {
      isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
    }

    if (isScrolling) {
      return;
    }

    offsetX = (deltaX / resistance) + getScroll();

    e.preventDefault();

    resistance = slideNumber === 0         && deltaX > 0 ? (pageX / sliderWidth) + 1.25 :
                 slideNumber === lastSlide && deltaX < 0 ? (Math.abs(pageX) / sliderWidth) + 1.25 : 1;
    slider.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';
  };

  var onTouchEnd = function (e) {
    if (!slider || isScrolling) {
      return;
    }
	api.setFrameAttr({
	    name: 'home',
	    bounces:true
    });
    setSlideNumber(
      (+new Date()) - startTime < 5000 && Math.abs(deltaX) > 5 ? (deltaX < 0 ? -1 : 1) : 0
    );

    offsetX = slideNumber * sliderWidth;

    slider.style['-webkit-transition-duration'] = '.2s';
    slider.style.webkitTransform = 'translate3d(' + offsetX + 'px,0,0)';
	
	//滑动当前选中
	var li_length = $('.slider ul').find('li').length;
	$('.slider ul li').removeClass('selected');
	for(var i = 0; i < li_length; i ++){
		if($('.slider ul li').eq(i).attr('item') == slideNumber){
			$('.slider ul li').eq(i).addClass('selected');
		}
	}
	
    e = new CustomEvent('slide', {
      detail: { slideNumber: Math.abs(slideNumber) },
      bubbles: true,
      cancelable: true
    });

    slider.parentNode.dispatchEvent(e);
	
  };
  
  //轮播器添加圆点
  var init = function(){
  	var length = $('.slider .slide-group').find('div').length;
	var html = '<ul id="slider-ul">';
	for(var i = 0 ; i < length; i ++){
		if(i == 0){
			html += '<li item="'+ -i +'" class="selected">●</li>';
		}else{
			html += '<li item="'+ -i +'">●</li>';
		}
	}
	html += '</ul>';
	var obj = $('.slider');
	// obj.append(html);
	
	var css = '<style type="text/css">';
	css += '.slider ul#slider-ul {z-index:999999;position:absolute;bottom:-2px;line-height:20px;width:100%;margin:0 auto;text-align:center;font-size:20px;}';
	css += '.slider ul#slider-ul li{display:inline-block;margin:0 3px;font-weight:bold;font-size:20px;color:#ccc;}';
	css += '.slider ul#slider-ul li.selected{color:#db3752;}';
	css += '</style>';
	obj.append(html+css);
  };
  
  window.addEventListener('load',init);
  window.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('touchend', onTouchEnd);
})();
