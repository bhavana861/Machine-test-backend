const brands = require('../models/brandModel')

// add brands
const addBrandsController = async (req,res)=>{
    const userId =  req.userId
    const {brandname,brandcategories} = req.body
    const brandlogo = req.file.filename

    if(!brandname || !brandcategories || !brandlogo) {
        return res.status(401).json("All fields are required");
      }

    // check brand exist
    try{
    const existingbrand = await brands.findOne({brandname})
    if(existingbrand){
        res.status(406).json("Brand Already exists...")
    }

    // add new brand
    const newBrand = new brands({
        brandname,brandlogo,brandcategories:JSON.parse(brandcategories)
    })
    await newBrand.save()
    res.status(200).json(newBrand)
    }catch(err){
        res.status(501).json(err)
    }
}



// fetch brands by users
const getAllbrandsController = async (req,res)=>{
  // to get query parameter from url use req.query
    const searchKey = req.query.search

    try {
      const allBrands = await brands.find({
        brandcategories: {
          $regex: searchKey,
          $options: 'i'
        }
      })
      res.status(200).json(allBrands)
    } catch (err) {
      res.status(401).json(err)
    }
}









module.exports = {addBrandsController,getAllbrandsController}