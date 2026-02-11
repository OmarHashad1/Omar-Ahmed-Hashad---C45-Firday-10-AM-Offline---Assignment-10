import { Router } from "express";
import { createNote, deleteAllUserNotes, deleteNote, getNoteByContent, getNoteById, getNotesAggregate, getNotesWithUser, getPaginatedNotes, replaceNote, updateAllUserNotes, updateNote } from "./note.service.js";

export const noteRouter = new Router();

//1
noteRouter.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const payload = await createNote({ title, content, userId });
    if (payload) return res.status(201).json({ message: payload });
  } catch (err) {
    throw new Error(err);
  }
});
//1



//4
noteRouter.patch("/all", async (req, res) => {
  try {
    const { userId, title } = req.body;
    const payload = await updateAllUserNotes({ userId, title });
    if (payload) return res.status(200).json({ message: payload });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//4

//2
noteRouter.patch("/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, userId } = req.body;
    const payload = await updateNote({ noteId, title, content, userId });
    if (payload) return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//2

//3
noteRouter.put("/replace/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, userId, requestUserId } = req.body;
    const payload = await replaceNote({ noteId, title, content, userId, requestUserId });
    if (payload) return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//3

//11
noteRouter.delete("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const payload = await deleteAllUserNotes({ userId });
    return res.status(200).json({ message: payload });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//11

//5
noteRouter.delete("/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    const { userId } = req.body;
    const payload = await deleteNote({ noteId, userId });
    if (payload) return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//5

//6
noteRouter.get("/paginate-sort", async (req, res) => {
  try {
    const { userId } = req.body;
    const { page = 1, limit = 10 } = req.query;
    const payload = await getPaginatedNotes({ userId, page: parseInt(page), limit: parseInt(limit) });
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//6

//8
noteRouter.get("/note-by-content", async (req, res) => {
  try {
    const { userId } = req.body;
    const { content } = req.query;
    const payload = await getNoteByContent({ userId, content });
    if (payload) return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//8

//9
noteRouter.get("/note-with-user", async (req, res) => {
  try {
    const { userId } = req.body;
    const payload = await getNotesWithUser({ userId });
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//9

//10
noteRouter.get("/aggregate", async (req, res) => {
  try {
    const { userId } = req.body;
    const { title } = req.query;
    const payload = await getNotesAggregate({ userId, title });
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//10

//7
noteRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const payload = await getNoteById({ noteId: id, userId });
    if (payload) return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});
//7
