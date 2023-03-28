"use strict";
let H,W,san,{random,sin,cos}=Math,ar=[],a=150;

class Alpha {
    constructor(){
        this.a=random()*7-3.5;
        this.x=0;
        this.y=0;
        this.s=H/1.8
        this.r=.5;    
        this.vr=.005;    
        this.u=false;
        this.va=.001
        a+=.5;
        this.c=a
    }
    draw(){
        this.a+=this.va;
        this.va+=.000002;
        this.s-=.5
        this.x=W/2+cos(this.a)*this.s;
        this.y=H/2+sin(this.a)*this.s;
        this.x++;
        if(this.r<=.2)this.u=true;
        if(this.r>4.5) this.vr=-this.vr;
        this.r+=this.vr;
        san.fillStyle='hsl('+this.c+',100%,50%)'
        san.beginPath();
        san.arc(this.x,this.y,this.r,0,44/7);
        san.closePath();
        san.fill()
    }
}

const Loop=()=>{
    san.fillStyle="rgba(0,0,0,.01)"
    san.fillRect(0,0,W,H);    
    ar.forEach((v,i)=>{
        if(v.u) ar.splice(i,1)
        v.draw();    
    })
    requestAnimationFrame(Loop);    
}
const init=()=>{
    document.body.style.margin=0;
    let c=document.createElement("canvas");
    document.body.appendChild(c);
    c.style.position="fixed"
    c.style.background="black"
    c.style.width="100vw",c.style.height="100vh";
    H=innerHeight*2,W=innerWidth*2;
    c.height=H,c.width=W;
    san=c.getContext('2d');
    //  Increse canvas DPI
    let dh=+getComputedStyle(c).height.slice(0,-2);
    let dw=+getComputedStyle(c).width.slice(0,-2);
    c.setAttribute('height',dh*2);
    c.setAttribute('width',dw*2);   
    setInterval(()=>{
        for(var i=0;i<10;i++) ar.push(new Alpha())    
    },500)    
    Loop();
};
onload=init;