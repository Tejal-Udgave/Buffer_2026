const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://akshadaingale52_db_user:aksha123@cluster0.gnjg6bl.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  const stockSchema = new mongoose.Schema({
  storeId: String,
  item: String,
  quantity: Number,
  timestamp: { type: Date, default: Date.now }
});

const Stock = mongoose.model("Stock", stockSchema);


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/update-stock", async (req, res) => {
  try {
    const { storeId, item, quantity } = req.body;

    // ✅ Better validation
    if (!storeId || !item) {
      return res.status(400).json({ message: "StoreId and item are required" });
    }

    if (quantity == null || quantity < 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // ✅ Smart update logic
    const updatedStock = await Stock.findOneAndUpdate(
      { storeId, item },
      { quantity, timestamp: Date.now() },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Stock updated successfully",
      data: updatedStock
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
