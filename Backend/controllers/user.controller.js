import User from "../models/user.model.js";
import crypto from "crypto";
import AppError from "../utils/error.util.js";

const cookieOptions = {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: 'None'
}

const signup = async function (req, res, next) {
    try {
        console.log("Hii")
        const { fullName, email, password } = req.body;
        let uploads = [];

        if (!fullName || !email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        const userExists = await User.findOne({
            email
        });

        if (userExists) {
            return next(new AppError('Email already exists', 400));
        }

        const user = await User.create({
            fullName,
            email,
            password,
            uploads
        });

        if (!user) {
            return next(new AppError("User resgistration failed, please try again."), 400);
        }

        await user.save();
        user.password = undefined;

        const token = await user.generateJWTtoken();
        res.cookie('token', token, cookieOptions);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const login = function (req, res, next) {

}

export {
    signup,
    login
}