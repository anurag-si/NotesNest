import User from "../../Models/User";
import { IUserLogin } from "../../Interfaces/User.interface";
import TokenUtils from "../../Utilities/tokenUtils";
import { Utils } from "../../Utilities/utils";

export const Login = async (req: IUserLogin, res: any): Promise<void> => {
  const { userId, password } = req.body;

  try {
    if (Utils.validateEmail(userId)) {
      const existingEmail = await User.findOne({ email: userId });

      if (!existingEmail) {
        return res.status(404).json({ message: "Email not found" });
      }

      TokenUtils.passwordVerification(password, existingEmail.password)
        .then(() => {
          TokenUtils.generateToken(userId, res);
          res.status(200).json({ message: "Login Success" });
        })
        .catch((error) => {
          res.status(401).send({
            message: "Password Incorrect",
            error,
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
            error,
          });
        });
    }
  } catch (error: any) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
