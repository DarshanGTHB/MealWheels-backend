import User from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    // console.log("inside add to cart controller");
    // console.log(req.user);
    const { user_id } = req.user;
    // console.log(req.body);
    const { item_id } = req.body;
    const userInMongo = await User.findOne({ firebaseUid: user_id });
    // console.log(userInMongo.cart);
    if (userInMongo.cart[item_id]) {
      userInMongo.cart[item_id] += 1;
    } else {
      userInMongo.cart[item_id] = 1;
    }
    const cart = userInMongo.cart;
    await User.findOneAndUpdate({ firebaseUid: user_id }, { cart });
    res.json({
      success: true,
      message: "Item added to cart successfully",
      cart,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { user_id } = req.user;
    // console.log(req.body);
    const { item_id } = req.body;
    const userInMongo = await User.findOne({ firebaseUid: user_id });
    // console.log(userInMongo.cart);

    const { all } = req.query;
    // console.log(req.query)
    if (all == "true") {
      delete userInMongo.cart[item_id];
    } else {
      if (userInMongo.cart[item_id]) {
        userInMongo.cart[item_id] -= 1;
        if (userInMongo.cart[item_id] == 0) {
          delete userInMongo.cart[item_id];
        }
      } else {
        throw Error("no such item exist.");
      }
    }
    const cart = userInMongo.cart;
    await User.findOneAndUpdate({ firebaseUid: user_id }, { cart });
    // res.json(userInMongo);
    res.json({
      success: true,
      cart: userInMongo.cart,
      message: "Item removed from cart successfully",
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const getCartData = async (req, res) => {
  try {
    const { user_id } = req.user;
    const userInMongo = await User.findOne({ firebaseUid: user_id });
    res.json({
      success: true,
      cart: userInMongo.cart,
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
