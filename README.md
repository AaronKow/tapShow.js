# tapShow.js
<p align="center">
<img src="http://dxe-design.com/tapShow.js/img/tapShow-demo.gif" alt="tapShow.js Demo Animation" />
</p>

## Introduction
tapShow.js is a javascript plugin that allows a user to click / (tap) the box, then it will expand and show the full details about that particular block. This plugin is very handy for those who want to "modularize their information into blocks". At this moment, all blocks are arranged in horizontal form.

## Compability
tapShow.js container and blocks layout are developed using CSS3 Flexbox. Thus, tapShow.js has no issue support mostly all modern browser today (eg: Chrome, Firefox, Edge, Safari). However, if you are unsure of what version of browser you're using, you can check the site [here](https://caniuse.com/#search=flexbox), it provides the full list of browser supporting flexbox.

## Structure
The structure of tapShow.js consists of `Container`, `Block(s)`, `Outer-Content` and `Inner-Content`:
![tapShow.js Structure](http://dxe-design.com/tapShow.js/img/structure_tapshow_js.png)

- Container: is the home layout that holds all block(s) together. It is built with CSS3 flexbox. Thus it can give flexible arrangement to the block(s) that reside within.
- Block(s): a box that holds two side of information. First side is called Outer-Content and the other, Inner-Content.
- Outer-Content: first side of information that visible to users initially. It will disappear, once user tap/click it. In order to make it visible again, it needs to wait till user close the box.
- Inner-Content: second side of information that invisible to users initially. It will appear when user tap/click the box that it resides.

## Installation
tapShow.js is independent from other plugins. You just need to include the javascript file into your project:

```html
<script type="text/javascript" src="tapShow.js"></script>
```

Optionally, you can install tapShow.js with npm, bower, or yarn if you prefer:

```bash
# npm
$ npm install tapshow.js

# bower
$ bower install tapshow.js

# with yarn
$ yarn install tapshow.js
```

#### Set HTML
The markup for tapShow.js is very simple. You can include the default class for getting started. The markup as below:

```html
<div class="tpContainer">
    <div class="block">
        <div class="outer-content">
            <p>
                Outer Content will appear initially. This will disappear when you tap it.
            </p>
        </div>

        <div class="inner-content">
            <p>
                Your inner content here! This will appear when you tap the block.
            </p>
        </div>
    </div>
</div>
```

#### Init the plugin
```javascript
tapShow({
    target: '.tpContainer'
});
```

That's it! Then the above method will give you the default layout of tapShow.js block.

## Documentation
To understand more deeply about all functionalities of tapShow.js, please read the [documentation](http://dxe-design.com/tapShow.js/docs).

## License
The License for tapShow.js is under (MIT License):

Copyright (c) 2017 DxE Design

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
