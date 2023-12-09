const {Router} = require('express');

const AccountController = require ('../controllers/Account');

const AccountRouter = Router();

AccountRouter.delete('/delete/:userId', AccountController.deleteUser);

AccountRouter.post('/signin', AccountController.postUser);

AccountRouter.get('/view/:userId', AccountController.viewProductHistory);

AccountRouter.put('/edit/:userId', AccountController.EditAccount);

AccountRouter.post('/signup',AccountController.postUser);

module.exports = AccountRouter;