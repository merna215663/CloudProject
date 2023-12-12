const Item = require('../models/ProductEx');

module.exports.addProductEx = async (productInfo) => {
  try {
    const product = new Item({
      name: productInfo.name,
      description: productInfo.description,
      price: productInfo.price,
      available: productInfo.available,
      imgURL: productInfo.imgURL
    });

    const createdProduct = await product.save();
    return createdProduct;
  } catch (err) {
    throw new Error('Could not create product.');
  }
};

module.exports.removeProductEx = async (productId) => {
  try {
    const result=await Item.findByIdAndDelete(productId);
    if (!result) {
      throw new Error('Product not found');
    }

    return { success: true, message: 'Product removed successfully.' };
  } catch (err) {
    throw new Error(`Could not remove product`);
  }
};

module.exports.findAllProducts = async () => {
  try {
    const products = await Item.find();
    return products;
  } catch (err) {
    throw new Error('Could not retieve products');
  }
};