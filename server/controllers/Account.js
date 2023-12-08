const { request } = require('express');
const AccountService = require('../service/Account');

module.exports.deleteUser = async (req,res) => {
    const userId = req.params.userId;
    try{
        await AccountService.deleteUser(userId);
        res.send({
            msg: 'User deleted successfully.'
        });} 
        catch (err){
            return res.status(500).send({
                error: err.message
            });
        }
};

module.exports.postUser = async(req, res)=>{
    const userInfo = {
        Name: req.body.Name,
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email
    };
    try{
        console.log(userInfo);
        const createdUser = await AccountService.createUser(userInfo);
        return res.status(201).send({
            msg: 'User created successfully',
            userId: createdUser._id
        });
    }catch(err){
        return res.status(500).send({
            error: err.message
        });
    }
};

module.exports.viewProductHistory = async(req, res)=>{
    try{
        const pHistory = await AccountService.viewProductHistory(req.params.userId);
        console.log(req.params.userId);
        return res.send(pHistory);
    }catch (err) {
        res.status(500);
        return res.send({ error: err.message});
        }
};

module.exports.EditAccount = async(req, res) => {
    try{
        const editID = await AccountService.findUserbyID(req.params.userId)
        const edits = {
            Username: req.body.Username,
            Password: req.body.Password,
            Name: req.body.Name
        }
        const EditAcc = await AccountService.EditAccount(editID,edits)
        res.send({
            msg: 'Edits are updated to the account'
        })
    }catch(err){
        return res.status(500).send({
            error:err.message
        });
    }
};