import { Schema, models, model } from "mongoose";

const MenuItemSchema = new Schema(
	{
		name: { type: String },
		description: { type: String },
		image: { type: String },
		basePrice: { type: String },
	},
	{ timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
