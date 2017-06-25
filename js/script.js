"use strict";

document.addEventListener('DOMContentLoaded', function(event) {
    // example 1
    tapShow({
        target: '.tapShow.example1'
    });



    // example 2
    tapShow({
        target: '.tapShow.example2'
    });



    // example 3
    tapShow({
        target: '.tapShow.example3',
        displayOne: true
    });



    // example 4
    var example4 = tapShow({
        target: '.tapShow.example4'
    });
    var btnBuild = document.querySelector(".btn-control.build"),
        btnDestroy = document.querySelector(".btn-control.destroy"),
        btnRebuild = document.querySelector(".btn-control.rebuild"),
        alignLeft = document.querySelector(".btn-control.alignLeft"),
        alignCenter = document.querySelector(".btn-control.alignCenter"),
        alignRight = document.querySelector(".btn-control.alignRight"),
        expandBlock = document.querySelector(".btn-control.expandBlock"),
        collapseBlock = document.querySelector(".btn-control.collapseBlock"),
        addBlock = document.querySelector(".btn-control.addBlock"),
        removeBlock = document.querySelector(".btn-control.removeBlock");
    btnBuild.addEventListener("click", function() {
        example4.build();
    });
    btnDestroy.addEventListener("click", function() {
        example4.destroy();
    });
    btnRebuild.addEventListener("click", function() {
        example4.rebuild();
    });
    alignLeft.addEventListener("click", function() {
        example4.alignLeft();
    });
    alignCenter.addEventListener("click", function() {
        example4.alignCenter();
    });
    alignRight.addEventListener("click", function() {
        example4.alignRight();
    });
    expandBlock.addEventListener("click", function() {
        example4.expandBlock();
    });
    collapseBlock.addEventListener("click", function() {
        example4.collapseBlock();
    });
    addBlock.addEventListener("click", function() {
        example4.addBlock({
            outerContent: "<p>New Block</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.<br><br><strong>Click me for more info</strong></p>",
            innerContent: "<p>I am a new Block!</p><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras ornare arcu dui vivamus arcu felis bibendum ut. Orci sagittis eu volutpat odio facilisis mauris. Eu nisl nunc mi ipsum faucibus. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Parturient montes nascetur ridiculus mus. Donec massa sapien faucibus et molestie ac. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Pulvinar etiam non quam lacus suspendisse faucibus. Sit amet massa vitae tortor. Magna sit amet purus gravida quis blandit turpis cursus. Feugiat in ante metus dictum at tempor. Sodales ut eu sem integer vitae justo eget magna. Risus nullam eget felis eget. Tristique risus nec feugiat in fermentum posuere. Neque sodales ut etiam sit amet nisl purus in mollis. Ullamcorper eget nulla facilisi etiam. Est placerat in egestas erat imperdiet sed euismod nisi. Laoreet non curabitur gravida arcu ac tortor. Tempus quam pellentesque nec nam aliquam sem et tortor. Suspendisse sed nisi lacus sed viverra. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Diam sollicitudin tempor id eu. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Ipsum consequat nisl vel pretium lectus. Nulla at volutpat diam ut venenatis tellus. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Commodo odio aenean sed adipiscing diam. Justo donec enim diam vulputate ut pharetra. Suspendisse faucibus interdum posuere lorem ipsum dolor. Ultrices tincidunt arcu non sodales neque sodales ut etiam sit. Orci sagittis eu volutpat odio facilisis. Elit at imperdiet dui accumsan. Risus viverra adipiscing at in. Tempus egestas sed sed risus pretium. Odio tempor orci dapibus ultrices in iaculis nunc. Duis tristique sollicitudin nibh sit. Consectetur adipiscing elit pellentesque habitant morbi. Cursus risus at ultrices mi tempus imperdiet nulla malesuada. Aliquam vestibulum morbi blandit cursus risus at.</p>"
        });
    });
    removeBlock.addEventListener("click", function() {
        example4.removeBlock();
    });



    // example 5
    tapShow({
        target: '.tapShow.example5',
        showStart: function() {
            alert("I'm going to show my content!")
        },
        showEnd: function() {
            alert("My content have been shown!")
        },
        hideStart: function() {
            alert("I'm going to hide my content!")
        },
        hideEnd: function() {
            alert("My content have been hide!")
        }
    });



    // example 6
    tapShow({
        target: '.tapShow.example6',
        blockExpand: function() {
            alert("I'm Expanded!")
        },
        blockCollapse: function() {
            alert("I'm Collapsed!")
        }
    });



    // example 7
    tapShow({
        target: '.tapShow.example7',
        customCSS: {
            '.block': 'color: #333;', // this will apply to all blocks
            '.block-green': 'background: #99ffcc;',
            '.block-red': 'background: #ff9999;',
            '.block-yellow': 'background: #ffffb3;',
            '.block-blue': 'background: #99ccff;'
        }
    });



    // example 8
    tapShow({
        target: '.tapShow.example8',
        displayOne: true,
        expandWidth: '55%',
        blockWidth: '250px',
        blockHeight: '250px',
        customCSS: {
            ".inner-content": "width: 100%;"
        }
    });



    // example 9
    tapShow({
        target: '.tapShow.example9'
    });



    /* Coding Blocks */
    // init block codes
    hljs.initHighlightingOnLoad();
    var target = '.btn-code.example',
        codesConfig = {
            blockWidth: '110px',
            blockPosition: 'left',
            background: '#f2f2f2',
            expandWidth: '100%',
            blockPadding: '0',
            customCSS: {
                ".block": "font-family: 'Prompt', sans-serif; border: 1px solid #111; border-radius: 10px; font-size: 14px; margin-left: 20px;",
                ".outer-content": "padding: 9px 1px;",
                ".inner-content": "padding: 15px 20px; width: 95%;"
            }
        };

    for (var i = 1; i < 10; i++) {
        codesConfig.target = target + i;
        tapShow(codesConfig);
    }
    
});
