import Biggie from './app'
import config from 'config'
import event from 'dom-events'
import classes from 'dom-classes'
import sniffer from 'sniffer'

sniffer.addClasses(document.documentElement)

const app = new Biggie()
app.init()

config.hasBlendMode && classes.add(config.$body, 'has-blend-mode')
config.isMobile && event.on(config.$body, 'touchmove', (e) => e.preventDefault())