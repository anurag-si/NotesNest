import Label from "../../Models/Label";
import { Response } from "express";
import TokenUtils from "../../Utilities/tokenUtils";
import { IUserCookie } from "../../Interfaces/User.interface";
import User from "../../Models/User";
import { IRequest } from "../../Interfaces/Request.interface";

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

export const getLabels = async (req: IUserCookie, res: Response) => {
  try {
    const userResponse = await TokenUtils.getUserId(req);
    const userId = userResponse._id;
    console.log("usersid", userId);
    const user = await User.findById(userId).populate("labels");
    if (!user) {
      return res.status(404).send("User not found");
    }

    const labels = user.labels;

    return res.status(200).json({ labels });
  } catch (error) {
    return res.status(400).send("Could not find User " + error);
  }
};

export const updateLabel = async (req: IRequest, res: Response) => {
  try {
    const labelId = req.params.id;

    const { labelName, labelType, notes, pinnedNotes } = req.body;

    if (!labelId) {
      return res.status(400).send("Label ID not provided");
    }

    const label = await Label.findById(labelId);

    if (!label) {
      return res.status(404).send("Label not found");
    }

    // Check if the label type is 'default', if so, prevent the update
    if (label.label_type === "default") {
      return res.status(403).send("Cannot update default labels");
    }

    label.label_name = labelName || label.label_name;
    label.label_type = labelType || label.label_type;
    label.notes = notes || label.notes;
    label.pinned_notes = pinnedNotes || label.pinned_notes;

    await label.save();

    return res.status(200).send("Label updated successfully");
  } catch (error) {
    console.error("Error in updating label:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteLabel = async (req: IRequest, res: Response) => {
  try {
    const labelId = req.params.id;

    // Check if labelId is provided
    if (!labelId) {
      return res.status(400).send("Label ID not provided");
    }

    const label = await Label.findById(labelId);
    if (!label) {
      return res.status(404).send("Label not found");
    }

    if (label.label_type === "default") {
      return res.status(403).send("Cannot delete default labels");
    }

    label.deleteOne();

    return res.status(200).send("Label deleted successfully");
  } catch (error) {
    console.error("Error in deleting label:", error);
    return res.status(500).send("Internal Server Error");
  }
};
