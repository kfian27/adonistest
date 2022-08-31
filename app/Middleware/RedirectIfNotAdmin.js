'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class RedirectIfNotAdmin {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({ request, auth, session, response }, next) {
        // call next to advance the request
        if (session.get('jenis') != 'admin') {
            return response.route('/')
        }
        await next()
    }
}

module.exports = RedirectIfNotAdmin