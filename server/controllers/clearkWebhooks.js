/** @format */

import User from "../models/user.model.js";
import { Webhook } from "svix";

const clearkWebhooks = async (req, res) => {
  try {
    // Create a new webhook instance with the Clerk secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET); // spelling fix

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify the webhook signature
    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    const userData = {
      clerkId: data.id, // save Clerk ID separately for future use
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    switch (type) {
      case "user.created": {
        // Prevent duplicates based on Clerk ID
        const existing = await User.findOne({ clerkId: data.id });
        if (!existing) {
          await User.create(userData);
        }
        break;
      }
      case "user.updated": {
        await User.findOneAndUpdate({ clerkId: data.id }, userData, {
          new: true,
          upsert: true, // create if it doesn't exist
        });
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

export default clearkWebhooks;
