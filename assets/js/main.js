import Biggie from './app'
import config from 'config'
import event from 'dom-events'
import classes from 'dom-classes'

const app = new Biggie()
app.init()

config.hasBlendMode && classes.add(config.$body, 'has-blend-mode')
config.isMobile && event.on(config.$body, 'touchmove', (e) => e.preventDefault())

console.log('biggie@1.1.0')