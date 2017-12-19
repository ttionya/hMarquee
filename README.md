# hMarquee

A horizontal scroll marquee of jQuery / Zepto plugin.

You can initialize multiple marquees.

## Usage

In a browser:

```html
<script src="dist/hMarquee.min.js"></script>
```

## Options

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
 
1. `linkTextField` and `linkUrlField` is only available this time.
2. `object['linkUrlField']` is falsity and would be downgrading to `<span>object['linkTextField']</span>`.

### `linkTextField`

`string`, default to `text`

Look `list` for more information.

### `linkUrlField`

`string`, default to `url`

Look `list` for more information.

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

### `tips`

`boolean`, default to `false`

Show left tips icon.

If true, you should use `tipsImg` for icon. 

### `tipsImg`

`string`

Support image base64 data and image url.

### `closeBtn`

`boolean`, default to `false`

Show marquee close button on right. 

If true, you should use `closeBtnImg` for icon.

### `closeBtnImg`

`string`

Support image base64 data and image url.

### `closeBtnCB`

`function`

Do something before close the marquee.

The function return true to close marquee, or return false to keep.

## Code Tree

```html
<div class="m-marquee m-marquee-${marqueeId} ${externalClass} ${tips && 'm-marquee-tips'} ${closeBtn && 'm-marquee-close'} ${fadeInOut && 'm-marquee-fade'}">
    <div class="m-marquee-inner">
        <div class="m-marquee-content">
            <div class="m-marquee-content-scroll">
                <a href="${list[linkUrlField]}">${list[linkTextField]}</a>
                <span>list[i]</span>
            </div>
        </div>
    </div>
    <div class="m-marquee-close-btn"></div>
</div>
```

## License

MIT License
