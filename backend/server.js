// Express server setup (dummy)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const orderRoutes = require("./routes/orders");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/reva_foodcourt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error", err));

app.use("/api/orders", orderRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
