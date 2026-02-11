import { model, Schema } from "mongoose";

const noteModel = model(
  "Note",
  new Schema(
    {
      title: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return value !== value.toUpperCase();
          },
          message: "Title is upper case",
        },
      },
      content: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default noteModel;
