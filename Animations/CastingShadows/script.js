let canvas, ctx, w, h
let light = {x:null,y:null}
let blocks = []

class Block{
    constructor(x,y,size){
        this.x = x
        this.y = y
        this.size = size
        this.points = []
        this.points.push([x-this.size/2,y-this.size/2])
        this.points.push([x+this.size/2,y-this.size/2])
        this.points.push([x+this.size/2,y+this.size/2])
        this.points.push([x-this.size/2,y+this.size/2])
        this.dx = 0
        this.dy = 0
        this.da = Math.random()/100
    }
    rotate(){
        for(let p of this.points){
            const a = this.da
            p[0] = Math.cos(a)*(p[0]-this.x)-Math.sin(a)*(p[1]-this.y)
            p[0] += this.x
            p[1] = Math.sin(a)*(p[0]-this.x)+Math.cos(a)*(p[1]-this.y)
            p[1] += this.y
        }
    }
    update(){
        this.x += this.dx
        this.y += this.dy
        for(let p of this.points){
            p[0] += this.dx
            p[1] += this.dy
        }
//        if(this.x >= w || this.x<=0) this.dx*=-1
//        if(this.y >= h || this.y<=0) this.dy*=-1
        this.ddx = (this.x -light.x)*0.0001
        this.ddy = (this.y -light.y)*0.0001
        this.dx -= this.ddx
        this.dy -= this.ddy
        this.rotate()
    }
    drawShadows(){
        for(let i=0;i<4;++i){
            const a = this.points[i]
            const b = (i==3)? this.points[0]
                            : this.points[i+1]
            const angleA = Math.atan2(a[1]-light.y,a[0]-light.x)
            const angleB = Math.atan2(b[1]-light.y,b[0]-light.x)            
            const d = 1000            
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            ctx.beginPath()
            ctx.moveTo(...b)
            ctx.lineTo(...a)
            ctx.lineTo(Math.cos(angleA)*d+a[0], Math.sin(angleA)*d+a[1])
            ctx.lineTo(Math.cos(angleB)*d+b[0], Math.sin(angleB)*d+b[1])
            ctx.closePath()
            ctx.fill()
        }
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.moveTo(...this.points[0])
        ctx.lineTo(...this.points[1])
        ctx.lineTo(...this.points[2])
        ctx.lineTo(...this.points[3])
        ctx.closePath()
        ctx.fill()
    }
}

const drawLight = () => {
    const gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, w);
    gradient.addColorStop(0, "#999");
    gradient.addColorStop(1, "#000");
    ctx.fillStyle = gradient;
    ctx.beginPath()
    ctx.arc(light.x,light.y,w*2,0,Math.PI*2)
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(light.x,light.y,w/15,0,Math.PI*2)
    ctx.fill()
}

const loop = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,w,h)
    drawLight()
    for(let b of blocks) b.drawShadows()
    for(let b of blocks) b.update()
    requestAnimationFrame(loop)
}

const touchStart = (e)=>{
    e.preventDefault()
    const x = e.touches[0].clientX
    const y = e.touches[0].clientY
    light.x = x
    light.y = y
}

const start = () => {
    canvas = document.querySelector("canvas")
    canvas.width = w = innerWidth
    canvas.height = h = innerHeight
    ctx = canvas.getContext("2d")
    light = {x:w/2,y:h/2}
    canvas.addEventListener("touchstart",touchStart)
    canvas.addEventListener("touchmove",touchStart)
    for(let i=30;--i;)
    blocks.push(new Block(Math.random()*w,Math.random()*h,Math.random()*30+1))
    loop()
}

onload = start