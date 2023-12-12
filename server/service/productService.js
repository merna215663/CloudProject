const ProductModel = require('../models/Product');

module.exports.findAllProducts = async () => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (err) {
    throw new Error('Could not retieve products');
  }
};

module.exports.addProduct = async (productInfo) => {
  try {
    const product = new ProductModel({
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

module.exports.findProductbyID = async (productId) => {
  try {
    const productt = await ProductModel.findById({ _id: productId });
    if (productt) {
      return productt;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error('Error while finding product');
  }
};
module.exports.editProduct = async (productId, updatedData) => {
  try {
    const editedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!editedProduct) {
      throw new Error('Product not found');
    }

    return editedProduct;
  } catch (err) {
    throw new Error('Unable to update the product');
  }
};

module.exports.removeProduct = async (productId) => {
  try {
    const result=await ProductModel.findByIdAndDelete(productId);
    if (!result) {
      throw new Error('Product not found');
    }

    return { success: true, message: 'Product removed successfully.' };
  } catch (err) {
    throw new Error(`Could not remove product`);
  }
};

module.exports.buyProduct = async (product) => {
  try {
    product.available = true;
    product.paid = true;
    product.pending = false;

    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (err) {
    throw err;
  }
};

module.exports.negotiateProductPrice = async (productId, proposedPrice) => {
  try {
    const product = await productService.findProductbyID(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.pending) {
      throw new Error('Product is pending for approval');
    }

    if (product.available) {
      throw new Error('Product is already available');
    }

    product.price = proposedPrice;
    product.pending = true;

    const updatedProduct = await product.save();
    return updatedProduct;
  } catch (err) {
    throw err;
  }
};
