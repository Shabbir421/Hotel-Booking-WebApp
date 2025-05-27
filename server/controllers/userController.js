/** @format */

// get api/user/

export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.json({
      message: "User data fetched successfully",
      success: true,
      role,
      recentSearchedCities,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const storeRecentSearchedCity = async (req, res) => {
  try {
    const { recentSearchedCities } = req.body;
    const user = await req.user;

    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCities);
    } else {
      user.recentSearchedCities.shift(); // Remove the oldest city
      user.recentSearchedCities.push(recentSearchedCities); // Add the new city
    }

    await user.save();
    res.json({
      message: "Recent searched city stored successfully",
      success: true,
      recentSearchedCities: user.recentSearchedCities,
    });
  } catch (error) {
    console.error("Error storing recent searched city:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
