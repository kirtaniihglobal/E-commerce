const Cart = require("../models/cart");
const User = require("../models/user");
const Product = require("../models/product");

const createCart = async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const id = req.user.id;

        if (!productId) {
            return res.status(400).json({ status: false, message: "productId are required" });
        }
        console.log("id", id)
        const findUser = await User.findById(id);
        console.log("findUser", findUser)
        if (!findUser) {
            return res.status(400).json({ status: false, message: "Invalid user ID" });
        }

        const findProduct = await Product.findById(productId);
        if (!findProduct) {
            return res.status(400).json({ status: false, message: "Invalid product ID" });
        }

        const cart = await Cart.findOne({ userId: id });

        const productPrice = findProduct.price;
        const itemTotal = productPrice * quantity;

        if (!cart) {
            const newCart = new Cart({
                userId: id,
                products: [{ productId, quantity, size, color }],
                total: itemTotal,

            });
            console.log("newCart", newCart)
            await newCart.save();
            return res.status(201).json({ status: true, message: "Cart created and product added", newCart });
        } else {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity, color, size });
            }

            cart.total += itemTotal;
            console.log("cart", cart)
            await cart.save();
            return res.status(200).json({ status: true, message: "Cart updated", cart });
        }
    } catch (error) {

        console.error("add Product Error:", error);
        return res.status(500).json({ status: false, message: "Add to cart failed" });
    }
};

const getAllCart = async (req, res) => {
    try {
        // console.log(req.user)
        const id = req.user.id;
        const cartItems = await Cart.findOne({ userId: id }).populate("products.productId");
        // console.log("carti", cartItems)
        return res.status(200).json({ status: 200, msg: "fetch all cart", cartItems })
    }
    catch (error) {
        console.error("error to fetch product", error);
        return res.status(500).json({ status: 500, msg: "error to fetch product" })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const id = req.user.id;
        const productId = req.params.id;
        // console.log("hlooo", productId)

        const cart = await Cart.findOne({ userId: id }).populate("products.productId");
        if (!cart) {
            return res.status(404).json({ status: 404, msg: "Cart not Found" });
        }
        // console.log(cart.products.productId)
        // const prod = await Product.findOne({ _id: productId });
        // console.log(prod)
        // console.log(cart.products)
        // cart.products = cart.products.filter(p => !p.productId.equals(productId));
        // console.log("helooo", cart.products)
        const product = cart.products.findIndex((prod) => prod.id === productId); // Assuming your cart items have an id field

        if (product === -1) {
            return res.status(404).send('Item not found in cart');
        }
        const cartPrice = cart.products[product].productId.price * cart.products[product].quantity;
        // console.log(cart.total)
        cart.products.splice(product, 1); // Remove the item
        cart.total -= cartPrice

        console.log("cart", cart)
        await cart.save();
        return res.status(200).json({ ststus: 200, msg: "Product remove from cart", cart })
    } catch (error) {
        console.error("delete error", error);
        return res.status(500).json({ status: 500, msg: "Delete error" })
    }
}
const clearCart = async (req, res) => {
    try {
        const id = req.user.id;

        const cart = await Cart.findOne({ userId: id }).populate("products.productId");
        if (!cart) {
            return res.status(404).json({ status: 404, msg: "Cart not Found" });
        }
        console.log(cart)
        cart.products = [];
        cart.total = "0";
        await cart.save();

        return res.status(200).json({ status: 200, msg: "All products removed from cart", cart });
    } catch (error) {
        console.error("delete error", error);
        return res.status(500).json({ status: 500, msg: "Delete error" });
    }
};
const plusProduct = async (req, res) => {
    try {
        const id = req.user.id;
        const productId = req.params.id;

        const cart = await Cart.findOne({ userId: id }).populate("products.productId");
        if (!cart) {
            return res.status(404).json({ status: 404, msg: "Cart not Found" });
        }
        const product = cart.products.findIndex((prod) => prod.id === productId);
        // console.log(cart.products.color)

        cart.products[product].quantity += 1;
        const price = cart.products[product].productId.price;
        cart.total += price;
        await cart.save();
        return res.status(200).json({ status: 200, msg: "quantity updated", cart })
    } catch (error) {
        console.error("delete error", error);
        return res.status(500).json({ status: 500, msg: "error" });
    }
}
const minusProduct = async (req, res) => {
    try {
        const id = req.user.id;
        const productId = req.params.id;

        const cart = await Cart.findOne({ userId: id }).populate("products.productId");
        if (!cart) {
            return res.status(404).json({ status: 404, msg: "Cart not Found" });
        }
        const product = cart.products.findIndex((prod) => prod.id === productId);
        // console.log(cart.products.color)
        if (product !==1&&cart.products[product].quantity>1) {
            cart.products[product].quantity -= 1;
            const price = cart.products[product].productId.price;
            cart.total -= price;
        }
        await cart.save();
        return res.status(200).json({ status: 200, msg: "quantity updated", cart })
    } catch (error) {
        console.error("delete error", error);
        return res.status(500).json({ status: 500, msg: "error" });
    }
}

module.exports = {
    createCart,
    getAllCart,
    removeFromCart,
    clearCart,
    plusProduct,
    minusProduct
};
