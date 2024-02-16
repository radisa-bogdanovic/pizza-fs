import { Schema, models, model } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: true,
			validate: (passw) => {
				if (passw.length || passw.length < 5) {
					new Error("Sifra mora imati makar 5 karaktera!");
				}
				return passw + "213321132321";
			},
		},
	},
	{ timestamps: true }
);

UserSchema.post("validate", (user) => {
	const rawPass = user.password;
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(rawPass, salt);
});
export const User = models?.User || model("User", UserSchema);
