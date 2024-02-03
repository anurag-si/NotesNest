import Label from "../../Models/Label";
import { Response } from "express";
import TokenUtils from "../../Utilities/tokenUtils";
import { IUserCookie } from "../../Interfaces/User.interface";

export const createLabel = async (req: IUserCookie, res: Response) => {
  try {
    const { labelName, labelType, notes, pinnedNotes } = req.body;

    if (!labelName || !labelType) {
      return res
        .status(400)
        .send("Missing required fields: labelName and labelType");
    }

    let user;
    try {
      const userResponse = await TokenUtils.getUserId(req);
      console.log("got user", userResponse._id);
      user = userResponse;
    } catch (error) {
      return res.status(400).send("Could not find User");
    }

    const newLabel = new Label({
      label_name: labelName,
      label_type: labelType,
      pinned_notes: pinnedNotes,
      notes: notes,
    });

    await newLabel.save();

    console.log("[INSERTED LABEL]");

    if (!user) {
      return res.status(400).send("User Id Not found");
    }

    const resp = user.labels.push(newLabel._id);
    console.log(resp);
    await user.save();

    return res.status(201).send("Label Created Successfullt");
  } catch (error) {
    console.error("Error in creating label");
    return res.status(400).send("Could not create label please try again");
  }
};
