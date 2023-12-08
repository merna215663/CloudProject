const AuthService = require ('../service/auth');

module.exports.postUser = async (req,res) => {
    try{
        const userInfo = {
            Username : req.body.Username,
            Password : req.body.Password,
            Name: req.body.Name
        };

        const userExists = await AuthService.doesUserExist(userInfo.Username);
        if (userExists){
            return res.status(422).send({
                error: 'A user with the same username aleardy exists.'
            });
        }
       const u = await AuthService.createUser(userInfo);
       return u;
    } catch (error){
        res.status(500).send({
            error: error.message
        });
    }
};

module.exports.postLogin = async (req, res) => {
    const { Role, Username, Password } = req.body;
    try {
      var acc = null; 
      if(Role == "Admin"){
        acc = await AuthService.chkAdminCreds(Username, Password);
        console.log(acc);
      }else if (Role == "Customer"){
        acc = await AuthService.chkUserCreds(Username, Password);
        console.log(acc);
      }
      if (acc == null) {
        console.log(acc);
        return res.status(401).send({
          error:
            'Invalid credentials, please enter the correct username and password.'
        });
      }
      //const jwt = await AuthService.generateJWT(acc, Role);

      res.send({
        userId: acc._id,
        Username: acc.Username,
        //jwt: jwt,
        role: Role,
        message: 'Logged in successfully.'
      });

    }catch (err) {
    res.status(500).send({
      error: err.message
    });

    }
};