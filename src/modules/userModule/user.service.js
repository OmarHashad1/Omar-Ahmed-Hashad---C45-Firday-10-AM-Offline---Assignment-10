import { userModal } from "../../DB/models/users.model.js";

//1
export const signup = async ({ name, email, password, phone, age }) => {
  try {
    const emailExist = await userModal.findOne({ email });

    if (emailExist) throw new Error("Email already exists.");

    const user = await userModal.create({
      name,
      email,
      password,
      phone,
      age,
    });

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
//1

//2
export const login = async ({ email, password }) => {
  try {
    const userExist = await userModal.findOne({ email, password });

    if (!userExist) throw new Error("Email or password is wrong.");

    return "Login successfully";
  } catch (err) {
    throw new Error(err.message);
  }
};
//2



//3
export const updateUserInfo = async ({ name, email, age }) => {
  try {
    const emailExist = await userModal.findOne({ email });
    if (!emailExist) throw new Error("User not found.");

    const user = userModal.updateOne(
      { email },
      {
        name,
        age,
      },
    );

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
//3

//4
export const deleteUser = async (userId) => {
  try {
    const user = await userModal.findByIdAndDelete(userId);

    if (!user) throw new Error("User not found");

    return "User deleted";
  } catch (err) {
    throw new Error(err.message);
  }
};
//4

//5
export const getUserById = async (userId) => {
  try {
    const user = await userModal.findById(userId);

    if (!user) throw new Error("User not found");

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
//5
