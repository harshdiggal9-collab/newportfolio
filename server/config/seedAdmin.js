import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || "harsh@gmail.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "arjunpapa";

  const existing = await User.findOne({ email });
  if (existing) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({
    email,
    passwordHash,
    role: "admin"
  });

  console.log(`Default admin created: ${email}`);
};

export default seedAdmin;
