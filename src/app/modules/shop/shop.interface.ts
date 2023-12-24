import { Model, Types } from "mongoose";

export type IShop = {
  userId: Types.ObjectId;
  name: string;
  title: string;
  stock: Number;
  price: Number;
  image: [string];
  variations: [{ color: string; size: [string] }];
};
export type IShopModel = Model<IShop, Record<string, unknown>>;
// price, name, type, processor, memory, OS.
/*
color: String,
size: String,
price: Number,
image: String,
});

const productSchema = new Schema({
title: String,
price: Number,
variations: [variationSchema],
});

*/
