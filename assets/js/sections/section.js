import framework from 'framework'
import config from 'config'
import utils from 'utils'
import gsap from 'gsap';
import classes from 'dom-classes';
import Default from './default';
import event from 'dom-events'
import create from 'dom-create-element'
import player from '../lib/player.min.js'
import Smooth from '../lib/smooth/single'

class Section extends Default {
	
    constructor(opt) {

        super(opt)

        this.slug = 'section'
        this.state = { open: false }
        
        this.showInfos = this.showInfos.bind(this)
        this.hideInfos = this.hideInfos.bind(this)
        this.moveClose = this.moveClose.bind(this)
    }

    init(req, done) {

        this.prevRoute = req.previous ? req.previous.route : '/'

        super.init(req, done)
    }
	
    dataAdded(done) {

        super.dataAdded()

        this.video = player(this.ui.frame)

        this.scroll = new Smooth({
            extends: true,
            section: this.ui.scroll,
            ease: .1
        })

        this.scroll.init()
        this.scroll.off()

        this.addEvents()

        done()
    }

    addEvents() {

        event.on(this.ui.infos, 'click', this.showInfos)
    }

    removeEvents() {

        event.off(this.ui.infos, 'click', this.showInfos)
    }

    setState() {

        this.state.open = !this.state.open
    }

    showInfos(e) {
        
        if(this.state.open) return

        this.video.api('pause')

        this.page.style.cursor = 'pointer'
        this.ui.worknav.style.opacity = 0
        this.ui.worknav.style['pointer-events'] = 'none'

        event.on(this.page, 'click', this.hideInfos)
        event.on(this.page, 'mousemove', this.moveClose)

        const tl = new TimelineMax({ paused: true, onComplete: this.setState, onCompleteScope: this })
        tl.set(this.ui.close, { x: config.width/2, y: config.height/2 })
        tl.to(this.ui.layer, 1, { autoAlpha: 1 }, 0)
        tl.to(this.ui.video, 1.2, { scale: .85, ease: Expo.easeOut }, 0)
        // tl.to(this.ui.close, 1, { autoAlpha: 1 }, 1)
        tl.restart()

        this.scroll.on()
    }

    hideInfos(e) {

        const prevent = e.target.nodeName === 'A' && e.target.getAttribute('target') === '_blank'
        
        if(!this.state.open || prevent) return

        this.video.api('play')

        this.page.style.cursor = ''
        this.ui.worknav.style.opacity = 1
        this.ui.worknav.style['pointer-events'] = ''

        event.off(this.page, 'click', this.hideInfos)
        event.off(this.page, 'mousemove', this.moveClose)

        TweenMax.killTweensOf(this.ui.close)
        
        const tl = new TimelineMax({ paused: true, onComplete: this.setState, onCompleteScope: this })
        tl.to(this.ui.close, 1, { autoAlpha: 0 }, 0)
        tl.to(this.ui.layer, 1, { autoAlpha: 0 }, 0)
        tl.to(this.ui.video, 1.3, { scale: 1, ease: Expo.easeInOut }, 0)
        tl.restart()

        this.scroll.off()
    }

    moveClose(e) {

        TweenLite.to(this.ui.close, 2, { autoAlpha: 1, delay: 1 })
        TweenLite.to(this.ui.close, .6, { x: e.clientX + 15, y: e.clientY })
    }
    
    animateIn(req, done) {

        const home = req.previous && req.previous.route === (config.routes.default || config.routes.home)
        const works = req.previous && req.previous.route === config.routes.work
          
        classes.add(config.$body, `is-${this.slug}`)
		
        const tl = new TimelineMax({ paused: true, onComplete: done })
        tl.from(this.page, 2, { autoAlpha: 0, ease: Expo.easeInOut })
        tl.to(this.ui.video, 5, { scale: 1, autoAlpha: 1, ease: Expo.easeInOut }, 0)
        tl.restart()
    }
    
	animateOut(req, done) {

        classes.add(config.$body, 'is-loading')
        classes.remove(config.$body, `is-${this.slug}`)

        this.page.style.zIndex = '10'
        
        const home = req.route === (config.routes.default || config.routes.home)
        const work = req.route === config.routes.work

        const tl = new TimelineMax({ paused: true, onComplete: done }) 
        tl.to(this.page, 1.2, { autoAlpha: 0, ease: Expo.easeInOut })
        tl.restart()
    }

    resize(width, height) {

        super.resize(width, height)
    }

    debounce() {}
    
    destroy(req, done) {

        super.destroy()

        this.removeEvents()

        this.scroll.destroy()

        this.page.parentNode.removeChild(this.page)

        done()
	}
}

module.exports = Section