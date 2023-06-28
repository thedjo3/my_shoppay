import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id } = req.body;
    const user = await User.findById(user_id);
    
    if (!user) {
      return res.status(400).json({ message: "This Account does not exist. You will be redirected to home page." });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "This Account is already activated. You will be redirected to home page." });
    }

    await user.updateOne({
      emailVerified: true,
    });

    res.status(200).json({
      message: "Email succsessfully verified! You will be redirected to home page.",
    });

    await db.disconnectDb();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


handler.post(async (req, res) => {
  try {
    await db.connectDb();
    
    const { id, email } = req.body;
    const user = await User.findOne({ email });

    if (!id || !email || !user) {
      return res.status(400).json({ message: "We can't access this email right now. Please try again later." });
    }

    const activation_token = createActivationToken({
      id: user._id.toString(),
    });

    const url = `${process.env.BASE_URL}/auth/activate/${activation_token}`;

    sendEmail(email, url, "", "Activate your account.", activateEmailTemplate);

    await db.disconnectDb();

    res.json({
      message: "An email has been sent to you, use it to verify your email address.",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
