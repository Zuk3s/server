import bcrypt from "bcryptjs/dist/bcrypt";
import JWT from "jsonwebtoken";
import { User } from "../models/User.js";

// REGISTER USER
export const register = async (request, response) => {
  try {
    const {
      fistName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      ocuppation,
    } = request.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      fistName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      ocuppation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();

    response.status(201).send(savedUser);
  } catch (err) {
    return (
      response.status(500),
      response.send({ error: err.message }, "Error on registration")
    );
  }
};
