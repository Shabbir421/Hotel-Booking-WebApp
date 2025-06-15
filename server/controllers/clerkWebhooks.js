/** @format */

import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify the webhook signature
    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created":
      case "user.updated": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address || "",
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
        };

        if (type === "user.created") {
          await User.create(userData);
        } else {
          await User.findOneAndUpdate({ clerkId: data.id }, userData);
        }
        break;
      }

      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        break;
      }

      default:
        console.log("Unhandled webhook type:", type);
        break;
    }

    res.json({
      message: "Webhook processed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error handling Clerk webhook:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default clerkWebhooks;
