import { Schema, model } from "mongoose";
import { IShop, IShopModel } from "./shop.interface";

const shopSchema = new Schema<IShop>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    title: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    image: [{ type: String, required: true }],
    variations: [
      {
        color: { type: String, required: true },
        size: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }
);

const ShopModel = model<IShop, IShopModel>("Shop", shopSchema);

export default ShopModel;
// variations: [{ color: string; size: [string] }];
//variations: [color: [string], size: [string]];
/*
  userId: Types.ObjectId;
  name: string;
  variations: [
    {
      size: string;
      color: string;
      image: string;
      price: Number;
    }
  ];
*/
