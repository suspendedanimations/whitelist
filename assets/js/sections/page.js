import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import event from 'dom-events'
import Default from './default'
import Pixi from '../components/pixi'
import Smooth from 'smooth-scrolling'

class Page extends Default {
    
    constructor(opt) {
        
        super(opt)
    }
    
    init(req, done) {

        super.init(req, done)
    }
    
    dataAdded(done) {
        
        super.dataAdded()
        
        this.addEvents()

        done()
    }
    
    addEvents() {
        
        this.split = new SplitText(this.ui.split, { type: this.ui.split.getAttribute('data-split') })
        this.canvas = new Pixi({ container: this.ui.mask })
        
        this.canvas.init()
        
        this.initSmooth()
    }

    initSmooth() {

        this.smooth = new Smooth({
            ease: .1,
            noscrollbar: true,
            section: this.ui.content
        })
        
        this.smooth.init()
    }
    
    resize(width, height) {
        
        super.resize(width, height)

        if(config.width < 529) {
            if(!this.smooth) {
                this.initSmooth()
            }
        } else {
            if(this.smooth) {
                this.smooth.destroy()
                this.smooth = undefined
            }
        }
    }
    
    destroy(req, done) {

        console.log('page destroy')
        
        super.destroy()

        this.smooth && this.smooth.destroy()
        
        this.canvas && this.canvas.destroy()

        this.page.parentNode.removeChild(this.page)
        
        done()
    }
}

module.exports = Page