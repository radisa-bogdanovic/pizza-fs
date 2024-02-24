import { Category } from "../models/Category";
import mongoose from "mongoose";

export async function POST(req) {
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	const { name } = await req.json();

	const createCategory = await Category.create({ name });
	return Response.json(createCategory);
}

export async function PUT(req) {
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	const { _id, name } = await req.json();
	await Category.updateOne({ _id }, { name });
	return Response.json(true);
}

export async function GET() {
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	return Response.json(await Category.find());
}
