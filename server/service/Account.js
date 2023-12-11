const ProductExModel = require('../models/ProductEx');
const UsersModel = require('../models/Accounts');
const ProductModel = require('../models/Product');
const AccountRouter = require('../routes/Account');

module.exports.deleteUser = async (userId) => {
  try {
    await UsersModel.deleteOne({ _id: userId });
  } catch (err) {
    throw new Error('Could not ban user');
  }
};

module.exports.createUser = async (userInfo) => {
  try {
    const user = new UsersModel({
      Name: userInfo.Name,
      Username: userInfo.Username,
      Password: userInfo.Password,
      Email: userInfo.Email,
    });
    const CreatedUser = await user.save();
    return CreatedUser;
  } catch (err) {
    throw new Error('Could not create user');
  }
};

module.exports.viewProductHistory = async (userId) => {
  try {
    const history = await ProductModel.find({ UserID: userId });
    console.log(history);
    return history;
  } catch (err) {
    throw new Error('Could not view history');
  }
};

module.exports.EditAccount = async (acc, up) => {
  try {
    const editted = await UsersModel.findByIdAndUpdate(acc._id, up);
    return editted;
  } catch (err) {
    throw new Error('Unable to update');
  }
};

module.exports.findUserbyID = async (userId) => {
  try {
    const user = await UsersModel.findById({ _id: userId });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('Error while finding user');
  }
};
