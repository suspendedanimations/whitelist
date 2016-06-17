import framework from 'framework'
import config from 'config'
import utils from 'utils'
import create from 'dom-create-element'
import classes from 'dom-classes'
import Default from './default'
import event from 'dom-events'
import $ from 'dom-select'
import Pixi from '../components/pixi'
import Manager from 'slider-manager'

class Home extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'home'
		this.ui = null
		this.prevent = false
	}
	
	init(req, done) {

		// req.previous && req.previous.route.substring(0, 5) === '/work' && req.previous.params && (this.index = req.previous.params.id)
		
		super.init(req, done)
	}
	
	dataAdded(done) {
		
		super.dataAdded()

		this.ui.video.src = `${APP.THEME_URL}/assets/videos/loader-${Math.floor(Math.random()*3)+1}.mp4`
		this.ui.video.load()
		this.ui.video.play()
		
		this.addEvents()
		
		done()
	}

	drawSVGs() {

		const images = [{ align: 'left', src: `${APP.THEME_URL}/assets/images/svg/letter-left.svg` }, { align: 'right', src: `${APP.THEME_URL}/assets/images/svg/letter-right.svg` }]
		const canvas = this.canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		
		canvas.width = config.width
		canvas.height = config.height
		
		canvas.style.position = 'absolute'
		canvas.style.zIndex = '100'

		images.forEach((image, index) => {

			const svg = new Image()
			
			svg.onload = () => {
				
				const sx = images[index].align === 'left' ? 0 : canvas.width - svg.width
		        ctx.drawImage(svg, 0, 0, svg.width, svg.height, sx, 0, svg.width, canvas.height)
			}

			svg.src = images[index].src
		})

		document.body.appendChild(canvas)
	}
	
	addEvents() {
		
		// this.drawSVGs()

		this.canvas = new Pixi({ container: this.ui.mask, image: { width: 1490, height: 1000 } })
		this.canvas.init()
		
		event.on(config.$body, 'mousewheel', this.goWorks)
	}
	
	removeEvents() {

		this.canvas && this.canvas.destroy()
		
		event.off(config.$body, 'mousewheel',  this.goWorks)
	}
	
	goWorks() {
		
		framework.go('/works')
	}
	
	animateIn(req, done) {
		
		const work = req.previous && req.previous.route === `/work/:id`
		
		this.ui.intro.style.display = 'block'
		
		requestAnimationFrame(() => classes.add(this.ui.logo, `animateIn`))
		
		const tl = new TimelineMax({ paused: true, onComplete: () => {

			this.ui.intro.parentNode.removeChild(this.ui.intro)
			done()
		}})
		tl.to(this.ui.container, 1.9, { y: 0, ease: Expo.easeInOut }, 2)
  		tl.to(this.ui.clip, 1.9, { y: 0, ease: Expo.easeInOut }, 2)
  		tl.add(() => classes.add(this.ui.container, `animateIn`), 3)
  		tl.from(this.ui.letter[0], 1, { x: '-100%' }, 3)
  		tl.from(this.ui.letter[1], 1, { x: '100%' }, 3)
  		tl.from(this.ui.infos, 1, { autoAlpha: 0, x: '30%', clearProps: 'all' })
  		tl.from(this.ui.infos.querySelector('span'), 1, { autoAlpha: 0, x: '-10%', clearProps: 'all' }, '-=0.6')
  		tl.staggerFrom(this.ui.social, 1.1, { autoAlpha: 0, y: '60%', clearProps: 'all' }, .09, '-=2')
  		tl.restart()

  		classes.remove(config.$body, 'is-loading')
  		classes.add(config.$body, `is-${this.slug}`) 
	}
	
	animateOut(req, done) {

		classes.add(config.$body, 'is-loading')
		
		const work = req.route && req.route === config.routes.work
		
		classes.remove(config.$body, `is-${this.slug}`)
		classes.remove(this.ui.container, `animateIn`)
		classes.remove(this.ui.logo, `animateIn`)
		
		const tl = new TimelineMax({ paused: true, onComplete: done })
		tl.to(this.ui.letter[0], 1.3, { x: '-100%', ease: Expo.easeInOut }, .15)
  		tl.to(this.ui.letter[1], 1.6, { x: '100%', ease: Expo.easeInOut }, 0)
		tl.to(this.ui.infos, .8, { autoAlpha: 0, x: '30%' }, 0)
  		tl.to(this.ui.infos.querySelector('span'), 1, { autoAlpha: 0, x: '-10%' }, 0)
  		tl.staggerTo(this.ui.social, .9, { autoAlpha: 0, y: '60%' }, -.09, 0)
  		!work && tl.to(this.ui.container, 1.6, { y: '100%', ease: Expo.easeInOut }, .8)
  		!work && tl.to(this.ui.clip, 1.6, { y: '50%', ease: Expo.easeInOut }, .8)
  		work && tl.to(this.ui.clip, 1.6, { y: '-100%', rotationZ: 45, ease: Expo.easeInOut }, .6)
  		tl.restart()
	}
	
	resize(width, height) {
		
		super.resize(width, height)
	}

	debounce() {

		super.debounce()
		
		this.canvas && this.canvas.resize()
	}

	destroy(req, done) {

		super.destroy()
		
		this.removeEvents()
		
		this.page.parentNode.removeChild(this.page)
		
		done()
	}
}

module.exports = Home