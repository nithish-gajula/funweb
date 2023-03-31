var w = window.innerWidth;
var h = window.innerHeight;
var curntMscC = 0;
var curntSong;
var mnOn = false, lpCnt = false, mnBOn = false, raindrops, rainStrength = 1;
var switches = true;
var musics = [
    { aud: new Audio('https://www.dropbox.com/s/rory91slxo0dags/Lost-Sky-feat.-Jex-Where-We-Started-%5BNCS-Release%5D.mp3?raw=1'), name: 'Where We Started [NCS Release]' },
    { aud: new Audio('https://www.dropbox.com/s/lzk52lclkq63lpr/Medicine-%28Sound-Remedy-Remix%29.mp3?raw=1'), name: 'Daughter - Medicine (Sound Remedy Remix)' },
    { aud: new Audio('Heat_Waves.mp3'), name: 'Heat Waves [Glass Animals]' }

];
//Daughter medicine from
//https://www.toneden.io/foxster-2/post/daughter-medicine-sound-remedy-remix-mp3
window.onload = function () {
    app = document.querySelector(".app");
    cn = document.querySelector(".cn")
    wn = document.querySelector(".window");
    bg = document.querySelector(".bg");
    mn = document.querySelector(".menu");
    mnB = document.querySelector(".mnBtn");
    anm = document.querySelectorAll(".anm");
    gd = document.querySelector(".glassDrops");
    tfc = document.querySelector(".traffic");
    tp1 = document.querySelector('.togglePath1');
    tp2 = document.querySelector('.togglePath2');
    sl = document.querySelectorAll('.slider');
    sp = document.querySelectorAll('.slidePath');
    sv = document.querySelectorAll('.slideVal');
    ml = document.querySelector('.mscSl');
    mc = document.querySelector('.mscCnt');
    mp = document.querySelector('.mscPath');
    ms = document.querySelector('.mscSldr');
    cnv = document.querySelector(".cnv");
    ctx = cnv.getContext("2d");
    cW = cnv.offsetWidth;
    cH = cnv.offsetHeight;


    mp.setAttribute('d', `M 5 15 H 10 C 16 15 15 20 20 20 A 2 2 90 0 0 20 10 M ${ml.offsetWidth - 5} 15 H 40 C 33 15 32.5 28 20 28 A 2 2 90 0 1 20 24 A 2 2 90 0 0 20 6`);
    msMax = ml.offsetWidth - 30;
    ms.setAttribute('max', msMax);
    app.addEventListener("mousedown", showBtn, false);
    sfx = new Audio("https://www.dropbox.com/s/34m6j3cqed1ptkg/rain.mp3?raw=1");
    mc.innerText = curntMscC + 1 + '/' + musics.length;
    for (var i = 1; i < anm.length; i++) {
        anm[i].style.animationPlayState = "running";
    }
    sfx.loop = true;
    sfx.load();
    sfx.volume = 0.3;
    sfx.addEventListener("playing", function () {
        anm[0].style.animationPlayState = "running";
    });
    sfx.addEventListener("pause", function () {
        anm[0].style.animationPlayState = "paused";
    });
    setInterval(function () {
        createLights("lightM", "light", "lftM", "lft", "35px");
        createLights("lightM", "light", "rhtM", "rht", "0");
        rn = Math.floor(Math.random() * 500) + 250;
        setTimeout(function () {
            rl = Math.floor(Math.random() * 12) + 40;
            rr = Math.floor(Math.random() * 17);
            createLights("lightM", "light", "lftM", "lft", rl + "px");
            createLights("lightM", "light", "rhtM", "rht", rr + "px");
        }, rn);
    }, 1000);
    document.querySelector('.ldr').style.display = "none";
    musicPlayer();
    //code from codepen started🌟🌟
    //Copyright (c) 2021 by Sidney Douw (https://codepen.io/SidneyD/pen/MYbzPj)
    init();
}
function Raindrops() {
    this.x;
    this.y;
    this.s;
    this.width;
    this.height;
    this.drops = [];
}
Raindrops.prototype.addDrop = function () {
    this.x = (Math.random() * cW) - 10;
    this.y = -10;
    this.s = (Math.random() * 4) + 2;
    this.drops.push({
        x: this.x,
        y: this.y,
        velY: 2,
        width: this.s / 2,
        height: this.s * 1,
        speed: this.s
    });
};
Raindrops.prototype.render = function () {
    for (var i = 0; i < rainStrength; i++) {
        this.addDrop();
    };
    ctx.save();
    ctx.clearRect(0, 0, cW, cH);
    ctx.fillStyle = '#d1d199aa';
    for (var i = 0; i < this.drops.length; i++) {
        var drop = this.drops[i];
        ctx.fillRect(drop.x, drop.y, drop.width, drop.height);
        drop.y += drop.speed * 2;
        drop.x += 0.7;
        if (drop.y + drop.height > cH) {
            this.drops.splice(i, 1);
        }
    };
    ctx.restore();
};
function init() {
    raindrops = new Raindrops();
    loop();
}
function render() {
    raindrops.render();
}
function loop() {
    requestAnimationFrame(loop);
    render();
}
//code from codepen ended🌟🌟
function musicPlayer() {
    curntSong = musics[curntMscC].aud;
    curntSong.volume = 0.6;
    document.querySelector('.mscName').innerText = musics[curntMscC].name;
    if (lpCnt == 1) {
        curntSong.loop = true;
    }
    else {
        curntSong.loop = false;
    }
    curntSong.addEventListener("playing", function () {
        var crntDur = curntSong.duration;
        var s = parseInt(crntDur % 60);
        if (s < 10) { s = '0' + s; }
        var m = parseInt((crntDur / 60) % 60);
        document.querySelector('.ppBtn span').innerText = 'pause';
        document.querySelector('.mscDr').innerText = m + '.' + s;
    });
    curntSong.addEventListener("timeupdate", function () {
        var crntDur = curntSong.duration;
        var crntTim = curntSong.currentTime;
        var crntDiv = crntDur / (msMax - 20);
        var v = crntTim / crntDiv;
        var s = parseInt(crntTim % 60);
        if (s < 10) { s = '0' + s; }
        var m = parseInt((crntTim / 60) % 60);
        document.querySelector('.mscCT').innerText = m + '.' + s;
        setSlVlu(v + 20);
        ms.value = v + 20;
    }, false);
    curntSong.addEventListener("pause", function () {
        document.querySelector('.ppBtn span').innerText = 'play_arrow';
    });
}
function createLights(a, b, c, d, e) {
    var i = document.createElement("div");
    var j = document.createElement("div");
    i.className = a;
    j.className = b;
    i.style.top = e;
    i.classList.add(c);
    j.classList.add(d);
    i.appendChild(j);
    tfc.appendChild(i);
    setTimeout(function () {
        j.remove();
        i.remove();
    }, 10000);
}
function showBtn(e) {
    if (e.target === cn) {
        if (!mnBOn) {
            mnBOn = true;
            mnB.style.visibility = 'visible';
            mnB.style.opacity = 1;
            btnTimout = setTimeout(function () {
                mnBOn = false;
                mnB.style.visibility = 'hidden';
                mnB.style.opacity = 0;
            }, 3000);
        }
        else {
            mnBOn = false;
            mnB.style.visibility = 'hidden';
            mnB.style.opacity = 0;
            clearTimeout(btnTimout);
        }
    }
}
function mnBtnF() {
    if (!mnOn) {
        mnOn = true;
        if (switches[1]) {
            wn.style.backdropFilter = "none";
            wn.style.transform = "translate(-50%, -50%) scale(1.02)";
            bg.style.transform = "translate(-50%, -50%) scale(1.12)";
        }
        mn.style.opacity = 1;
        mn.style.visibility = 'visible';
        clearTimeout(btnTimout);
    }
    else {
        mnOn = false;
        if (switches[1]) {
            wn.style.transform = "translate(-50%, -50%) scale(1)";
            wn.style.backdropFilter = "blur(2px) brightness(1.1)";
            bg.style.transform = "translate(-50%, -50%) scale(1)";
        }
        mn.style.opacity = 0;
        mn.style.visibility = 'hidden';
        btnTimout = setTimeout(function () {
            mnBOn = false;
            mnB.style.visibility = 'hidden';
            mnB.style.opacity = 0;
        }, 3000);
    }
}
function toggleF() {
    tgF0();
    if (!switches) {
        switches = true;
        tp1.setAttribute("d", "M 5 15 C 5 20 9 25 15 25 C 20 25 20 25 25 25 C 29 25 30 27.5 35 27.5 C 41 27.5 47.5 22.75 47.5 15 C 47.5 7.25 41 2.5 35 2.5 C 30 2.5 29 5 25 5 C 20 5 20 5 15 5 C 9 5 5 10 5 15");
        tp2.setAttribute('d', 'M 35 7.5 A 1 1 0 0 0 35 22.5 A 1 1 0 0 0 35 7.5');
        tp2.style.stroke = '#62bf66';
    }
    else {
        switches = false;
        tp1.setAttribute('d', 'M 2.5 15 C 2.5 22.75 9 27.5 15 27.5 C 20 27.5 21 25 25 25 C 30 25 30 25 35 25 C 41 25 45 20 45 15 C 45 10 41 5 35 5 C 29 5 29 5 25 5 C 21 5 20 2.5 15 2.5 C 9 2.5 2.5 7.25 2.5 15');
        tp2.setAttribute('d', 'M 15 7.5 A 1 1 0 0 0 15 22.5 A 1 1 0 0 0 15 7.5');
        tp2.style.stroke = '#bb667b';
    }
}
function tgF0() {
    if (!switches) {
        wn.style.backdropFilter = "blur(2px) brightness(1.1)";
        mn.style.backdropFilter = "blur(5px) brightness(1.3)";
        wn.style.transform = "translate(-50%, -50%) scale(1.02)";
        bg.style.transform = "translate(-50%, -50%) scale(1.12)";
    } else {
        wn.style.backdropFilter = "none";
        mn.style.backdropFilter = "none";
        wn.style.transform = "translate(-50%, -50%) scale(1)";
        bg.style.transform = "translate(-50%, -50%) scale(1)";

    }
}
function slideF(vl) {
    var v = parseInt(sl[vl].value);
    sv[vl].innerText = (Math.floor(v * 0.59) - 9) + 1;
    sp[vl].setAttribute('d', `M 195 15 H ${v + 7.5} M 5 15 H ${v - 7.5} A 1 1 0 0 0 ${v + 7.5} 15 A 2 2 90 0 0 ${v - 7.5} 15`);
    switch (vl) {
        case 1:
            slF1(vl);
            break;
        case 2:
            slF1(vl);
            break;
    }
}
function rnQnF() {
    var ints = Math.round(parseInt(sl[0].value) * 0.0535714286);
    rainStrength = ints
}
function slF1(v) {
    var ints = ((parseInt(sl[v].value) * 0.006) - 0.1).toFixed(2);
    sv[v].innerText = (ints * 10).toFixed(2);
    if (v == 1) {
        sfx.volume = ints;
    }
    else {
        curntSong.volume = ints;
    }
}
function mscSlF() {
    var v = parseInt(ms.value);
    var crntDur = curntSong.duration;
    var crntDiv = crntDur / msMax;
    curntSong.currentTime = v * crntDiv;
    setSlVlu(v);
}
function setSlVlu(v) {
    mp.setAttribute('d', `M 5 15 H ${v - 10} C ${v - 4} 15 ${v - 5} 20 ${v} 20 A 2 2 90 0 0 ${v} 10 M ${ml.offsetWidth - 5} 15 H ${v + 20} C ${v + 13} 15 ${v + 12.5} 28 ${v} 28 A 2 2 90 0 1 ${v} 24 A 2 2 90 0 0 ${v} 6`);
}
function ppF() {
    if (curntSong.paused) {
        curntSong.play();
    }
    else {
        curntSong.pause();
    }
}
function pvF() {
    if (curntSong.currentTime < 10) {
        if (curntMscC === 0) {
            curntMscC = musics.length - 1;
        }
        else {
            curntMscC--;
        }
        curntSong.pause();
        curntSong.currentTime = 0;
        musicPlayer();
        curntSong.play();
        mc.innerText = curntMscC + 1 + '/' + musics.length;
    }
    else {
        curntSong.currentTime = 0;
    }
}
function nxF() {
    if (curntMscC === musics.length - 1) {
        curntMscC = 0;
    }
    else {
        curntMscC++;
    }
    curntSong.pause();
    curntSong.currentTime = 0;
    musicPlayer();
    curntSong.play();
    mc.innerText = curntMscC + 1 + '/' + musics.length;
}
function lpF() {
    if (!lpCnt) {
        lpCnt = true;
        document.querySelector('.lpBtn span').innerText = 'repeat_one';
        curntSong.loop = true;
    }
    else {
        lpCnt = false;
        document.querySelector('.lpBtn span').innerText = 'repeat';
        curntSong.loop = false;
    }
}
function clsF() {
    document.querySelector('.alrt').style.display = 'none';
    if (sfx.paused) {
        sfx.play();
    }
    if (curntSong.paused) {
        curntSong.play();
    }
}