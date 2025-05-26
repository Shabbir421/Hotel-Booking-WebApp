/** @format */

import User from "../models/user.model.js";
import { Webhook } from "svix";

const clearkWebhooks = async (req, res) => {
  try {
    //create a new webhook instance with the secret
    const whook = new Webhook(process.env.CLEAR_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    //verify the headers
    await whook.verify(JSON.stringify(req.body), headers);

    //getting data from the request body
    const { data, type } = req.body;
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };
    //swithc case to handle different webhook types
    switch (type) {
      case "user.created": {
        //create a new user in the database
        await User.create(userData);
        break;
      }
      case "user.deleted": {
        //delete the user from the database
        await User.findByIdAndDelete(data._id);
        break;
      }
      case "user.updated":
        //update the user in the database
        await User.findByIdAndUpdate(data._id, userData);
        break;
      default:
        console.log("Unhandled webhook type:", type);
        break;
    }
    res.json({
      message: "Webhook processed successfully",
      sucess: true,
    });
  } catch (error) {
    console.error("Error clearing webhooks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default clearkWebhooks;
