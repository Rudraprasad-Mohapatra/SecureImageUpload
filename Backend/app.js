import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import errorMiddleware from './middlewares/error.middleware.js';
import { config } from 'dotenv';

config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

console.log(process.env.FRONTEND_URL)

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/post", postRoutes);

app.all("*", (req, res) => {
    res.status(404).send("OOPS!! 404 page not found")
})

app.use(errorMiddleware);

export default app;
