/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import ShopModel from "./shop.model";
import { SortOrder } from "mongoose";
const createProduct = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await ShopModel.create(data);
    return res.json({
      status: "true",
      message: "Product Created Successfully.",
      data: result,
    });
  } catch (error) {
    return res.json({ status: "false", message: "Failed to create Product." });
  }
});
const allProduct = catchAsync(async (req: Request, res: Response) => {
  try {
    const { color, size, name, minPrice, maxPrice, sortBy, sortOrder } =
      req.query;
    // Sorting logic
    let sortOptions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
      sortOptions[sortBy as string] = sortOrder === "asc" ? 1 : -1;
    }

    const options = {
      sort: sortOptions,
    } as {
      sort: { [key: string]: SortOrder };
    };
    // console.log("options:", options);
    const query: any = {};

    if (name) {
      query["name"] = new RegExp(name as string, "i");
    }

    if (color) {
      query["variations.color"] = color;
    }
    if (size) {
      query["variations.size"] = size;
    }
    if (minPrice && maxPrice) {
      // If price is provided as a range (minPrice-maxPrice)
      query["price"] = { $gte: minPrice, $lte: maxPrice };
    }

    const products = await ShopModel.find(query).sort(options.sort);

    res.json({
      status: "true",
      message: "Data fetched successfully.",
      data: products,
    });
  } catch (error) {
    return res.json({ status: "false", message: "Failed to retrive Product." });
  }
});
const userProduct = catchAsync(async (req: Request, res: Response) => {
  try {
    const { userId }: any = req.user;
    console.log("userId:", userId);
    const result = await ShopModel.find({ userId: userId });
    return res.json({
      status: "true",
      message: "Product retrive Successfully.",
      data: result,
    });
  } catch (error) {
    return res.json({ status: "false", message: "Failed to retrive Product." });
  }
});
const singleProduct = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //console.log("id:", id);
    const result = await ShopModel.findById(id);
    return res.json({
      status: "true",
      message: "Product retrive Successfully.",
      data: result,
    });
  } catch (error) {
    return res.json({ status: "false", message: "Failed to retrive Product." });
  }
});
export const shopController = {
  createProduct,
  allProduct,
  userProduct,
  singleProduct,
};
