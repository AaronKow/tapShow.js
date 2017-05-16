/**
 * tapShow 0.0.1
 * https://github.com/DxEDesign/tapShow.js
 * @license MIT licensed
 *
 * Copyright (C) 2017 DxE Design
 **/

(function($) {
    $.fn.tapShow = function(options) {
        var opts = $.extend({}, $.fn.tapShow.defaults, options);

        opts.array.forEach(function(key1) {
            $(key1).click(function() {
                var vd = $(this);
                if (vd.hasClass('unbinded')) return;
                runScrollTo(vd);
                vd.parent().closest('div').removeAttr('style');
                opts.array.forEach(function(key2) {
                    if (key1 !== key2)
                        $(key2).closest('div').removeAttr('style').fadeOut(opts.fadeTime);
                });
                $(opts.container).css({
                    "max-height": opts.extendHeight + "px",
                    "height": opts.extendHeight + "px"
                });
                setTimeout(function() {
                    setupVD(vd, opts.setClass, opts.stretchTime, key1.substr(1));
                    vd.children().css({
                        "width": "auto",
                        "height": "auto"
                    });
                    setTimeout(function() {
                        vd.find(opts.shortTextClass).addClass('hidden');
                        vd.find(opts.longTextClass).removeClass('hidden');
                        vd.find("button").removeClass("hidden");
                    }, 200);
                    setTimeout(function() {
                        var height = $(vd.closest('div')).height() + 300;
                        if (height > 850)
                            $(opts.container).css({
                                "max-height": height + "px",
                                "height": height + "px"
                            });
                        else
                            $(opts.container).css({
                                "max-height": opts.defaultHeight + "px"
                            });
                    }, 250);

                    vd.find("button.close-tab").click(function() {
                        runScrollTo(vd);
                        setupVD(vd, opts.restoreClass, opts.stretchTime, key1.substr(1));
                        vd.children(opts.cardClass).css({
                            "width": "auto",
                            "height": "260px"
                        });
                        $(opts.container).css({
                            "max-height": opts.defaultHeight + "px"
                        });
                        vd.find("button").addClass("hidden");
                        vd.find(opts.shortTextClass).removeClass('hidden');
                        vd.find(opts.longTextClass).addClass('hidden');
                        setTimeout(function() {
                            vd.removeClass('unbinded');
                            opts.array.forEach(function(key2) {
                                if (key1 !== key2)
                                    $(key2).closest('div').fadeIn(opts.fadeTime);
                            });
                        }, 800);
                    });
                }, 1000);
            });
        });

        function runScrollTo($selector) {
            $('html, body').stop().animate({
                scrollTop: $($selector).offset().top - opts.scrollOffset
            }, opts.scrollDuration, 'easeInOutExpo');
        }

        function setupVD($selector, setClass, stretchTime, className) {
            $selector.removeAttr('style').attr('class', setClass).addClass(className + ' unbinded').css({
                "-webkit-transition": "all " + stretchTime + "ms ease",
                "-moz-transition": "all " + stretchTime + "ms ease",
                "-o-transition": "all " + stretchTime + "ms ease",
                "transition": "all " + stretchTime + "ms ease",
            });
        }
    };

    $.fn.tapShow.defaults = {
        array: [],
        container: "", // the outer container that contains the tapShow .div
        scrollDuration: 1000, // to set the scroll to duration
        scrollOffset: 250, // to set where should the scroll to stop at
        stretchTime: 500, // milliseconds - stretch duration for box
        fadeTime: 500, // milliseconds - fade duration for each box
        defaultHeight: 0, // pixel - default height before extend
        extendHeight: 0, // pixel - height to be extend
        setClass: "", // set class after before width extend
        restoreClass: "", // class to be restored after shrinking
        cardClass: "", // card class (for CSS Styling)
        shortTextClass: "",
        longTextClass: ""
    };
}(jQuery));
