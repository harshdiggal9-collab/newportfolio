import mongoose from "mongoose";
import dns from "node:dns";

// Prefer IPv4 — helps on some Windows setups where IPv6/DNS behaves badly
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

// Optional: force public DNS for Node's resolver (helps if ISP DNS blocks SRV)
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // ignore if not supported
}

const connectDB = async () => {
  // Use MONGO_URI_DIRECT if set — standard mongodb:// host list (no SRV). Use when querySrv fails (VPN/firewall/DNS).
  const uri = process.env.MONGO_URI_DIRECT?.trim() || process.env.MONGO_URI?.trim();

  if (!uri) {
    throw new Error("Set MONGO_URI or MONGO_URI_DIRECT in server/.env");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 20000,
      family: 4
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    if (String(err.message).includes("querySrv") || String(err.code) === "ECONNREFUSED") {
      console.error(`
→ SRV DNS failed (common with VPN, corporate firewall, or broken DNS).

Fix options:
  1) Change PC DNS to 8.8.8.8 / 1.1.1.1, disconnect VPN, retry.
  2) Atlas → Connect → Drivers → copy the "standard connection string" (mongodb://… not mongodb+srv://).
     Put it in server/.env as MONGO_URI_DIRECT="mongodb://..."
  3) Atlas → Network Access → allow your IP (or 0.0.0.0/0 for testing).
`);
    }
    throw err;
  }
};

export default connectDB;
