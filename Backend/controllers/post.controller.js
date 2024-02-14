import fs from "fs";
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
export const postphotos = async function (req, res, next) {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        if (req.method === 'POST') {
            const urls = []
            const files = req.files;

            for (const file of files) {
                try {
                    const result = await cloudinary.v2.uploader.upload(file.path, {
                        folder: 'mulimgs',
                        crop: 'fill'
                    });
                    urls.push(result);
                    user.uploads.push(result.secure_url)
                    fs.rmSync(`uploads/${file.filename}`);
                } catch (e) {
                    return next(new AppError(error || 'File not uploaded, please try again.', 400));
                }
            }
            await user.save();
            user.password = undefined;
        }
        res.status(200).json({
            success: true,
            message: 'Photos uploaded successfully',
            user: user
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }

}