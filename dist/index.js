import express from "express";
// import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db.js";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    console.log("hitting get endpoint");
    res.json({ msg: "Get endpoint" });
});
// sign up
app.post("/api/v1/signup", async (req, res) => {
    // zod validation, hash the password
    const { username, password } = req.body;
    try {
        await UserModel.create({
            username,
            password,
        });
        res.json({
            message: "User signed up!",
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({
            message: "User already exist",
        });
    }
});
// sign in
app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await UserModel.findOne({
        username,
        password,
    });
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id,
        }, JWT_SECRET);
        res.json({ token });
    }
    else {
        res.json({
            message: "Incorrect credentials",
        });
    }
});
// create content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { title, link } = req.body;
    await ContentModel.create({
        title,
        link,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.json({ message: "Content added" });
});
// get content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({ userId }).populate("userId", "username");
    res.json({
        content,
    });
});
// delete content
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId,
    });
    res.json({ message: "Deleted" });
});
app.post("/api/v1/brain/share", (req, res) => {
    res.json({ message: "Brain shared" });
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
    res.json({ shareLink: req.params.shareLink });
});
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
//# sourceMappingURL=index.js.map