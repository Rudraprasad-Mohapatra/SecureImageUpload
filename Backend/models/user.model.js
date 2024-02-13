import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be atleast 5 character'],
        maxLength: [50, 'Name should be less than 50 characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, 'Password must be atleast 8 characters'],
        select: false
    },
    uploads: {
        type: Array,
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods = {
    generateJWTtoken: async function () {
        const payload = {
            id: this._id,
            email: this.email,
        }
        const secretkey = process.env.JWT_SECRET;
        const options = { expiresIn: process.env.JWT_EXPIRY }

        return await JWT.sign(payload, secretkey, options);
    },
    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    }
}

const User = model('User', userSchema);

export default User;

