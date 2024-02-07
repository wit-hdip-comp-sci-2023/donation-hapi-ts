import { User } from "../../types/donation-types.js";
import { UserMongoose } from "./user.js";

export const userStore = {
  async find() {
    const users = await UserMongoose.find().lean();
    return users;
  },

  async findOne(id: string) {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async add(user: User) {
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    return userObj;
  },

  async findBy(email: string) {
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async deleteOne(id: string) {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async delete() {
    await UserMongoose.deleteMany({});
  },
};
