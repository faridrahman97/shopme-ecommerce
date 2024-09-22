const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001;
const dirname = path.resolve();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const couponRoutes = require("./routes/couponRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  connectDB();
});
