const itemService = require('../service/ProductExService');

module.exports.getExProducts = async (req, res) => {
  try {
    const products = await itemService.findAllProducts();
    res.send({ products });
  } catch (err) {
    res.status(500);
    res.send({
      error: err,
    });
  }
};

module.exports.postExProduct = async (req, res) => {
  const productInfo = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    available:req.body.available,
    imgURL: req.body.ImgURL
  };

  try {
    console.log(productInfo, 'serviceeeeeeeee');
    const createdProduct = await itemService.addProductEx(productInfo);
    return res.status(201).send({
      msg: 'Product added successfully',
      productId: createdProduct._id
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

module.exports.deleteExProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const del = await itemService.removeProductEx(productId);
    res.send({
      del,
      msg: 'Product deleted successfully.',
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};