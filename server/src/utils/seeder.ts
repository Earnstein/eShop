import { products, users } from "../constants";
import Product from "../models/productModel";
import Order from "../models/orderModel";
import User from "../models/userModel";

export const addData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const seedUsers = await User.insertMany(users);
    const adminUser = seedUsers[0]._id;
    const seedProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(seedProducts);
    console.log(`Data seeded successfully`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error seeding file: ${error}`.red.inverse);
    process.exit(1);
  }
};

export const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data removed successfully`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error removing seeded data: ${error}`.red.inverse);
    process.exit(1);
  }
};
