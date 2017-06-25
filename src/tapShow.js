/*!
 * tapShow 1.0.0
 * https://github.com/DxEDesign/tapShow.js
 * @license MIT licensed
 *
 * Copyright (C) 2017 DxE Design
 **/

(function() {
    // define global variables
    var doc = document,
        createEl = 'createElement';

    window.tapShow = (function(options) {
        /* Default Value for root variables */
        // Properties for Container
        var containerWidth = checkUserInput(options.containerWidth, '100%'),
            direction = getFlexDirection(options.direction),
            blockPosition = getFlexPosition(options.blockPosition),
            textAlign = checkUserInput(options.textAlign, 'center'),
            // Properties for Block
            blockSelector = checkUserInput(options.blockSelector, '.block'),
            displayOne = checkUserInput(options.displayOne, false),
            animateDuration = checkUserInput(options.animateDuration, 1200),
            fadeDuration = checkUserInput(options.fadeDuration, 250),
            expandWidth = checkUserInput(options.expandWidth, '100%'),
            expandHeight = checkUserInput(options.expandHeight, 'auto'),
            outerContentSelector = checkUserInput(options.outerContentSelector, '.outer-content'),
            innerContentSelector = checkUserInput(options.innerContentSelector, '.inner-content'),
            // basic CSS Style for block
            blockWidth = checkUserInput(options.blockWidth, '250px'),
            blockHeight = checkUserInput(options.blockHeight, 'auto'),
            blockPadding = checkUserInput(options.blockPadding, '20px'),
            blockMargin = checkUserInput(options.blockMargin, '10px'),
            background = checkUserInput(options.background, '#fff'),
            borderWidth = checkUserInput(options.borderWidth, '1px'),
            borderColor = checkUserInput(options.borderColor, '#000'),
            contentAlignH = getFlexPosition(options.contentAlignH),
            contentAlignV = getFlexPosition(options.contentAlignV),
            // Properties for closeBtn
            allowCloseBtn = checkUserInput(options.allowCloseBtn, true),
            // Custom CSS Configuration for block, outerContent and innerContent
            customCSS = checkUserInput(options.customCSS, undefined),



            // selector for target & inner block(s)
            target = doc.querySelector(options.target),
            targetBlocks = doc.querySelectorAll(options.target + '>' + blockSelector),
            arrayTargetBlocks = Array.from(targetBlocks), // some browser do not support NodeList.forEach(), this convert solve the issue



            // functions of tapShow.js
            root = {
                build: function() {
                    // refresh select targetBlocks
                    targetBlocks = doc.querySelectorAll(options.target + '>' + blockSelector);

                    // apply logics to all defined ".block" inside target
                    for (let i = 0; i < targetBlocks.length; i++) {
                        let targetBlock = targetBlocks[i],
                            outerContentNode = targetBlock.querySelector(outerContentSelector),
                            innerContentNode = targetBlock.querySelector(innerContentSelector);


                        // hides inner-content initially and set outer content as block
                        innerContentNode.style.display = 'none';
                        outerContentNode.style.display = 'block';


                        // configure each targetBlock's CSS
                        target.style['text-align'] = textAlign;
                        target.style['width'] = containerWidth;
                        target.style['display'] = 'flex';
                        target.style['flex-wrap'] = 'wrap';
                        target.style['flex-direction'] = direction;
                        target.style['justify-content'] = blockPosition;
                        target.style['align-items'] = blockPosition;
                        // targetBlock.style['cssText'] = 'display:block;';
                        targetBlock.style['cssText'] = 'display:flex;';
                        targetBlock.style['cssText'] += 'position:relative;';
                        targetBlock.style['cssText'] += 'box-sizing:border-box;';
                        targetBlock.style['cssText'] += 'cursor:pointer;';
                        targetBlock.style['cssText'] += 'overflow:hidden;';
                        targetBlock.style['cssText'] += 'justify-content:' + contentAlignH + ';';
                        targetBlock.style['cssText'] += 'align-items:' + contentAlignV + ';';
                        // targetBlock.style['cssText'] += 'flex:1 1 auto;';
                        targetBlock.style['cssText'] += 'background:' + background + ';';
                        targetBlock.style['cssText'] += 'border:' + borderWidth + ' solid ' + borderColor + ';';
                        targetBlock.style['cssText'] += 'padding:' + blockPadding + ';';
                        targetBlock.style['cssText'] += 'width:' + blockWidth + ';';
                        targetBlock.style['cssText'] += 'height:' + blockHeight + ';';
                        // targetBlock.style['cssText'] += 'min-width:' + 'calc((100% - ' + ((marginLeft + marginRight)*6) + 'px' + ') / 6)';
                        targetBlock.style['cssText'] += 'margin:' + blockMargin + ';';
                        // targetBlock.style['cssText'] += 'height:' + targetBlock.offsetHeight + 'px';
                        targetBlock.style['cssText'] += webkitify('transition:', 'width ' + animateDuration + 'ms ease;');


                        // create close button
                        let closeBtn;
                        if (allowCloseBtn) {
                            targetBlock.insertBefore(createCloseButton(), targetBlock.firstChild);
                            closeBtn = targetBlock.querySelector('.btn-close');
                        }



                        // when block onclick
                        targetBlock.onclick = function(e) {
                            if (targetBlock.classList.contains('binded')) return; // exit if block already expanded
                            if (options.showStart) options.showStart() // event callback before content is shown


                            // show one block at a time
                            if (displayOne) {
                                arrayTargetBlocks.forEach(function(block) {
                                    if (block !== targetBlock) {
                                        fadeOut(block, fadeDuration);
                                    }
                                });
                            }


                            // hide outer-content & show inner-content
                            fadeOut(outerContentNode, fadeDuration, function() {
                                // event callback after outer-content fadeOut
                                fadeIn(innerContentNode, 'block', fadeDuration, function() {
                                    if (options.showEnd) options.showEnd() // event callback after content is shown
                                });
                                if (allowCloseBtn)
                                    fadeIn(closeBtn, 'block', fadeDuration);
                            });


                            // expand the width & height of block
                            targetBlock.classList.add("binded");
                            targetBlock.style['width'] = expandWidth;
                            targetBlock.style['height'] = expandHeight;


                            // callbacks for animation ended
                            setTimeout(function() {
                                // event callback after block expanded
                                if (options.blockExpand) options.blockExpand()
                            }, animateDuration);
                        };


                        // when close button is clicked
                        if (allowCloseBtn) {
                            closeBtn.onclick = function() {
                                if (!targetBlock.classList.contains('binded')) return; // exit if block not expand
                                if (options.hideStart) options.hideStart() // event callback before content is hide


                                // show outer-content & hide inner-content
                                fadeOut(closeBtn, fadeDuration);
                                fadeOut(innerContentNode, fadeDuration, function() {
                                    // event callback after inner-content fadeOut
                                    fadeIn(outerContentNode, 'block', fadeDuration, function() {
                                        if (options.hideEnd) options.hideEnd() // event callback after content is hide
                                    });
                                });


                                // set block back to original size
                                targetBlock.style['width'] = blockWidth;


                                // callbacks for animation ended
                                setTimeout(function() {
                                    // event callback after block collapse
                                    if (options.blockCollapse) options.blockCollapse()

                                    // delay setting back block back its height
                                    targetBlock.style['height'] = blockHeight;

                                    // remove binding
                                    targetBlock.classList.remove('binded');

                                    // made visible again for all block that disappear
                                    if (displayOne) {
                                        arrayTargetBlocks.forEach(function(block) {
                                            if (block !== targetBlock) {
                                                fadeIn(block, 'flex', fadeDuration);
                                            }
                                        });
                                    }
                                }, animateDuration);
                            };
                        }
                    }

                    // apply customCSS at the end of build function
                    if (typeof customCSS !== undefined && typeof customCSS === 'object') {
                        for (var obj in customCSS) {
                            let block = target.querySelector(obj);
                            if (block !== null) {
                                block.style['cssText'] += customCSS[obj];
                            }
                        }
                    }

                },
                destroy: function() {
                    for (let i = 0; i < targetBlocks.length; i++) {
                        let targetBlock = targetBlocks[i],
                            outerContentNode = targetBlock.querySelector(outerContentSelector),
                            innerContentNode = targetBlock.querySelector(innerContentSelector),
                            closeBtn = targetBlock.querySelector('.btn-close');

                        // removes all styling
                        targetBlock.style.cssText = '';
                        outerContentNode.style.cssText = '';
                        innerContentNode.style.cssText = '';

                        // Remove closeBtn from parent Node
                        if (closeBtn) targetBlock.removeChild(closeBtn);

                        // Remove all binded class in blocks
                        targetBlock.classList.remove('binded');

                        // Remove all event listener
                        targetBlock.onclick = null;
                    }
                    target.style.cssText = '';
                },
                rebuild: function() {
                    this.destroy();
                    this.build();
                },
                alignLeft: function() {
                    blockPosition = "flex-start";
                    this.rebuild();
                },
                alignCenter: function() {
                    blockPosition = "center";
                    this.rebuild();
                },
                alignRight: function() {
                    blockPosition = "flex-end";
                    this.rebuild();
                },
                expandBlock: function(selector) {
                    let blockArray = [];
                    if (typeof selector !== 'undefined' && selector) {
                        blockArray = target.querySelectorAll(selector);
                    } else {
                        blockArray = targetBlocks;
                    }

                    for (let i = 0; i < blockArray.length; i++) {
                        let targetBlock = blockArray[i],
                            outerContentNode = targetBlock.querySelector(outerContentSelector),
                            innerContentNode = targetBlock.querySelector(innerContentSelector),
                            closeBtn = targetBlock.querySelector('.btn-close');


                        // execute only if block is not expand
                        if (!targetBlock.classList.contains('binded')) {
                            if (options.showStart) options.showStart() // event callback before content is shown

                            setTimeout(function() {
                                // hide outer-content & show inner-content
                                fadeOut(outerContentNode, fadeDuration, function() {
                                    // event callback after outer-content fadeOut
                                    fadeIn(innerContentNode, 'block', fadeDuration, function() {
                                        if (options.showEnd) options.showEnd() // event callback after content is shown
                                    });
                                    if (allowCloseBtn)
                                        fadeIn(closeBtn, 'block', fadeDuration);
                                });
                            }, 150);


                            // expand the width & height of block
                            targetBlock.classList.add("binded");
                            targetBlock.style['width'] = expandWidth;
                            targetBlock.style['height'] = expandHeight;


                            // callbacks for animation ended
                            setTimeout(function() {
                                // event callback after block expanded
                                if (options.blockExpand) options.blockExpand()
                            }, animateDuration);
                        }
                    }
                },
                collapseBlock: function(selector) {
                    let blockArray = [];
                    if (typeof selector !== 'undefined' && selector) {
                        blockArray = target.querySelectorAll(selector);
                    } else {
                        blockArray = targetBlocks;
                    }

                    for (let i = 0; i < blockArray.length; i++) {
                        let targetBlock = blockArray[i],
                            outerContentNode = targetBlock.querySelector(outerContentSelector),
                            innerContentNode = targetBlock.querySelector(innerContentSelector),
                            closeBtn = targetBlock.querySelector('.btn-close');


                        // execute only if block is already expanded
                        if (targetBlock.classList.contains('binded')) {
                            if (options.hideStart) options.hideStart() // event callback before content is hide
                            setTimeout(function() {
                                // show outer-content & hide inner-content
                                fadeOut(innerContentNode, fadeDuration, function() {
                                    // event callback after inner-content fadeOut
                                    fadeIn(outerContentNode, 'block', fadeDuration, function() {
                                        if (options.hideEnd) options.hideEnd() // event callback after content is hide
                                    });
                                });
                                if (allowCloseBtn)
                                    fadeOut(closeBtn, fadeDuration);
                            }, 100);

                            // set block back to original size
                            targetBlock.style['width'] = blockWidth;
                            targetBlock.style['height'] = blockHeight;
                            // console.log(blockWidth);


                            // callbacks for animation ended
                            setTimeout(function() {
                                // event callback after block collapse
                                if (options.blockCollapse) options.blockCollapse()

                                // remove binding
                                targetBlock.classList.remove('binded');
                            }, animateDuration);
                        }

                    }
                },
                addBlock: function(arg) {
                    let newblock = doc[createEl]('DIV'),
                        outerContentNode = doc[createEl]('DIV'),
                        innerContentNode = doc[createEl]('DIV');

                    newblock.classList.add('block');
                    outerContentNode.classList.add('outer-content');
                    innerContentNode.classList.add('inner-content');

                    outerContentNode.innerHTML = arg.outerContent;
                    innerContentNode.innerHTML = arg.innerContent;

                    newblock.appendChild(outerContentNode);
                    newblock.appendChild(innerContentNode);

                    target.appendChild(newblock);

                    this.rebuild();
                },
                removeBlock: function(arg) {
                    let block;
                    targetBlocks = doc.querySelectorAll(options.target + '>' + blockSelector);

                    if (targetBlocks.length === 0) return; // stop this function if no block left to be removed
                    if (arg) {
                        block = doc.querySelector(options.target + '>' + arg.target);
                    } else {
                        // by default, this will remove the last block
                        block = doc.querySelector(options.target + '>' + blockSelector + ':last-child');
                    }
                    target.removeChild(block);
                }
            };

        root.build();
        return root;
    });

    function createCloseButton() {
        var el = doc[createEl]('DIV');
        el.className = 'btn-close';
        el.innerHTML = '&#215;'
        el.style['cssText'] = 'display:none;position:absolute;top:0;right:15px;font-size:40px;';
        return el;
    }

    function webkitify(prop, val) {
        var webkit = '-webkit-';
        var propVal = prop + val;
        return webkit + propVal + propVal;
    }

    function checkUserInput(inputVal, defaultVal) {
        // this return default value, if input value is undefined
        return typeof inputVal !== 'undefined' ? inputVal : defaultVal;
    }

    function getFlexPosition(val) {
        // to convert user input top, bottom, left, right to flex keywords
        // used in justify-content, align-items & align-content
        if (val === 'top' || val === 'left') {
            return 'flex-start';
        } else if (val === 'bottom' || val === 'right') {
            return 'flex-end';
        } else {
            // default value
            return 'center';
        }
    }

    function getFlexDirection(val) {
        // to convert user input horizontal & vertical to flex keywords
        if (val === 'vertical') {
            return 'column';
        } else {
            // default value
            return 'row';
        }
    }

    /*-----------------------------------------------------------------------*\
        FadeIn & FadeOut Techniques by Chris Buttery: https://goo.gl/TncSM4
    \*-----------------------------------------------------------------------*/
    // fade out
    function fadeOut(el, duration, cb) {
        var op = 1;

        (function fade() {
            el.style.opacity = op;
            op -= (1 / (duration * 60 / 1000));
            if (op <= 0) {
                el.style.opacity = 0;
                el.style.display = 'none';
                if (cb) cb();
                return;
            }
            requestAnimationFrame(fade);
        })();
    }

    // fade in
    function fadeIn(el, display, duration, cb) {
        var op = 0;
        el.style.display = display;

        (function fade() {
            el.style.opacity = op;
            op += (1 / (duration * 60 / 1000));
            if (op >= 1) {
                el.style.opacity = 1;
                if (cb) cb();
                return;
            }
            requestAnimationFrame(fade);
        })();
    }
})();
