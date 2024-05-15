import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  CategoryName: String,
});

const Category = model("Category", CategorySchema);

export default Category;
