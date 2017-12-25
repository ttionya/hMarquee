# hMarquee

A horizontal scroll marquee of jQuery / Zepto plugin.

You can initialize multiple marquees.

## Usage

In a browser:

```html
<script src="dist/hMarquee.min.js"></script>
```

## Method

### `$.hMarquee.marquee(options)`

A normal horizontal scroll marquee.

### `$.hMarquee.notification(options)`

A scroll notification bar, for only one notification.

### `$.hMarquee.notificationOnce(options)`

An *always scroll* notification bar for only once scrolling. Also for only one notification.

**Note:** The above three methods will return `undefined` for wrong options or `options.el`.

### `$.hMarquee.hide($el)` and `$.hMarquee.show($el)`

Hide and show the marquee with animation. You have to passing `jQuery object` or `Zepto object` as a parameter.

**Note:** Please do not add any style about `height`, `line-height`, `margin`, `padding` at marquee outer container if you want to use those two methods. You can add those styles at `m-marquee-content` instead of `m-marquee`.  

More information about options. Please read [Options](#options).

## Options

Options is an `Object` type.

### `el`

`jQuery object` | `Zepto object`, default to `$('.J-marquee')`

jQuery object or Zepto object.

The outer layer container of the marquee.

### `externalClass`

`string`, default to `''`

External class name, you can custom style with external class name.

### `list` *

`Array<string>` | `Array<object>`

Data source of the marquee.

For `Array<string>`:

```html
<div>
  <span>text</span>
  <span>text</span>
  <span>text</span>
  ...
</div>
```

Or for `Array<object>`:

```html
<div>
  <a href="object['linkUrlField']">object['linkTextField']</a>
  <a href="object['linkUrlField']">object['linkTextField']</a>
  <a href="object['linkUrlField']">object['linkTextField']</a>
  ...
</div>
``` 

**Note:**
 
1. Only available for `$.hMarquee.marquee`.
2. `linkTextField` and `linkUrlField` options is only working for `lists`.
3. `object['linkUrlField']` is falsity and would be downgrading to `<span>object['linkTextField']</span>`.

### `linkTextField`

`string`, default to `text`

Look `list` for more information.

### `linkUrlField`

`string`, default to `url`

Look `list` for more information.

### `noticeText` *

`string`

Notification data source.

**Note:** Only available for `$.hMarquee.notification` and `$.hMarquee.notificationOnce`.

### `onclick`

`function`

Do something when click the notification bar.

**Note:** Only available for `$.hMarquee.notification` and `$.hMarquee.notificationOnce`.

### `delayBeforeStart`

`number`, default to `0`, `[second]`

The delay time before scroll.

### `speedPeerSec`

`number`, default to `70`, `[pixel]`

Scroll pixels peer second.

Smaller for slower or bigger for faster.

### `minShowCount`

`number`, default to `3`

If `list` length less than this value, the marquee will not show.

### `fadeInOut`

`boolean`, default to `false`

Use fade effect.

You can custom `m-marquee-content:before` and `m-marquee-content:after` for your own style.

Note the CSS selector priority `.m-marquee.m-marquee-fade .m-marquee-content:before|after`.

### `startVisibility`

`boolean`, default to `true`

Show marquee at once after initialize hMarquee.

If set to `false`, you can use `$.hMarquee.show` to achieve animation.

### `alwaysScroll`

`boolean`, default to `false`

Always scroll the content.

By default, no scroll, no fade effect when content width less than `m-marquee-content` container width.

**Note:** `$.hMarquee.notificationOnce` must to scroll, but only once.

### `leftItem` / `rightItem`

`boolean`, default to `false`

Show left / right item icon.

If true, you should use `leftItemImg` / `rightItemImg` for icon. 

### `leftItemImg` / `rightItemImg`

`string`

Support image base64 data and image url.

### `leftItemCB` / `rightItemCB`

`function`

Do something before close the marquee.

## Code Tree

```html
<div class="m-marquee m-marquee-${marqueeId} ${externalClass} ${'m-marquee-left'} ${'m-marquee-right'} ${'m-marquee-fade'} ${'m-no-ani'} ${'m-hidden'}">
    <div class="m-marquee-left-item"></div>
    <div class="m-marquee-inner">
        <div class="m-marquee-content">
            <div class="m-marquee-content-scroll">
                <a class="m-marquee-item" href="${list[linkUrlField]}">${list[linkTextField]}</a>
                <span class="m-marquee-item">list[i]</span>
                <span class="m-marquee-item">noticeText</span>
            </div>
        </div>
    </div>
    <div class="m-marquee-right-item"></div>
</div>
```

## License

MIT License
