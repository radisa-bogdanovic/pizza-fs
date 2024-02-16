import mongoose from "mongoose";
import { User } from "../models/User";

// Establish database connection

export async function POST(req) {
	const body = await req.json();
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	const pass = body.password;

	if (!pass?.length || pass.length < 5) {
		return Response.json(
			{
				message: "Password must be at least 5 characters",
				status: 400,
				ok: false,
			},
			{
				status: 400,
			}
		);
	}

	const createdUser = await User.create(body);
	return Response.json(createdUser);
}
