import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../models/User";
export async function PUT(req) {
	mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
	const data = await req.json();
	const sesija = await getServerSession(authOptions);
	const email = sesija.user.email;

	const user = await User.findOne({ email });

	if ("name" in data) {
		await User.updateOne({ email }, { name: data.name });
	}
	return Response.json(true);
}
