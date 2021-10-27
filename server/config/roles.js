const AccessControl = require('accesscontrol')

let grantObject = {
    admin: {
        profile: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        articles:{
            'read:any': ['*']
        },
        article:{
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }

    },
    user: {
        profile: {
           
            'read:own': ['*','!password','!_id'],
            'update:own': ['*'], 
            'delete:own': ['*']
        }
    }

}

const roles = new AccessControl(grantObject);

module.exports = { roles }