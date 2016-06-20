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
        
        this.client = { x: 0, y: 0 }
        this.lerped = { x: 0, y: 0 }

        this.mousemove = this.mousemove.bind(this)
    }

    addEvents() {

        super.addEvents()
        
        !this.sniff.isSafari && on(window, 'mousemove', this.mousemove)
    }
    
    removeEvents() {

        super.removeEvents()
        
        !this.sniff.isSafari && off(window, 'mousemove', this.mousemove)
    }

    mousemove(e) {
        
        this.client.x = (e.pageX - config.width / 2) / config.width * 8
        this.client.y = (e.pageY - config.height / 2) / config.height * 8
    }
    
    run() {
        
        super.run()
        
        this.lerped.x += (this.client.x - this.lerped.x) * .1
        this.lerped.y += (this.client.y - this.lerped.y) * .1
        
        // this.dom.layer.style['will-change'] = this.dom.section.style['will-change'] = this.willchange
        this.dom.layer.style[this.prefix] = `translate3d(0,${-this.lerped.x}px,0) rotateX(${-this.lerped.y}deg) rotateY(${-this.lerped.x}deg)`
    }

    resize() {
                
        super.resize()
        this.vars.bounding = this.dom.section.getBoundingClientRect().height - (config.height / 4)
    }
}

export default Work