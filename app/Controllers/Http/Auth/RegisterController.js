'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')
const { validate } = use('Validator')

class RegisterController {

    index({ view }) {
        return view.render('auth.register')
    }

    async store({ request, session, response }) {

        /**
         * declaration validation
         */
        const rules = {
            name: 'required',
            email: 'required|unique:users,email',
            password: 'required'
        }

        const messages = {
            'name.required': 'Nama lengkap Tidak Boleh Kosong!',
            'email.required': 'Alamat Email Tidak Boleh Kosong!',
            'email.unique': 'Alamat Email Sudah Terdaftar!',
            'password.required': 'Password Tidak Boleh Kosong!',
        }

        const validation = await validate(request.all(), rules, messages)

        /**
         * validation failed
         */
        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password'])
            return response.redirect('back')
        }

        const coverImage = request.file('file')
            // return response.send(coverImage);
        let namaFile = '';
        if (coverImage) {
            await coverImage.move(Helpers.tmpPath('uploads'))
            namaFile = coverImage.fileName;
        }

        /**
         * create user
         */
        const user = await User.create({
            name: request.input('name'),
            email: request.input('email'),
            password: request.input('password'),
            fileName: namaFile
        })

        /**
         * display success message
         */
        session.flash({ notification: 'Sign Up Complete!' })
        return response.redirect('back')

    }

}


module.exports = RegisterController