import FoodItem from "../models/fooditem.js"; // Adjust path if needed

// ✅ Create a new food item
export const createFoodItem = async (req, res) => {
  try {
    const {
      foodName,
      calories,
      protein,
      carbohydrates,
      fats,
      category,
      servingSize
    } = req.body;

    const foodItem = new FoodItem({
      foodName,
      calories,
      protein,
      carbohydrates,
      fats,
      category,
      servingSize
    });

    await foodItem.save();

    res.status(201).json({ success: true, foodItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get all food items (with optional category filter)
export const getAllFoodItems = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const foodItems = await FoodItem.find(filter);

    res.status(200).json({ success: true, foodItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get a single food item by ID
export const getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json({ success: true, foodItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update a food item
export const updateFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    Object.assign(foodItem, req.body);
    await foodItem.save();

    res.status(200).json({ success: true, foodItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete a food item
export const deleteFoodItem = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await foodItem.deleteOne();

    res.status(200).json({ success: true, message: "Food item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
