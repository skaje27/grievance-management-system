const User = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const { createSecretToken } = require("../util/SecretToken");

// User registration
module.exports.userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Check if the email is in the 'admin' format
    const isAdmin = email.toLowerCase().endsWith(".kar.in");

    // Prevent administrators from registering
    if (isAdmin) {
      return res.json({ message: "Administrators cannot register directly. Please use backend credentials to log in." });
    }

    // Check password length constraint
    if (password.length < 8) {
      return res.json({ message: "Password should be at least 8 characters long" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword, isAdmin });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res.status(201).json({ message: "User registered successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", success: false });
  }
};

// User login
module.exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: 'All fields are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'Incorrect password or email' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ message: 'Incorrect password or email' });
    }

    // Determine the isAdmin status based on email format
    const isAdmin = email.toLowerCase().endsWith(".kar.in");
    
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user,
      isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", success: false });
  }
    // Controller function to log out the user
    exports.logout = (req, res) => {
    // Handle user logout by clearing the token or session.
    res.clearCookie("token"); // Clear the token cookie
    res.status(200).json({ message: 'User logged out successfully' });
  };
};