import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Smooth from './default'

class Parallax extends Smooth {

    constructor(opt = {}) {

        super(opt)
        
        this.createExtraBound()
        
        this.dom.divs = utils.js.arrayFrom(opt.viewport)
        
        this.threshold = 100
        this.cache = null
    }
    
    createExtraBound() {
        
        ['getCache', 'inViewport']
        .forEach((fn) => this[fn] = this[fn].bind(this))
    }
    
    resize() {
        
        this.getCache()

        super.resize()
    }

    getCache() {
        
        this.cache = []

        this.dom.divs.forEach((el, index) => {

            el.style.transform = ''
            
            const bounding = el.getBoundingClientRect()
            const bounds = {
                el: el,
                top: bounding.top + this.vars.current,
                bottom: bounding.bottom + this.vars.current,
                speed: el.getAttribute('data-speed') || 0
            }

            this.cache[this.cache.length] = bounds
        })
    }

    run() {
        
        this.dom.divs.forEach(this.inViewport)

        super.run()
    }

    inViewport(el, index) {
        
        if(!this.cache || this.resizing) return
        
        const cache = this.cache[index]
        
        const current = this.vars.current
        const transform = current * cache.speed
        const top = Math.round(cache.top - current) + transform
        const bottom = Math.round(cache.bottom - current) - transform
        const inview = bottom > this.threshold * -1 && top < this.vars.height + this.threshold
        const dir = top > 0
        
        inview ? (classes.add(el, 'in-viewport'), classes.remove(el, 'top'), classes.remove(el, 'bottom')) : (classes.remove(el, 'in-viewport'), dir === false ? classes.add(el, 'top') : classes.add(el, 'bottom'))
        
        el.style[this.prefix] = cache.speed != 0 ? this.getTransform(transform) : ''
    }
    
    destroy() {

        super.destroy()
    }
}

export default Parallax