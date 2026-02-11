import express from "express";
import dotenv from "dotenv";
import { userModal } from "./DB/models/users.model.js";
import { DBConnection } from "./DB/db.connection.js";
import { userRouter } from "./modules/userModule/user.controller.js";
import { noteRouter } from "./modules/noteModule/note.controller.js";
export const bootstrap = () => {
  const app = express();

  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/notes", noteRouter);

  dotenv.config();
  DBConnection();

  app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
  );

  app.use((err, req, res, next) => {
    if (err) {
      res.status(500).json({ message: err.message });
    }
  });
};
