const {Router} = require('express');

const AccountController = require ('../controllers/Account');

const AccountRouter = Router();

AccountRouter.delete('/:userId', AccountController.deleteUser);

AccountRouter.post('/signin', AccountController.postUser);

AccountRouter.get('/:userId', AccountController.viewProductHistory);

AccountRouter.put('/:userId', AccountController.EditAccount);

AccountRouter.post('/signup',AccountController.postUser);

module.exports = AccountRouter;