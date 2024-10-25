import Bun from "bun";
import { Schema, model, Document } from "mongoose";

export interface I_UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<I_UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await Bun.password.hash(this.password, {
        algorithm: "bcrypt",
        cost: 10,
      });
      this.password = hashedPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = model<I_UserDocument>("User", UserSchema);
export default User;
