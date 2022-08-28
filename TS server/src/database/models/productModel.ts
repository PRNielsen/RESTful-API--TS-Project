import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
    name: string,
    price: number,
    brand: string
}

export interface IProductModel extends IProduct, Document{}

const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    brand: {type: String, required: true}
},
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model<IProductModel>('Author', ProductSchema);