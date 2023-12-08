const ProductModel = require ('../models/Product')

module.exports.findAllProducts = async () => {

    try{
        const products = await ProductModel.find({ pending: 'false', available: 'true', paid: 'false'});
        console.log(pending);
        return products;    
    } catch (err) {
        throw new Error ('Could not retieve products');
    }
};

module.exports.addProduct = async (productInfo) => {

    try{
        const product = new ProductModel({

            name: productInfo.name,
            description: productInfo.description,
            price: productInfo.price,
            available:productInfo.available,
            pending:productInfo.pending,
            paid:productInfo.paid,
            userID:productInfo.userID,
            imgURL: productInfo.imgURL 
        });

        const createdProduct = await product.save();
        return createdProduct;
    } catch (err){
        throw new Error ('Could not create product.');
    }
};

module.exports.findProductbyID = async (productID) => {
    try{
        const productt = await ProductModel.findById({_id:productID});
        if(productt){
            return productt;
        }else{
            return false;
        }
    }
    catch(err){
        throw new Error ('Error while finding product')
    }
};

module.exports.EditProduct = async(product, up)=>{
    try{
        const editted = await ProductModel.findByIdAndUpdate(product._id, up);
        return editted;
    }catch(err){
        throw new Error('Unable to update');
    }
};

module.exports.removeProduct = async (productID) => {
    try {
        await ProductModel.deleteOne({ _id: productID });
      } catch (err) {
        throw new Error('Could not remove product.');
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