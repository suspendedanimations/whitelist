import domselect from 'dom-select'
import utils from './utils'
import prefix from 'prefix'

const config = {
	
	PATH: '',
	
	prevRoute: '/',
	routes: {
		default: '/',
		home: '/home',
		work: '/works'
	},
	
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
	
	isMobile: false,
	hasVideo: true,
	hasBlendMode: 'backgroundBlendMode' in document.body.style,
	
	prefix: prefix('transform')
}

export default config