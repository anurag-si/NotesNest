import express from "express";
import User from "../../Models/User";

export const deleteNote = async (req: any, res: any) => {
  const username = await req.cookies.username;

  try {
    const existingUser = await User.findOne({ username });
    const id = existingUser?.username;
    console.log(id)
    const deleted =await User.findOneAndDelete({username: id});

    if (deleted) {
      res.status(200).json({ message: "Deleted Username" });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
