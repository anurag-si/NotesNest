import express from "express";
import User from "../../Models/User";
import { Utils } from "Utilities/utils";

interface RequestBody {
  label: string;
}

export const addNote = async (req: any, res: any) => {
  const { label } = req.body;
  const userId = await req.cookies.username;

  try {
    const existingUser = await findUser(userId);

    if (existingUser) {
      existingUser.label.push(label);
      await existingUser.save();
      res.status(200).json({ message: "Note added successfully." });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error adding note:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

async function findUser(userId: string) {
  if (Utils.validateEmail(userId)) {
    return await User.findOne({ email: userId });
  } else {
    return await User.findOne({ username: userId });
  }
}
