// Created by lolo 

const PI = Math.PI
const colorStruc = '#27608a'
let c, ctx, W, H
let dots = [], lines = []

const checkBoxes = () => rangeVal.value / 300;

const util = {
	circle(x, y, r, colorFill, colorStroke, fill, stroke, lineWidth = 1) {
		ctx.beginPath()
		ctx.fillStyle = colorFill
		ctx.strokeStyle = colorStroke
		ctx.lineWidth = lineWidth
		ctx.arc(x, y, r, 0, 2 * Math.PI)
		if (fill) ctx.fill()
		if (stroke) ctx.stroke()
		ctx.closePath()
	},
	line(x0, y0, x1, y1, color, lineWidth = 1) {
		ctx.beginPath()
		ctx.strokeStyle = color
		ctx.lineWidth = lineWidth
		ctx.moveTo(x0, y0)
		ctx.lineTo(x1, y1)
		ctx.stroke()
		ctx.closePath()
	}
};

class Dot {
	constructor(r, a, color) {
		this.r = r
		this.a = a
		this.color = color
	}
	draw() {
		util.circle(this.x, this.y, 2, this.color, '', true, false)
	}
	update() {
		this.a += checkBoxes()
		this.x = W / 2 + this.r * Math.cos(this.a)
		this.y = H / 2 + this.r * Math.sin(this.a)
		this.draw()
	}
}

class Line {
	constructor(r0, r1, a, color, linewidth = 1, colorH) {
		this.r0 = r0
		this.r1 = r1
		this.a = a
		this.color = color
		this.lineWidth = linewidth
		this.colorH = colorH
	}
	home() {
		ctx.beginPath()
		ctx.fillStyle = '#b0f7ff'
		ctx.strokeStyle = 'black'
		ctx.lineWidth = 1.5
		ctx.rect(this.x0 - 13, this.y0 + 15, 27, 18);
		ctx.stroke()
		ctx.fill()
		ctx.closePath()

		ctx.beginPath()
		ctx.fillStyle = this.colorH
		ctx.moveTo(this.x0, this.y0)
		ctx.lineTo(this.x0 - 20, this.y0 + 15)
		ctx.lineTo(this.x0 + 20, this.y0 + 15)
		ctx.lineTo(this.x0, this.y0)
		ctx.fill()
		ctx.closePath()

		ctx.beginPath()
		ctx.fillStyle = this.colorH
		ctx.rect(this.x0 - 17, this.y0 + 25, 34, 10);
		ctx.fill()
		ctx.closePath()
	}
	draw() {
		util.line(this.x0, this.y0, this.x1, this.y1, this.color, this.lineWidth)
		util.line(this.x0, this.y0, this.x2, this.y2, colorStruc, this.lineWidth)
		util.line(this.x0, this.y0, this.x3, this.y3, colorStruc, this.lineWidth)
		util.line(this.x0, this.y0, this.x4, this.y4, colorStruc, this.lineWidth)
		util.line(this.x0, this.y0, this.x5, this.y5, colorStruc, this.lineWidth)
		this.home()
	}
	update() {
		this.a += checkBoxes()
		this.x0 = W / 2 + this.r0 * Math.cos(this.a)
		this.y0 = H / 2 + this.r0 * Math.sin(this.a)
		this.x1 = W / 2
		this.y1 = H / 2
		this.x2 = W / 2 + this.r1 * Math.cos(this.a + 0.4)
		this.y2 = H / 2 + this.r1 * Math.sin(this.a + 0.4)
		this.x3 = W / 2 + this.r1 * Math.cos(this.a - 0.4)
		this.y3 = H / 2 + this.r1 * Math.sin(this.a - 0.4)
		this.x4 = W / 2 + 130 * Math.cos(this.a - 0.25)
		this.y4 = H / 2 + 130 * Math.sin(this.a - 0.25)
		this.x5 = W / 2 + 130 * Math.cos(this.a + 0.25)
		this.y5 = H / 2 + 130 * Math.sin(this.a + 0.25)
		this.draw()
	}
}

const createDots = () => {
	const dec0 = PI / 10
	const dec1 = PI / 7
	const colorD = ['#fff945', 'white']
	const colorH = ['#cf8804', '#c90018']
	let s = 0
	for (let i = 0; i < PI * 2; i += dec0) {
		dots.push(new Dot(150, i, colorD[s]))
		dots.push(new Dot(90, i + 0.15, colorD[s]))
		s == colorD.length - 1 ? s = 0 : s++
	}
	s = 0
	for (let j = 0; j < PI * 2; j += dec1) {
		lines.push(new Line(150, 10, j, '#db0f24', 1, colorH[s]))
		s == colorH.length - 1 ? s = 0 : s++
	}
}

const updateDots = () => {
	util.circle(W / 2, H / 2, 150, '', colorStruc, false, true, 6)
	util.circle(W / 2, H / 2, 90, '', colorStruc, false, true, 6)
	util.circle(W / 2, H / 2, 50, '', colorStruc, false, true, 4)
	util.circle(W / 2, H / 2, 130, '', colorStruc, false, true, 2)
	dots.map(x => x.update())
	lines.map(x => x.update())
	util.line(W / 2, H / 2, W / 2 - 100, H / 2 + 200, colorStruc, 8)
	util.line(W / 2, H / 2, W / 2 + 100, H / 2 + 200, colorStruc, 8)
	util.line(W / 2 + 80, H / 2 + 200, W / 2 + 120, H / 2 + 200, colorStruc, 8)
	util.line(W / 2 - 80, H / 2 + 200, W / 2 - 120, H / 2 + 200, colorStruc, 8)
	util.circle(W / 2, H / 2, 15, colorStruc, 'black', true, true, 0.5)
	util.circle(W / 2, H / 2, 5, '#db0f24', '', true, false)
}

const animate = () => {
	ctx.clearRect(0, 0, W, H)
	updateDots()
	requestAnimationFrame(animate)
};

const init = () => {
	canvas.width = W = innerWidth
	canvas.height = H = innerHeight
	ctx = canvas.getContext("2d")
	createDots()
	requestAnimationFrame(animate)
}

window.onload = init