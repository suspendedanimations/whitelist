import utils from './utils'
import domselect from 'dom-select'
import classes from 'dom-classes'
import prefix from 'prefix'
import sniffer from 'sniffer'

const config = {
	
	PATH: '',
	
	prevRoute: '/',
	routes: {
		default: '/',
		home: '/home',
		work: '/works'
	},

	$html: domselect('html'),
	$body: document.body,
	$view: domselect('#js-view'),
	$logo: domselect('.logo'),
	$nav: domselect.all('nav a'),
	
	width: window.innerWidth,
	height: window.innerHeight,
	
	formats: ['mp4'],
	
	mouseMultiplier: 1,
	firefoxMultiplier: 50,
	ease: .1,
	
	isMobile: sniffer.isPhone,
	hasVideo: true,
	hasBlendMode: 'backgroundBlendMode' in document.body.style,
	
	prefix: prefix('transform'),
	transition: prefix('transition')
}

export default config