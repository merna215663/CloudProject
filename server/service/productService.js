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