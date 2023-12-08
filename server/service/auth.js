
const { ObjectId } = require('mongoose').Types;
const UserModel = require('../models/Accounts');

module.exports.createUser = async (userInfo) => {
    try {
        let hashedPassword = await bcrypt.hash(userInfo.Password, 12);

        const newUser = new UserModel({
            Username: userInfo.Username,
            Password: hashedPassword,
            Name: userInfo.Name,
            Role: "Customer"
        });
        await newUser.save();
    }catch(err) {
        throw new Error ('Error creating new user, please try again later.');
    }
    
};

module.exports.doesUserExist = async (username) => {
    const existingUser = await UserModel.findOne({
        Username: username
    });

    if (existingUser){
        return true;
    } else {
        return false;
    }
};

module.exports.chkUserCreds = async (username,password) => {
    try{
        const user = await UserModel.findOne({
            Username: username
        });
        let isCorrectPassword = await bcrypt.compare(password, user.Password);
        if (isCorrectPassword){
            return user;
        }else{
            return null;
        }
    }catch (error){
        throw new Error ('Error logging in, please try again later.');
    }
};

module.exports.chkAdminCreds = async (username,password) => {
    try{
        const user = await UserModel.findOne({
            Username: username
        });
        let isCorrectPassword = await bcrypt.compare(password, user.Password);
        if (isCorrectPassword){
            return user;
        }else{
            return null;
        }
    }catch (error){
        throw new Error ('Error logging in, please try again later.');
    }
};


/*
module.exports.generateJWT = (user, role) => {
    try {
        const jwtPayload = {
            userId: user._id,
            Username: user.Username,
            Role: role
        };

        const jwtSecret = process.env.JWT_SECRET;


        let token = JWT.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Failure to sign in, please try again later.');
    }
  };*/