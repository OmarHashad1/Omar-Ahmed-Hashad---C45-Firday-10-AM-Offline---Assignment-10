import { Router } from "express";
import { deleteUser, getUserById, login, signup, updateUserInfo } from "./user.service.js";

export const userRouter = new Router();

//1
userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, age } = req.body;
    const payload = await signup({ name, email, password, phone, age });
    if (payload)
      return res.status(201).json({ message: "success", data: payload });
  } catch (err) {
    throw new Error(err);
  }
});
//1

//2
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const payload = await login({ email, password });
    if (payload) return res.status(201).json({ message: payload });
  } catch (err) {
    throw new Error(err);
  }
});
//2

//3
userRouter.patch("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const payload = await updateUserInfo({ name, email, age });
    if (payload)
      return res.status(201).json({ message: "success", data: payload });
  } catch (err) {
    throw new Error(err);
  }
});
//3

//4
userRouter.delete("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const payload = await deleteUser(userId);
    if (payload) return res.status(200).json({ message: payload });
  } catch (err) {
    throw new Error(err);
  }
});
//4

//5
userRouter.get("/users", async (req, res) => {
  try {
    const { userId } = req.body;
    const payload = await getUserById(userId);
    if (payload) return res.status(200).json(payload);
  } catch (err) {
    throw new Error(err);
  }
});
//5