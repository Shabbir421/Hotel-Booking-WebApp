// /** @format */
// const jwt = require("jsonwebtoken");

// const genToken = async (userId) => {
//   try {
//     const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     return token;
//   } catch (error) {
//     console.error("Error generating token:", error);
//     throw new Error("Token generation failed");
//   }
// };

// module.exports = { genToken };
