import { Schema, model, Document, CallbackError } from 'mongoose';
import { hashPassword, comparePassword } from '../utils/passwordUtils';

export interface IUser extends Document {
  email: string;
  password: string;
  role: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Boolean, required: true }
});

userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  try {
    user.password = await hashPassword(user.password);
    next();
  } catch (err: unknown) {
    next(err as CallbackError);
  }
});

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return comparePassword(candidatePassword, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;