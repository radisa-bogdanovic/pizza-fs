import { MenuItem } from "../models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	const { data } = await req.json();

	const createMenuItem = await MenuItem.create(data);
	return Response.json(createMenuItem);
}

export async function PUT(req) {
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	const { _id, ...data } = await req.json();
	await MenuItem.updateOne({ _id }, data);
	return Response.json(true);
}

export async function GET() {
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	return Response.json(await MenuItem.find());
}
