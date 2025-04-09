const express = require('express')
const userController = require('../controllers/userController')
const authUser = require('../middlewares/authUser')
const multerMiddleware = require('../middlewares/multerMiddleware')
const brandController = require('../controllers/brandController')
const productController = require('../controllers/productController')

const router = new express.Router()

// url for register-post
router.post('/register',userController.registerController)

// url for login-post
router.post('/login',userController.loginController)

// url for refresh tokrn
router.post('/refresh-token',userController.refreshTokenController)

// url for update user details
router.put('/update-userDetails/:id',authUser,multerMiddleware.single("profilephoto"),userController.updateProfileController)

// url for delete user details
router.put('/delete-userDetails/:id',authUser,userController.deleteProfileController)

// url for add brands
router.post('/add-brand',authUser,multerMiddleware.single("brandlogo"),brandController.addBrandsController)

// url for fetch all brands
router.get('/get-brands',authUser,brandController.getAllbrandsController)

// url for add product
router.post('/add-product',authUser,multerMiddleware.single("productImage"),productController.addProductController)

// url for update product
router.put('/update-product/:id',authUser,multerMiddleware.single("productImage"),productController.updateproductController)

// url for delete product
router.delete('/delete-product/:id',authUser,productController.deleteproductController)

// url for blocking users
router.post('/block-user/:id',authUser,userController.blockUserController)

// url for unblocking users
router.post('/unblock-user/:id',authUser,userController.unblockUserController)

// url for viewing all products
router.get('/view-product',authUser,productController.viewAllProducts)




module.exports = router