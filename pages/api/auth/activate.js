import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
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

export default handler;
