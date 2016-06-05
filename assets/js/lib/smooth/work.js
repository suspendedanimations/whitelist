import Smooth from './parallax'
import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import {on, off} from 'dom-event'

class Work extends Smooth {
    
    constructor(opt) {

        super(opt)
        
        this.dom.section = opt.section
        this.dom.layer = opt.layer
        
        this.width = 500
        this.margin = 50
        this.length = opt.section.querySelectorAll('.work-item').length
        
        this.client = { x: 0, y: 0 }
        this.lerped = { x: 0, y: 0 }

        this.mousemove = this.mousemove.bind(this)
    }

    addEvents() {

        super.addEvents()
        
        on(document, 'mousemove', this.mousemove)
    }
    
    removeEvents() {

        super.removeEvents()

        off(document, 'mousemove', this.mousemove)
    }

    mousemove(e) {
        
        const X = this.client.x = (e.pageX - config.width / 2) / config.width * 8
        const Y = this.client.y = (e.pageY - config.height / 2) / config.height * 8
    }
    
    run() {
           
        super.run()

        this.lerped.x += (this.client.x - this.lerped.x) * .1
        this.lerped.y += (this.client.y - this.lerped.y) * .1
        
        this.dom.layer.style.cssText = `${this.prefix}: translateY(${-this.lerped.x}px) rotateX(${-this.lerped.y}deg) rotateY(${-this.lerped.x}deg)`
        this.dom.section.style.cssText = `${this.prefix}: translate3d(${-(this.vars.current).toFixed(2)}px,0,0); ${this.willchange}`
    }

    resize() {

        super.resize()

        const unit = this.width + this.margin
        
        this.vars.bounding = unit * this.length - unit
    }
}

export default Work