import userModel from "../model/userModel.js";

// add products to the user cart 
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId; // userId comes from auth middleware

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ message: "User not found" });

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.status(200).json({ message: "Item added to cart", cartData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


// update products to the user cart 
const updateToCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body
    const userId = req.userId; // userId comes from auth middleware
    const user = await userModel.findById(userId)
    let cartData = user.cartData || {}

    if (quantity == 0) {
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size]

        if (Object.keys(cartData[itemId]).length == 0) {
          delete cartData[itemId]
        }
      }

    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {}
      }
      cartData[itemId][size] = quantity;

    }

    await userModel.findByIdAndUpdate(userId, { cartData })

    return res.status(200).json({ sucess: true, message: "cart updated", cartData })



  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });

  }
}

// get products to the logged in user 
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId; // userId comes from auth middleware
    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });

    }
    const cartData = user.cartData || {} // the user may have an empty cart object

    res.status(200).json({ success: true, cartData })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });

  }
}


export { addToCart, updateToCart, getUserCart }
