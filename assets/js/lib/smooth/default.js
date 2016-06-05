import Smooth from 'smooth-scrolling'
import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import performance from 'performance-now'
import _ from 'underscore'

class Default extends Smooth {
    
    constructor(opt) {

        super(opt)
                
        this.perfs = {
            start: null,
            end: null,
            frame: 16.6
        }

        this.rAF = undefined

        this.vars.lastY = 0
        
        this.dom.section = opt.section
        
        this.lock = this.lock.bind(this)
        this.unlock = this.unlock.bind(this)
    }
    
    init() {

        super.init()
        
        this.vars.native === false && (config.$body.style.overflow = 'hidden')
    }

    resize() {
        
        this.resizing = true
        
        super.resize()

        this.vars.bounding = this.dom.section.getBoundingClientRect().height - (this.vars.native ? 0 : config.height)
        
        this.resizing = false
    }
    
    unlock() {

        classes.remove(config.$body, 'smooth-lock')
        
        this.scrollTo(this.vars.lastY)
        
        super.on()
    }

    lock() {
        
        super.off()
        
        classes.add(config.$body, 'smooth-lock')
        
        this.vars.lastY = Math.abs(this.vars.target.toFixed())
    }

    run() {
        
        // this.perfs.start = performance()
        
        super.run()
        
        this.transform = this.vars.target.toFixed(2) != this.vars.current.toFixed(2)
        this.willchange = this.transform ? 'will-change: transform;' : ''
        
        this.dom.section.style.cssText = `${this.prefix}: ${this.getTransform(-this.vars.current.toFixed(2))}; ${this.willchange}`
        
        // if(this.perfs.start - this.perfs.end < this.perfs.frame) {
            
        // }
        
        // this.perfs.end = this.perfs.start
    }

    destroy() {

        super.destroy()
    }
}

export default Default