/* ----------
all routes needs to be defined inline
see https://github.com/bigwheel-framework/documentation/blob/master/routes-defining.md#as-section-standard-form
---------- */
module.exports = {
	'/': require('./sections/home'),
	'/home': { section: require('./sections/home') },
	'/work': { section: require('./sections/work') },
    '/work/:id': { section: require('./sections/section') },
    '/about': { section: require('./sections/about') },
    '/contact': { section: require('./sections/contact') },
    '404': '/home'
}