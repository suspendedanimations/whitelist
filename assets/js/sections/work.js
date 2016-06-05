import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import event from 'dom-events'
import Default from './default'
import Normal from 'smooth-scrolling'
import Smooth from '../lib/smooth/work'
import player from '../lib/player.min.js'

class Work extends Default {
    
    constructor(opt) {
        
        super(opt);

        this.slug = 'work'
        this.state = false

        this.handlerAll = this.handlerAll.bind(this)
        this.showVideo = this.showVideo.bind(this)
        this.removeVideo = this.removeVideo.bind(this)
    }
    
    init(req, done) {

        super.init(req, done)
    }
    
    dataAdded(done) {
        
        super.dataAdded()

        this.list = utils.js.arrayFrom(this.page.querySelectorAll('ul li'))

        this.splitText()
        this.addEvents()

        this.smooth = new Smooth({
            extends: true,
            section: this.ui.section,
            layer: this.ui.layer,
            viewport: this.ui.viewport
        })

        this.smooth.init()

        this.list.forEach((el) => {
            
            // const id = el.querySelector('a').getAttribute('data-video')
            // const iframe = document.createElement('iframe')
            // const video = player(iframe)
            
            // iframe.style.visibility = 'hidden'
            // iframe.src = `https://player.vimeo.com/video/${id}?autoplay=1&amp;loop=true`
            // iframe.muted = true
            
            // el.appendChild(iframe)
            
            // video.addEvent('ready', () => video.api('setVolume', 0))

            const video = document.createElement('div')
            
            video.style.visibility = 'hidden'
            el.appendChild(video)
        })

        done()
    }

    splitText() {

        this.split = []

        utils.js.arrayFrom(this.ui.split).forEach((el, index) => {

            this.split[this.split.index] = new SplitText(el, { type: el.getAttribute('data-split') })
        })
    }

    addEvents() {

        event.on(this.ui.bind, 'click', this.handlerAll)

        this.list.forEach((el) => event.on(el, 'mouseenter', this.showVideo))
        this.list.forEach((el) => event.on(el, 'mouseleave', this.removeVideo))
    }

    removeEvents() {

        event.off(this.ui.bind, 'click', this.handlerAll)

        this.list.forEach((el) => event.off(el, 'mouseenter', this.showVideo))
        this.list.forEach((el) => event.off(el, 'mouseleave', this.removeVideo))
    }

    handlerAll(e) {

        this.state ? this.closeAll() : this.openAll()
    }

    openAll() {

        this.state = true

        this.scroll = new Normal({
            section: this.ui.scroll
        })

        this.scroll.init()

        classes.add(config.$body, `has-all-open`)

        const tl = new TimelineMax({ paused: true, onComplete: () => this.smooth.removeEvents() })
        tl.to(this.ui.all, 1.8, { autoAlpha: 1, ease: Expo.easeInOut })
        tl.staggerTo(this.list, 1, { y: '0%', autoAlpha: 1 }, .02, .5)
        tl.restart()
    }

    closeAll() {

        this.scroll.destroy()
        this.smooth.addEvents()

        classes.remove(config.$body, `has-all-open`)

        const tl = new TimelineMax({ paused: true, onComplete: () => this.state = false })
        tl.staggerTo(this.list, .8, { autoAlpha: 0 }, .01, 0)
        tl.to(this.ui.all, 1.6, { autoAlpha: 0 })
        tl.restart()
    }

    showVideo(e) {

        const target = e.currentTarget
        const iframe = target.querySelector('div')

        iframe.style.visibility = ''
    }

    removeVideo(e) {

        const iframe = e.currentTarget.querySelector('div')

        iframe.style.visibility = 'hidden'
    }
    
    animateIn(req, done) {

        const home = req.previous && req.previous.route && req.previous.route === (config.routes.default || config.routes.home)
        
        classes.remove(config.$body, 'is-loading')
        classes.add(config.$body, `is-${this.slug}`)
        
        const tl = new TimelineMax({ paused: true, onComplete: () => {
            this.smooth.resize()
            classes.add(this.page, 'has-hover')
            done()
        }})
        tl.set(this.page, { autoAlpha: 1 })
        tl.from(this.ui.letter[0], 2.5, { scale: 1.6, x: '-100%', ease: Expo.easeInOut }, 0)
        tl.staggerFrom(this.ui.stagger, 1.9, { x: '100%', autoAlpha: 0, ease: Expo.easeInOut }, .06, 0)
        tl.to(this.ui.list, 1.8, { y: '-100%', rotationZ: 43, ease: Expo.easeInOut }, 0)
        tl.to(this.ui.bind, 1, { autoAlpha: 1 }, 1)
        tl.restart()
    }

    animateOut(req, done) {
        
        this.state && this.closeAll()
        // this.smooth && this.smooth.scrollTo(this.smooth.vars.bounding/2)

        classes.add(config.$body, 'is-loading')
        classes.remove(config.$body, `is-${this.slug}`)
        classes.remove(this.page, 'has-hover')

        const tl = new TimelineMax({ paused: true, onComplete: done })
        tl.set(this.page, { zIndex: 10 })
        this.smooth && tl.to(this.smooth.vars, 1.8, { target: this.smooth.vars.bounding/2, ease: Expo.easeInOut })
        tl.to(this.ui.letter, 2.5, { scale: 1.6, x: '-100%', ease: Expo.easeInOut }, 0)
        tl.to(this.ui.list, 1.8, { y: '-50%', rotationZ: 0, ease: Expo.easeInOut }, 0)
        tl.to(this.page, 1.1, { y: '100%', ease: Expo.easeInOut }, '-=.8')
        tl.restart()
    }

    resize(width, height) {

        super.resize(width, height)
    }

    destroy(req, done) {

        super.destroy()

        this.removeEvents()

        this.smooth && this.smooth.destroy()
        
        this.page.parentNode.removeChild(this.page)
        
        done()
    }
}

module.exports = Work