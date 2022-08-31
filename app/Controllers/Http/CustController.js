'use strict'

const Customer = use('App/Models/Customer')
const User = use('App/Models/User')

class CustController {
    async index({ request, response, view }) {
        const users = await User.all()

        return view.render('custs.index', { users: users.rows })
    }

    create({ request, response, view }) {
        return view.render('custs.create')
    }

    async store({ request, response, view, session }) {
        const cust = new Customer()

        cust.username = request.input('title')
        cust.content = request.input('content')
        await cust.save()

        session.flash({ notification: 'Data Berhasil Disimpan!' })
        return response.route('custs.index')

    }

    async approve({ request, response, view, params, session }) {
        const id = params.id
        const user = await User.find(id)
        user.isApprove = '1'
        await user.save()

        session.flash({ notification: 'Data Berhasil DiApprove!' })
        return response.route('custs.index')
    }
}

module.exports = CustController