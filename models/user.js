import { Schema, model } from 'mongoose';
import bcrypt from "bcryptjs";
import validator from "validator";

const UserSchema = new Schema({
  username: {
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
  stories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Story',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next){

  if(!validator.isStrongPassword(this.password)) {
    throw new Error('Password not strong enough')
  }
  
  if(!this.isModified('password')){
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password)
}

const User = model('User', UserSchema);

export default User;
