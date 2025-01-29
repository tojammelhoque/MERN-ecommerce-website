// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.route.js";
// import productRoutes from "./routes/product.route.js";
// import cartRoutes from "./routes/cart.route.js";
// import couponRoutes from "./routes/coupon.route.js";
// import paymentRoutes from "./routes/payment.route.js";
// import analyticsRoutes from "./routes/analytics.route.js";
// import { connectDB } from "./lib/db.js";
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // middleware
// app.use(express.json({ limit: "50mb" }));
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/coupons", couponRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/analytics", analyticsRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
//   connectDB();
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database Before Starting Server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    // Middleware
    app.use(express.json({ limit: "50mb" }));
    app.use(cookieParser());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/coupons", couponRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use("/api/analytics", analyticsRoutes);

    // Global Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res
        .status(500)
        .json({ message: "Something went wrong!", error: err.message });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Start Server
startServer();
