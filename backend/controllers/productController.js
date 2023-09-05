import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async(req,res) => {
    const pageSize = 3
    const page = Number(req.query.pageNumber) || 1
    const count = await Product.countDocuments()

    const products = await Product.find({}).limit(pageSize).skip(pageSize *(page-1))
    res.json({products, page, pages: Math.ceil(count/pageSize)})
    
});


//@desc Fetch single product
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);

    if(product)
    {
        return  res.json(product);
    }
    res.status(404)
    throw new Error('Resource not found');
})

//@desc Create a product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async(req,res) => {
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',

    })

    const createdProduct = product.save()
    res.status(201).json(createdProduct)
});


//@desc Update a product
//@route PUT /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async(req,res) => {
   const {name,price, description, image, brand, category, countInStock} = req.body

   const product = await Product.findById(req.params.id)

   if(product){
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = product.save()
    res.json(updatedProduct)
   }else{
    res.status(404)
    throw new Error("Resource not found!")
   }
});

//@desc Delete a product
//@route DELETE /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async(req,res) => {
    
    const product = await Product.findById(req.params.id)
 
    if(product){
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: "Product Deleted"})
    }else{
     res.status(404)
     throw new Error("Resource not found!")
    }
 });

//@desc Create a new review
//@route DELETE /api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async(req,res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
 
    if(product){
        //We don't want the same person to review the same product multiple times
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error("Product already reviewed!")
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc,review) => acc +review.rating,0) / product.reviews.length

        await product.save();
        res.status(201).json({message: 'Review Added'})
    }else{
     res.status(404)
     throw new Error("Resource not found!")
    }
 });

export {getProductById, getProducts, createProduct, updateProduct, deleteProduct,createProductReview}