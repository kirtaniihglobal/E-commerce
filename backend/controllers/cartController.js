// const Cart = require("../models/cart");
// const User = require("../models/user");
// const Product = require("../models/product");
// const product = require("../models/product");

// const createCart = async (req, res) => {
//     try {

//         const { userId, quntity, total, productId } = req.body;
//         const findUser = await User.findById({ userId })
//         if (!findUser) {
//             return res.status(400).send({ status: false, message: "Invalid user ID" });
//         }
//         const findProduct = await Product.findById({ productId })

//         if (!findProduct) {
//             return res.status(400).send({ status: false, message: "Invalid product ID" });
//         }
//         const cart = await Cart.findOne({ userId: userId })
//         if (!cart) {


//             const newCart = new Cart({
//                 userId: userId,
//                 products: [
//                     {
//                         productId: productId,
//                         quntity: quntity,
//                         total: total
//                     }
//                 ]
//             });
//         } else {
//             const existItem = cart.products.find(i => i.productId.equals(productId));
//             if (existItem) {
//                 existItem.quntity += quntity;
//             } else {
//                 cart.products.push({ productId: productId, quntity, total })
//             }
//         }
//         await newCart.save();
//         return res.status(201).json({ status: 201, msg: "product add to cart successfully", product: newCart })
//     }
//     catch (error) {
//         console.error("add Product Error:", error);
//         return res.status(500).json({ status: 500, msg: "add Product Failed" })
//     }
// }

// module.exports = {
//     createCart,

// }