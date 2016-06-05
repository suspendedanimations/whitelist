import Smooth from 'smooth-scrolling'
import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'

class Single extends Smooth {
    
    constructor(opt) {

        super(opt)
        
        this.dom.section = opt.section
    }
    
    run() {
                
        super.run()

        this.vars.target += .3
        
        this.dom.section.style.cssText = `${this.prefix}: ${this.getTransform(-(this.vars.current).toFixed(2))}; ${this.willchange}`
    }
    
    resize() {
        
        super.resize()
        
        this.vars.bounding = this.dom.section.getBoundingClientRect().height - this.vars.height
    }
}

export default Single