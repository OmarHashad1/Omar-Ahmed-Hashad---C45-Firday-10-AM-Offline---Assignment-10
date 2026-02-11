import noteModel from "../../DB/models/notes.model.js";

//1
export const createNote = async ({ title, content, userId }) => {
  try {
    const note = await noteModel.create({
      title,
      content,
      userId,
    });

    return "Note created";
  } catch (err) {
    throw new Error(err.message);
  }
};
//1

//2
export const updateNote = async ({ noteId, title, content, userId }) => {
  try {
    const note = await noteModel.findById(noteId);

    if (!note) throw new Error("Note not found");

    if (note.userId.toString() !== userId) throw new Error("You are not the owner");

    const updatedNote = await noteModel.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );

    return { message: "updated", note: updatedNote };
  } catch (err) {
    throw new Error(err.message);
  }
};
//2

//3
export const replaceNote = async ({ noteId, title, content, userId, requestUserId }) => {
  try {
    const note = await noteModel.findById(noteId);

    if (!note) throw new Error("Note not found");

    if (note.userId.toString() !== requestUserId) throw new Error("You are not the owner");

    const replacedNote = await noteModel.findByIdAndReplace(
      noteId,
      { title, content, userId },
      { new: true }
    );

    return replacedNote;
  } catch (err) {
    throw new Error(err.message);
  }
};
//3

//4
export const updateAllUserNotes = async ({ userId, title }) => {
  try {
    const result = await noteModel.updateMany(
      { userId },
      { title }
    );

    if (result.matchedCount === 0) throw new Error("No note found");

    return "All notes updated";
  } catch (err) {
    throw new Error(err.message);
  }
};
//4

//5
export const deleteNote = async ({ noteId, userId }) => {
  try {
    const note = await noteModel.findById(noteId);

    if (!note) throw new Error("Note not found");

    if (note.userId.toString() !== userId) throw new Error("You are not the owner");

    const deletedNote = await noteModel.findByIdAndDelete(noteId);

    return { message: "deleted", note: deletedNote };
  } catch (err) {
    throw new Error(err.message);
  }
};
//5

//6
export const getPaginatedNotes = async ({ userId, page, limit }) => {
  try {
    const skip = (page - 1) * limit;
    const notes = await noteModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return notes;
  } catch (err) {
    throw new Error(err.message);
  }
};
//6

//7
export const getNoteById = async ({ noteId, userId }) => {
  try {
    const note = await noteModel.findById(noteId);

    if (!note) throw new Error("Note not found");

    if (note.userId.toString() !== userId) throw new Error("You are not the owner");

    return note;
  } catch (err) {
    throw new Error(err.message);
  }
};
//7

//8
export const getNoteByContent = async ({ userId, content }) => {
  try {
    const note = await noteModel.findOne({ userId, content });

    if (!note) throw new Error("No note found");

    return note;
  } catch (err) {
    throw new Error(err.message);
  }
};
//8

//9
export const getNotesWithUser = async ({ userId }) => {
  try {
    const notes = await noteModel
      .find({ userId })
      .select("title userId createdAt")
      .populate("userId", "email");

    return notes;
  } catch (err) {
    throw new Error(err.message);
  }
};
//9

//10
export const getNotesAggregate = async ({ userId, title }) => {
  try {
    const matchStage = { userId };
    if (title) {
      matchStage.title = title;
    }

    const notes = await noteModel.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          title: 1,
          userId: 1,
          createdAt: 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
    ]);

    return notes;
  } catch (err) {
    throw new Error(err.message);
  }
};
//10

//11
export const deleteAllUserNotes = async ({ userId }) => {
  try {
    await noteModel.deleteMany({ userId });

    return "Deleted";
  } catch (err) {
    throw new Error(err.message);
  }
};
//11