import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import User from "../models/User.js";

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

// LOGIN IN
export const login = async (request, response) => {
  try {
    const [email, password] = request.body.auth;
    const user = await User.findOne({ email: email });
    if (!user) return response.status(400).json("User does not exist.");
    const isMach = await bcrypt.compare(password, user.password);
    if (!isMach)
      return response.status(400).json({ msg: "Invalid credentials" });

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    response.status(200).json({ token, user });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
