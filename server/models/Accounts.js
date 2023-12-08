const {Schema,model} = require('mongoose');

const UsersSchema = new Schema({
    Username:{
        type: 'String',
        required: true
    },
    Password:{
        type: 'String',
        required: true
    },
    Name:{
        type:'String',
        required: true
    },
    Role:{
        type:'String',
        required:true
    },
    Email:{
        type:"String",
        required: false
    },
    Product :[{
        type: Schema.Types.ObjectId,
        ref:'products',
        required: false
    }]
});

const UsersModel = model ('Users',UsersSchema);

module.exports = UsersModel;