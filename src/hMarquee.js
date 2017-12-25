/**
 * Author: ttionya
 *
 * Version: 1.1.0
 *
 * GitHub: https://github.com/ttionya/hMarquee
 *
 * License: MIT
 */

!function ($) {
  var
    defaultOpt = {
      el: $('.J-marquee'),

      delayBeforeStart: 0,
      speedPeerSec: 70,
      minShowCount: 3,

      fadeInOut: false,
      alwaysScroll: false,
      leftItem: false,
      rightItem: false,

      linkTextField: 'text',
      linkUrlField: 'url'
    },
    getMarqueeId = marqueeIdGenerator();

  $.hMarquee = {};

  /**
   * A normal horizontal scroll marquee.
   */
  $.hMarquee.marquee = function (opt) {
    opt = extendOptions(opt, {
      onclick: null,
      once: false
    });

    return checkVisibility(opt) && bindAll(opt) ? opt.$c.$marqueeContainer : undefined;
  };

  /**
   * A scroll notification bar.
   *
   * Only supports one notification.
   */
  $.hMarquee.notification = function (opt) {
    opt = extendOptions(opt, {
      minShowCount: 1,
      list: [opt.noticeText],
      once: false
    });

    return checkVisibility(opt) && bindAll(opt) ? opt.$c.$marqueeContainer : undefined;
  };

  /**
   * A notification for only once scrolling.
   *
   * Only supports one notification.
   */
  $.hMarquee.notificationOnce = function (opt) {
    opt = extendOptions(opt, {
      minShowCount: 1,
      list: [opt.noticeText],
      alwaysScroll: true,
      once: true
    });

    return checkVisibility(opt) && bindAll(opt) ? opt.$c.$marqueeContainer : undefined;
  };

  /**
   * Hide && Show marquee container with animation.
   */
  $.hMarquee.hide = function ($el) {
    $el.addClass('m-hidden');
  };

  $.hMarquee.show = function ($el) {
    $el.removeClass('m-hidden');
  };

  /**
   * Bind All
   */
  function bindAll(opt) {
    bindCE(opt);
    bindData(opt);
    bindStyles(opt);

    /**
     * Append To DOM
     */
    var $c = opt.$c;
    opt.leftItem && $c.$marqueeContainer.append($c.$leftItem);

    $c.$marqueeContainer.append($c.$inner.append($c.$content));

    opt.rightItem && $c.$marqueeContainer.append($c.$rightItem);

    // Bind Outer Container Click Event
    typeof opt.onclick === 'function' && $c.$marqueeContainer.on('click', opt.onclick);

    // Calc Width And Set CSS Animation
    setTimeout(function () {
      /**
       * We have to append $scroll here.
       *
       * Fix the bug that marquee can not be rendering on some iOS devices.
       *
       * 需要放在这里面才能生效，以避免有些 iOS 设备下出现跑马灯无法渲染的问题
       */
      $c.$content.append($c.$scroll);

      var contentWidth = $c.$content.width(),
        width = $c.$scroll.width(),
        time;

      /**
       * Always scrolling if contentWidth bigger than scroll container,
       *
       * or set alwaysScroll to true.
       */
      if (!opt.alwaysScroll && (contentWidth >= width)) {
        $c.$scroll.css('padding-left', 0);
        $c.$marqueeContainer.removeClass('m-marquee-fade'); // Remove Fade Effect
      }
      else {
        time = (width + contentWidth) / opt.speedPeerSec;
        $c.$scroll.css({
          'padding-left': '100%',
          '-webkit-animation-duration': time + 's',
          'animation-duration': time + 's',
          '-webkit-animation-delay': opt.delayBeforeStart + 's',
          'animation-delay': opt.delayBeforeStart + 's'
        });

        // For notificationOnce
        opt.once && setTimeout(function () {
          this.hide($c.$marqueeContainer);
        }, time * 1000);
      }
    }, 0); // Necessary

    return true;
  }

  /**
   * CSS
   *
   * Bind style once.
   */
  function bindStyles(opt) {
    var styleText, backgroundText = '';

    if (!$('#m-marquee-style').length) {
      styleText = '.m-marquee { position: relative; overflow: hidden; transition: all .2s ease-in; }'
        + '.marquee.m-hidden { height: 0 !important; }'
        + '.m-marquee .m-marquee-inner { position: relative; }'
        + '.m-marquee.m-marquee-left .m-marquee-inner { padding-left: 40px; }'
        + '.m-marquee.m-marquee-right .m-marquee-inner { padding-right: 40px; }'
        + '.m-marquee.m-marquee-left .m-marquee-left-item, .m-marquee.m-marquee-right .m-marquee-right-item { position: absolute; top: 0; left: 0; width: 40px; height: 100%; }'
        + '.m-marquee.m-marquee-right .m-marquee-right-item { right: 0; left: initial; }'
        + '.m-marquee.m-marquee-left .m-marquee-left-item:before, .m-marquee.m-marquee-right .m-marquee-right-item:before { content: ""; position: absolute; top: 50%; left: 7px; width: 16px; height: 16px; background-size: 16px auto; background-repeat: no-repeat; -webkit-transform: translateY(-50%); transform: translateY(-50%); }'
        + '.m-marquee.m-marquee-right .m-marquee-right-item:before { right: 7px; left: initial; }'

        + '.m-marquee .m-marquee-content { position: relative; overflow: hidden; white-space: nowrap; }'
        + '.m-marquee.m-marquee-fade .m-marquee-content:before, .m-marquee.m-marquee-fade .m-marquee-content:after { content: ""; position: absolute; top: 0; width: 15px; height: 100%; z-index: 99999; }'
        + '.m-marquee.m-marquee-fade .m-marquee-content:before { left: 0; background-image: -webkit-linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); background-image: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); }'
        + '.m-marquee.m-marquee-fade .m-marquee-content:after { right: 0; background-image: -webkit-linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); }'

        + '.m-marquee .m-marquee-content-scroll { display: inline-block; -webkit-animation: m-marquee 0s linear infinite; animation: m-marquee 0s linear infinite; }'
        + '.m-marquee .m-marquee-content-scroll .m-marquee-item { padding-right: 40px; }'
        + '.m-marquee .m-marquee-content-scroll .m-marquee-item:last-child { padding-right: 0; }'

        + '@-webkit-keyframes m-marquee { from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); } to { -webkit-transform: translate3d(-100%,0,0); transform: translate3d(-100%,0,0); }'
        + '@keyframes m-marquee { from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); } to { -webkit-transform: translate3d(-100%,0,0); transform: translate3d(-100%,0,0); } }';

      $('head').append($('<style id="m-marquee-style"></style>').text(styleText));
    }

    // Set background-image
    opt.leftItem && opt.leftItemImg && (backgroundText += '.m-marquee.' + opt.marqueeId + '.m-marquee-left .m-marquee-left-item:before { background-image: url("' + opt.leftItemImg + '"); }');
    opt.rightItem && opt.rightItemImg && (backgroundText += '.m-marquee.' + opt.marqueeId + '.m-marquee-right .m-marquee-right-item:before { background-image: url("' + opt.rightItemImg + '"); }');

    backgroundText && opt.$c.$marqueeContainer.addClass(opt.marqueeId).append('<style>' + backgroundText + '</style>');
  }

  /**
   * Bind Data
   */
  function bindData(opt) {
    var list = opt.list,
      len = opt.listLen,
      dataText = '', i;

    switch (typeof list[0]) {
      case 'object': // With Links
        var textField = opt.linkTextField,
          urlField = opt.linkUrlField,
          tmpText, tmpUrl;

        for (i = 0; i < len; i++) {
          tmpText = list[i][textField];
          tmpUrl = list[i][urlField];

          dataText += tmpUrl ?
            ('<a class="m-marquee-item" href="' + tmpUrl + '">' + tmpText + '</a>') :
            ('<a class="m-marquee-item">' + tmpText + '</a>');
        }

        break;

      case 'string': // Without Links
        for (i = 0; i < len; i++) {
          dataText += '<span class="m-marquee-item">' + list[i] + '</span>';
        }

        break;

      default:
        opt.$c.$marqueeContainer.hide();
    }

    opt.$c.$scroll.append(dataText);
  }

  /**
   * Bind class names.
   *
   * Class & Event
   */
  function bindCE(opt) {
    var $c = opt.$c;

    // Remove All className (IMPORTANT)
    $c.$marqueeContainer.html('').removeClass().off('click').addClass('m-marquee');

    // Add External className
    opt.externalClass && $c.$marqueeContainer.addClass(opt.externalClass);

    // Fade In And Fade Out
    opt.fadeInOut && $c.$marqueeContainer.addClass('m-marquee-fade');

    // Bind Left And Right Item
    function bindItem($item, itemCB, name) {
      $c.$marqueeContainer.addClass('m-marquee-' + name);

      typeof itemCB === 'function' && $item.on('click', itemCB);
    }

    // Bind Item
    opt.leftItem && bindItem($c.$leftItem, opt.leftItemCB, 'left');
    opt.rightItem && bindItem($c.$rightItem, opt.rightItemCB, 'right');
  }

  /**
   * Check marquee visibility.
   */
  function checkVisibility(opt) {
    if (
      !opt.$c.$marqueeContainer.length // Check opt.el.length
      || !opt.listLen
      || opt.listLen < opt.minShowCount
    ) {
      opt.$c.$marqueeContainer.hide();
      return false;
    }
    else {
      opt.$c.$marqueeContainer.show();
      return true;
    }
  }

  /**
   * Extend options from opt and default options.
   */
  function extendOptions(opt, innerOpt) {
    opt = $.extend({}, defaultOpt, opt || {}, innerOpt || {});
    opt.marqueeId = 'm-marquee-' + getMarqueeId();

    opt.list = (Object.prototype.toString.call(opt.list) === '[object Array]') ? opt.list : [];
    opt.listLen = opt.list.length;

    opt.delayBeforeStart = +opt.delayBeforeStart || defaultOpt.delayBeforeStart;
    opt.speedPeerSec = +opt.speedPeerSec || defaultOpt.speedPeerSec;
    opt.minShowCount = +opt.minShowCount || defaultOpt.minShowCount;

    opt.fadeInOut = !!opt.fadeInOut;
    opt.alwaysScroll = !!opt.alwaysScroll;
    opt.leftItem = !!opt.leftItem;
    opt.rightItem = !!opt.rightItem;

    opt.$c = {
      $marqueeContainer: opt.el,
      $inner: $('<div class="m-marquee-inner"></div>'),
      $content: $('<div class="m-marquee-content"></div>'),
      $scroll: $('<div class="m-marquee-content-scroll"></div>'),
      $leftItem: $('<div class="m-marquee-left-item"></div>'),
      $rightItem: $('<div class="m-marquee-right-item"></div>')
    };

    return opt;
  }

  /**
   * Closure
   *
   * Marquee id generator.
   */
  function marqueeIdGenerator() {
    var id = 0;

    return function () {
      return id++;
    }
  }
}(window.jQuery || window.Zepto);
