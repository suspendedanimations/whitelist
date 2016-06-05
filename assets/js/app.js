import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import framework from './framework'
import gsap from 'gsap'
import SplitText from 'gsap-splitext'

TweenLite.defaultEase = Expo.easeOut

class Biggie {
    
    constructor(opt) {

        this.state = false

        this.route = this.route.bind(this)
        this.handler = this.handler.bind(this)
    }

    init() {

        framework.init()

        this.bindUIElements()
    }

    bindUIElements() {
        
        utils.biggie.addRoutingEL([config.$logo])
                
        config.$body.querySelector('.menu').onclick = this.handler
        utils.js.arrayFrom(config.$nav).forEach((el) => el.onclick = this.route)
    }

    route(e) {

        const target = e.currentTarget

        e.preventDefault()

        this.state && this.closeMenu()

        framework.go(target.getAttribute('href'))
    }

    handler(e) {

        this.state ? this.closeMenu() : this.openMenu()
    }

    openMenu() {

        this.state = true
        classes.add(config.$body, 'has-menu-open')
    }

    closeMenu() {

        this.state = false
        classes.remove(config.$body, 'has-menu-open')
    }
}

module.exports = Biggie