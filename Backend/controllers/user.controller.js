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

const login = async function (req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        const user = await User.findOne({
            email
        }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError("Email or password does not match", 400));
        }

        const token = await user.generateJWTtoken();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "User loggedin successfully",
            user
        });
    } catch (e) {
        return next(new AppError("Email or password does not match", 500));
    }
}

const logout = (req, res) => {
    res.cookie("token", null, {
        secure: true,
        httpOnly: true,
        maxAge: 0
    })

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
}

export {
    signup,
    login,
    logout
}