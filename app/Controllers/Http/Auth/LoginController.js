'use strict'

class LoginController {
    index({ view }) {
        return view.render('auth.login')
    }

    async check({ request, auth, session, response }) {

        /**
         * get data from form
         */
        const { email, password } = request.all()

        if (email == 'admin@gmail.com' && password == 'admin') {
            session.put('jenis', 'admin')
            return response.route('cust')
        }

        /**
         * attemp auth
         */
        session.put('jenis', 'cust')
        await auth.attempt(email, password)

        return response.route('/')

    }

    async logout({ auth, session, response }) {
        session.clear()
        await auth.logout()
        return response.route('login.index')
    }
}

module.exports = LoginController