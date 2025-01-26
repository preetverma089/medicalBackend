import userSchema from "../models/userRegister.js";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
export const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find().lean();
    if (!users.length > 0)
      return res.send({ message: "users not fetched", status: 401 });

    return res.send({
      message: "users fetched succesfully",
      users,
      status: 200,
    });
  } catch (error) {
    return res.send({ message: error.message, status: 500 });
  }
};

export const Register = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
    };
    const isUserExists = await userSchema.find({ email: req.body.email });
    if (!isUserExists)
      return res.send({ message: "User already exists", status: 401 });

    const hashPassword = await bcrypt.hash(user.password, 10);
    if (!hashPassword)
      return res.send({
        message: "something went wrong, password hashing",
        status: 401,
      });

    const userDetails = { ...user, password: hashPassword };
    const createUser = await userSchema.create(userDetails);
    if (!createUser)
      return res.send({ message: "something went wrong", status: 401 });
    return res.send({
      message: "user created succesfully",
      status: 200,
      user: createUser,
    });
  } catch (error) {
    res.send({ message: error.message, status: 500 });
  }
};

export const Login = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const isUserExist = await userSchema.findOne({ email: user.email });
    if (!isUserExist)
      return res.send({
        message: "user not exists",
        status: 401,
      });
    const isPasswordmatch = await bcrypt.compare(
      user.password,
      isUserExist.password
    );
    if (!isPasswordmatch)
      return res.send({
        message: "credentials wrong ",
        status: 401,
      });

    const token = Jwt.sign(
      {
        userId: isUserExist._id,
        userEmail: isUserExist.email,
        userName: isUserExist.fullName,
      },
      "USERDETAILS",
      {
        expiresIn: "1d",
      }
    );
    res.send({
      message: "user loggedIN",
      authToken: token,
      userDetails: { email: isUserExist.email, fullName: isUserExist.fullName },
      status: 200,
    });
  } catch (error) {
    res.send({ message: "something went wrong", status: 500 });
  }
};
