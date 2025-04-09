const products = require('../models/productModel')
const brands = require('../models/brandModel')
const users = require('../models/userModel')


// add products
const addProductController = async (req,res)=>{
    const userId = req.userId
    const { productname, description, price, category, brand } = req.body
    const productImage = req.file.filename
    if(!productname || !description || !price || !category || !brand || !productImage) {
        return res.status(401).json("All fields are required")
      }

      try{
        // 1. check if the brand exists
        const existingBrand = await brands.findOne({ brandname: brand })
        if(!existingBrand) {
          return res.status(404).json("Brand does not exist")
        }

        // 2. check if the category exists within that brand's categories array
    if(!existingBrand.brandcategories.includes(category)) {
        return res.status(400).json(`Category '${category}' does not exist in ${brand}`)
      }

    //   create new product
    const newProduct = new products({productname,description,price,category,brand,productImage,addedBy: userId
      })
  
      await newProduct.save()
      res.status(201).json(newProduct)
  
    }catch(err){
        res.status(501).json(err)
    }
}


// update product by authorised user
const updateproductController = async (req,res)=>{
  const userId = req.userId
  const productId = req.params.id
  const { productname, description, price, category, brand } = req.body
  const uploadPrductImgFile = req.file?req.file.filename:proudctImage


  try {
    const product = await products.findById(productId)

    if (!product) {
      return res.status(404).json("Product not found")
    }

    // check ownership
    if (product.addedBy.toString() !== userId) {
      return res.status(403).json("Unauthorized: You can only edit your own products")
    }

  // update using findByIdAndUpdate
  const updatedProduct = await products.findByIdAndUpdate(
    { _id: productId },{productname,description,price,category,brand,productImage:uploadPrductImgFile},
    { new: true }
  )

  res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json(err)
  }
}


// delete product by authorised user
const deleteproductController = async (req,res)=>{
    const userId = req.userId // from JWT middleware
    const productId = req.params.id
  
    try{
      const product = await products.findById(productId)
  
      if(!product) {
        return res.status(404).json("Product not found")
      }
  
      // check ownership
      if(product.addedBy.toString() !== userId) {
        return res.status(403).json("Unauthorized: You can only delete your own products")
      }
  
      await products.findByIdAndDelete(productId)
      res.status(200).json("Product deleted successfully")
    } catch (err) {
      res.status(500).json(err)
    }
}

// API to viewing all products
const viewAllProducts = async (req, res) => {
    const userId = req.userId  
    const { sortBy = 'productname', order = 'asc', brand, category } = req.query
    const sortQuery = {}
    sortQuery[sortBy] = order === 'asc' ? 1 : -1
  
    try{
      // 1. get users who blocked this user
      const usersBlockingMe = await users.find({ blockedUsers: userId }, '_id')
      const blockedByUsers = usersBlockingMe.map(u => u._id)
  
      // 2. build filter
      const filter = {
        addedBy: { $nin: blockedByUsers },
      }
      if (brand) filter.brand = brand
      if (category) filter.category = category
  
      const allProducts = await products.find(filter).sort(sortQuery).populate('addedBy', 'username')
      res.status(200).json(allProducts)
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong', details: err.message })
    }
  }




    module.exports = {addProductController,updateproductController,deleteproductController,viewAllProducts}

 