/**
 * Author: ttionya
 *
 * Time: 2017-12-19 14:19
 *
 * Version: 0.1.0
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
      tips: false,
      closeBtn: false,

      linkTextField: 'text',
      linkUrlField: 'url'
    },
    getMarqueeId = marqueeIdGenerator();


  window.hMarquee = function (opt) {
    opt = $.extend({}, defaultOpt, opt || {});

    var
      $marqueeContainer = opt.el,
      $inner = $('<div class="m-marquee-inner"></div>'),
      $content = $('<div class="m-marquee-content"></div>'),
      $scroll = $('<div class="m-marquee-content-scroll"></div>'),
      $closeBtn = $('<div class="m-marquee-close-btn"></div>'),
      marqueeId = 'm-marquee-' + getMarqueeId(),
      dataText = '', backgroundText = '',
      i;


    /**
     * Check
     */
    // Check opt.el
    if (!$marqueeContainer.length) return;

    // Check Type
    var
      list = (Object.prototype.toString.call(opt.list) === '[object Array]') ? opt.list : [],
      len = list.length,

      delayBeforeStart = +opt.delayBeforeStart || defaultOpt.delayBeforeStart,
      speedPeerSec = +opt.speedPeerSec || defaultOpt.speedPeerSec,
      minShowCount = +opt.minShowCount || defaultOpt.minShowCount,

      isFadeInOut = !!opt.fadeInOut,
      showTips = !!opt.tips,
      showCloseBtn = !!opt.closeBtn;

    // Check List Length
    if (!len || len < minShowCount) {
      $marqueeContainer.hide();
      return;
    }
    else {
      $marqueeContainer.show();
    }


    /**
     * Bind And Fill Data
     */
    // Remove All className (IMPORTANT)
    $marqueeContainer.html('').removeClass().addClass('m-marquee');

    // Add External className
    opt.externalClass && $marqueeContainer.addClass(opt.externalClass);

    // Fade In And Fade Out
    isFadeInOut && $marqueeContainer.addClass('m-marquee-fade');

    // Show Tips Icon
    showTips && $marqueeContainer.addClass('m-marquee-tips');

    // Show Close Button Icon
    if (showCloseBtn) {
      $marqueeContainer.addClass('m-marquee-close');

      $closeBtn.on('click', function () {
        var close = function () {
          $marqueeContainer.hide(); // TODO Add animation

          // Cancel Listener
          $closeBtn.off('click');
        };

        // Bind Callback
        if (typeof opt.closeBtnCB === 'function') {
          opt.closeBtnCB() && close();
        }
        else {
          close();
        }
      });
    }

    // Fill Data
    switch (typeof list[0]) {
      case 'object': // With Links
        var textField = opt.linkTextField,
          urlField = opt.linkUrlField,
          tmpText, tmpUrl;

        for (i = 0; i < len; i++) {
          tmpText = list[i][textField];
          tmpUrl = list[i][urlField];

          dataText += tmpUrl ?
            ('<a href="' + tmpUrl + '">' + tmpText + '</a>') :
            ('<a>' + tmpText + '</a>');
        }
        $scroll.append(dataText);

        break;

      case 'string': // Without Links
        for (i = 0; i < len; i++) {
          dataText += '<span>' + list[i] + '</span>';
        }
        $scroll.append(dataText);

        break;

      default:
        $marqueeContainer.hide();
        return;
    }


    /**
     * CSS
     */
    // Set Common Style
    setCommonStyle();

    // Set background-image
    showTips && (backgroundText += '.m-marquee.' + marqueeId + '.m-marquee-tips .m-marquee-inner:before { background-image: url("' + (opt.tipsImg ? opt.tipsImg : '') + '"); }');
    showCloseBtn && (backgroundText += '.m-marquee.' + marqueeId + '.m-marquee-close .m-marquee-close-btn:before { background-image: url("' + (opt.closeBtnImg ? opt.closeBtnImg : '') + '"); }');

    backgroundText && $marqueeContainer.addClass(marqueeId).append('<style>' + backgroundText + '</style>');


    /**
     * Append To DOM
     */
    $marqueeContainer.append($inner.append($content));

    // Add Close Button
    showCloseBtn && $marqueeContainer.append($closeBtn);

    // Calc Width And Set CSS Animation
    setTimeout(function () {
      /**
       * We should append $scroll here.
       *
       * Fix the bug that marquee can not be rendering on some iOS devices.
       *
       * 需要放在这里面才能生效，以避免有些 iOS 设备下出现跑马灯无法渲染的问题
       */
      $content.append($scroll);

      var width = $scroll.width(),
        time = width / speedPeerSec;

      $scroll.css({
        '-webkit-animation-duration': time + 's',
                'animation-duration': time + 's',
        '-webkit-animation-delay': delayBeforeStart + 's',
                'animation-delay': delayBeforeStart + 's'
      });
    }, 0); // Necessary
  };


  /**
   * CSS
   *
   * Add style once.
   */
  function setCommonStyle() {
    var styleText;

    if (!$('#m-marquee-style').length) {
      styleText = '.m-marquee { position: relative; }'
        + '.m-marquee .m-marquee-inner { position: relative; }'
        + '.m-marquee.m-marquee-tips .m-marquee-inner { padding-left: 40px; }'
        + '.m-marquee.m-marquee-tips .m-marquee-inner:before { content: ""; position: absolute; top: 50%; left: 15px; width: 16px; height: 16px; background-size: 16px auto; background-repeat: no-repeat; -webkit-transform: translateY(-50%); transform: translateY(-50%); }'
        + '.m-marquee .m-marquee-content { position: relative; overflow: hidden; white-space: nowrap; }'
        + '.m-marquee.m-marquee-fade .m-marquee-content:before, .m-marquee.m-marquee-fade .m-marquee-content:after { content: ""; position: absolute; top: 0; width: 15px; height: 100%; z-index: 99999; }'
        + '.m-marquee.m-marquee-fade .m-marquee-content:before { left: 0; background-image: -webkit-linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); background-image: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); }'
        + '.m-marquee.m-marquee-fade .m-marquee-content:after { right: 0; background-image: -webkit-linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); }'
        + '.m-marquee .m-marquee-content-scroll { display: inline-block; padding-left: 100%; -webkit-animation: m-marquee 999s linear infinite; animation: m-marquee 999s linear infinite; }'
        + '.m-marquee .m-marquee-content-scroll span, .m-marquee .m-marquee-content-scroll a { padding-right: 40px; }'
        + '.m-marquee.m-marquee-close .m-marquee-inner { padding-right: 30px; }'
        + '.m-marquee.m-marquee-close .m-marquee-close-btn { position: absolute; top: 0; right: 0; width: 30px; height: 100%; }'
        + '.m-marquee.m-marquee-close .m-marquee-close-btn:before { content: ""; position: absolute; top: 50%; right: 7px; width: 16px; height: 16px; background-size: 16px auto; background-repeat: no-repeat; -webkit-transform: translateY(-50%); transform: translateY(-50%); }'
        + '@-webkit-keyframes m-marquee { from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); } to { -webkit-transform: translate3d(-100%,0,0); transform: translate3d(-100%,0,0); }'
        + '@keyframes m-marquee { from { -webkit-transform: translate3d(0,0,0); transform: translate3d(0,0,0); } to { -webkit-transform: translate3d(-100%,0,0); transform: translate3d(-100%,0,0); } }';

      $('head').append($('<style id="m-marquee-style"></style>').text(styleText));
    }
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
