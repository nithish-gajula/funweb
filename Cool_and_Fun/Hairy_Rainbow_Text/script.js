(function () {
    var stage, textStage, textCTX, form, input;
    var hair = [], textPixels, textFormed;
    var offsetX, offsetY, text, renderer;
    var hairBitmaps = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/hair.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/hair1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/hair2.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/hair3.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/hair4.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/hair5.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/hair6.png'];
    var _mousePos = { x: 0, y: 0 };

    function init() {
        initStages();
        initText();
        addListeners();
        resize();
        setTimeout(function () {
            createText('CODEPEN');
            animate();
        }, 200);
    }

    // Init Canvas
    function initStages() {
        textStage = document.getElementById("text");
        textStage.width = 700;
        textStage.height = 200;
        textStage.style.left = offsetX + 'px';
        textStage.style.top = offsetY + 'px';
        textCTX = textStage.getContext('2d');
        var rendererOptions = {
            transparent: true,
        }
        stage = new PIXI.Stage(0x66FF99);
        renderer = PIXI.autoDetectRenderer(700, 200, rendererOptions);
        document.getElementById('container').appendChild(renderer.view);
    }


    function initText() {
        textCTX.font = "700 80px 'Montserrat'";
        textCTX.fillStyle = '#555';
        textCTX.fillText("t", 350, 150);
        textCTX.textAlign = 'center';
    }

    function createHair(x, y) {
        var bitmap;
        if (x < 130) bitmap = 0;
        else if (x < 230) bitmap = 1;
        else if (x < 330) bitmap = 2;
        else if (x < 410) bitmap = 3;
        else if (x < 480) bitmap = 4;
        else if (x < 570) bitmap = 5;
        else bitmap = 6;

        var texture = PIXI.Texture.fromImage(hairBitmaps[bitmap]);
        // create a new Sprite using the texture
        var hairBit = new PIXI.Sprite(texture);

        // center the sprites anchor point
        hairBit.anchor.x = 0.1;
        hairBit.anchor.y = 0.1;
        hairBit.width = 30;
        hairBit.height = 30;
        hairBit.targetAngle = 0;
        hairBit.rotation = 0;

        // move the sprite t the center of the screen
        hairBit.position.x = x;
        hairBit.position.y = y;

        stage.addChild(hairBit);
        hair.push(hairBit);
        randomize(hairBit);
    }

    function randomize(bit) {
        bit.targetAngle = (bit.rotationAngle || 0) + (-0.2 + Math.random() * 0.4);
        setTimeout(function () {
            randomize(bit);
        }, 100 + Math.random() * 200);
    }

    // animating circles
    function animate() {
        var l = hair.length;
        for (var i = 0; i < l; i++) {
            hair[i].rotationAngle = Math.atan2(hair[i].position.y - _mousePos.y, hair[i].position.x - _mousePos.x);
            hair[i].rotation += (hair[i].targetAngle - hair[i].rotation) * 0.05;
        }

        renderer.render(stage);
        requestAnimationFrame(animate);
    }

    function formText() {
        for (var i = 0, l = textPixels.length; i < l; i++) {
            createHair(textPixels[i].x, textPixels[i].y)
        }
        textFormed = true;

    }


    // event handlers
    function addListeners() {
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', function (e) {
            _mousePos.x = e.pageX - offsetX;
            _mousePos.y = e.pageY - offsetY;
        })
    }

    function resize() {
        offsetX = (window.innerWidth - 700) / 2;
        offsetY = 20;
        textStage.style.left = offsetX + 'px';
        textStage.style.top = offsetY + 'px';
    }

    function createText(t) {
        var fontSize = 840 / (t.length);

        if (fontSize > 160) fontSize = 160;
        textCTX.clearRect(0, 0, 700, 200);
        textCTX.font = "400 " + fontSize + "px 'Montserrat'";
        textCTX.textAlign = 'center';
        textCTX.textBaseline = 'top';
        textCTX.fillText(t, 350, (172 - fontSize) / 2);

        var ctx = document.getElementById('text').getContext('2d');
        var pix = ctx.getImageData(0, 0, 700, 200).data;
        textPixels = [];
        for (var i = pix.length; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                var x = (i / 4) % 700;
                var y = Math.floor(Math.floor(i / 700) / 4);

                if ((x && x % 4 == 0) && (y && y % 4 == 0)) textPixels.push({ x: x, y: y });
            }
        }

        formText();

    }

    window.onload = function () { init() };
})();