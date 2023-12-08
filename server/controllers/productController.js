const productService = require('../service/productService');

module.exports.getProducts = async (req, res) => {

    try{

        const products = await productService.findAllProducts();
        res.send ({products });
    } catch(err) {

        res.status(500);
        res.send ({
            error: err
        });
    }
};
module.exports.findMyProduct = async (req, res) => {
    try{
        const mine = await productService.findMyProduct(req.params.userId);
        return res.status(201).send({ 
            mine
        });
    }catch (err) {
        return res.status(500).send({error: err.message});
      }
};



module.exports.postProduct = async(req, res)=>{
   console.log( req.body.name, "ssssssssss");
    const propertInfo = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        available: false,
        pending:  true,
        paid: false,
        userId:ID,
        imgURL: req.body.ImgURL
    };
    try{
        console.log(propertInfo);
        const createdProduct = await productService.AddProudct(productInfo);
        return res.status(201).send({
            msg: 'Product added successfully',
            productId: createdProduct._id
        });
    }catch(err){
        return res.status(500).send({
            error: err.message
        });
    }
};

module.exports.deleteProduct = async (req,res) => {
    const productId = req.params.productID;
    try{
    const del = await productService.removeProduct(productId);
    res.send({
        del,
        msg: 'Product deleted successfully.'
    });}
    catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
};

module.exports.EditProduct = async(req, res) => {
    
    try{
        const edit = await productService.findProductbyID(req.params.propertyID);
        const availibilty = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imgURL: req.body.imgURL
        }
        const EditProduct = await productService.EditProduct(edit,availibilty)
        res.send({

            msg: 'Edits are updated to the product'
        })
    }catch(err){
        return res.status(500).send({
            error:err.message
        });
    }
};

// Negotiate on Item Prices and Terms
module.exports.negotiateProduct = async (req, res) => {
    try {
       const { productId } = req.body;
       const { proposedPrice } = req.body;
   
       if (!productId || !proposedPrice) {
         return res.status(400).json({ error: 'productId and proposedPrice are required' });
       }
   
       const negotiatedProduct = await productService.negotiateProductPrice(productId, proposedPrice);
       res.status(200).send({ msg: 'Negotiation successful', product: negotiatedProduct });
    } catch (err) {
       res.status(500).send({ error: err.message });
    }
   };

   module.exports.buyProduct = async (req, res) => {
    const productId = req.params.productID;
   
    try {
       const product = await productService.findProductbyID(productId);
   
       if (!product) {
         return res.status(404).send({
           error: 'Product not found'
         });
       }
   
       if (product.available) {
         return res.status(400).send({
           error: 'Product is already available'
         });
       }
   
       if (product.pending) {
         return res.status(400).send({
           error: 'Product is pending for approval'
         });
       }
   
       const updatedProduct = await productService.buyProduct(product);
       res.send({
         msg: 'Product purchased successfully',
         product: updatedProduct
       });
    } catch (err) {
       return res.status(500).send({
         error: err.message
       });
    }
   };