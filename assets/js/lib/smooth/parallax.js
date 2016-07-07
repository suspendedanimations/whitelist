import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Smooth from 'smooth-scrolling'
import sniffer from 'sniffer'

class Parallax extends Smooth {

    constructor(opt = {}) {

        super(opt)
        
        this.createExtraBound()
        
        this.dom.divs = utils.js.arrayFrom(opt.viewport)
        
        this.threshold = 200
        this.cache = null
        this.sniff = sniffer.getInfos()
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

            el.style.opacity = ''
            el.style['pointer-events'] = ''
            el.style[this.prefix] = ''

            this.sniff.isFirefox && classes.add(el, 'in-viewport')
            
            const current = this.vars.target
            const bounding = el.getBoundingClientRect()
            const bounds = {
                el: el,
                top: bounding.top,
                bottom: bounding.bottom
            }
            
            this.cache[this.cache.length] = bounds
        })
    }
      
    run() {
        
        if(!this.cache || this.resizing) return

        this.dom.divs.forEach(this.inViewport)
        
        super.run()
    }

    inViewport(el, index) {
        
        const cache = this.cache[index]
        const current = this.vars.current
        const top = Math.round(cache.top - current)
        const bottom = Math.round(cache.bottom - current)
        const inview = bottom > this.threshold * -1 && top < this.vars.height + this.threshold
        const dir = top > 0

        if(inview) {
            
            el.style.opacity = ''
            el.style['pointer-events'] = ''
            el.style[this.prefix] = `translate3d(0,${(current * -1).toFixed(2)}px,0)`

            classes.add(el, 'in-viewport'), classes.remove(el, 'top'), classes.remove(el, 'bottom')

        } else {

            el.style.opacity = '0'
            el.style['pointer-events'] = 'none'
            el.style[this.prefix] = ''

            classes.remove(el, 'in-viewport'), dir === false ? classes.add(el, 'top') : classes.add(el, 'bottom')
        }
    }
    
    destroy() {

        super.destroy()
    }
}

export default Parallax