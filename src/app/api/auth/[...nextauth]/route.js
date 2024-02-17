import mongoose from "mongoose";
import NextAuth from "next-auth";
import { User } from "../../models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect";

export const authOptions = {
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
	url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			id: "credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				console.log("");
				try {
					mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
					const { email, password } = credentials;
					const user = await User.findOne({ email });

					if (!user) {
						throw new Error("User not found");
					}

					const isPasswordValid = bcrypt.compareSync(password, user.password);

					if (!isPasswordValid) {
						throw new Error("Invalid password");
					}

					console.log("User authenticated successfully:", user);
					return user;
				} catch (error) {
					// Handle any errors (e.g., log them)
					console.error("Authentication error:", error.message);
					return null;
				}
			},
		}),
	],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
