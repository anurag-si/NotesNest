import User from "../../Models/User";
import { IUserLogin } from "../../Interfaces/User.interface";
import TokenUtils from "../../Utilities/jwtToken";
import Utils from "../../Utilities/Utils";

export const login = async (
  req: IUserLogin,
  res: any,
  next: any
): Promise<void> => {
  const { userId, password } = req.body;

  try {
    if (Utils.validateEmail(userId)) {
      const existingEmail = await User.findOne({ email: userId });

      if (!existingEmail) {
        return res.status(404).json({ message: "Email not found" });
      }

      TokenUtils.passwordVerification(password, existingEmail.password)
        .then(() => {
          console.log(res, "res");
          TokenUtils.generateToken(userId, res);
          res.status(200).json({ message: "Login Success" });
        })
        .catch((error) => {
          res.status(401).send({
            message: "Password Incorrect",
          });
        });
    } else {
      const existingUsername = await User.findOne({ username: userId });
      if (!existingUsername) {
        return res.status(404).json({ message: "Username not found" });
      }

      TokenUtils.passwordVerification(password, existingUsername.password)
        .then(() => {
          TokenUtils.generateToken(userId, res);
          res.status(200).json({ message: "Login Success" });
        })
        .catch((error) => {
          res.status(401).send({
            message: "Password Incorrect",
          });
        });
    }
  } catch (error: any) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
