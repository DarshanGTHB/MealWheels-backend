import Item from "../models/Item.js";
import cloudinary from "../config/cloudinary.js";

export const createItem = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
      imagePublicId = req.file.filename; // Cloudinary public ID
    }

    const item = new Item({
      name,
      image: imageUrl,
      imagePublicId, // Save public ID
      price,
      description,
      category,
    });
    await item.save();
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // Delete image from Cloudinary if it exists
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    res.json({ success: true, message: "Item and image deleted", item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const updateItem = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const itemId = req.params.id;

    // Find the existing item
    const existingItem = await Item.findById(itemId);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // Handle image update if new image is provided
    let imageUrl = existingItem.image;
    let imagePublicId = existingItem.imagePublicId;

    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (existingItem.imagePublicId) {
        await cloudinary.uploader.destroy(existingItem.imagePublicId);
      }
      // Update with new image
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }

    // Update the item
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        name: name || existingItem.name,
        price: price || existingItem.price,
        description: description || existingItem.description,
        category: category || existingItem.category,
        image: imageUrl,
        imagePublicId: imagePublicId
      },
      { new: true } // Returns the updated document
    );

    res.json({ success: true, item: updatedItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};