'use strict'
const User = use('App/Models/User')

class UserController {
    async index() {
        return await User.all()
    }

    async store({request}) {
        const data = request.only(["username","email","password"])

        const user = await User.create(data)

        return user
    }

    async show({params,auth}){
        if (auth.user.id !== Number(params.id)) {
            return 'You cannot see someone else\'s profile'
          }

          return auth.user
    }

    async update({params, request}) {
        if (auth.user.id !== Number(params.id)) {
            return 'You cannot update else\'s user'
          }

        const user = await User.findOrFail(params.id)

        const data = request.only(["username","email","password"])

        user.merge(data)

        await user.save()

        return user
    }

    async destroy({params,request,response}){
        if (auth.user.id !== Number(params.id)) {
            return 'You cannot delete else\'s user'
          }

        const user = await User.findOrFail(params.id)

        await user.delete()

        return response.status(200).send({ message: 'User deleted'})
    }

}

module.exports = UserController
