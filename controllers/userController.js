const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const signup = async (req, res) => {
    try {
      const { fname, lname, phone, email, password } = req.body;
  
      // Ensure required fields are provided
      if (!fname || !lname || !phone || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Check if phone or email already exists
      const existingUserByPhone = await User.findOne({ phone });
      if (existingUserByPhone) {
        return res.status(400).json({ message: 'Phone number already exists' });
      }
  
      if (email) {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
          return res.status(400).json({ message: 'Email address already exists' });
        }
      }
  
      // Create new user
      const user = new User({ fname, lname, phone, email, password });
      await user.save();
  
      // Generate JWT token
      const token = generateToken(user);
  
      res.status(201).json({
        message: 'User created successfully',
        user: { fname: user.fname, lname: user.lname, email: user.email },
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

const login = async (req, res) => {
    try {
      const { emailOrPhone, password } = req.body;
  
      // Find user by email or phone number
      const user = await User.findOne({
        $or: [
          { email: emailOrPhone },
          { phone: emailOrPhone },
        ],
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Validate password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = generateToken(user);
  
      res.json({
        message: 'Login successful',
        user: { fname: user.fname, lname: user.lname, email: user.email },
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Function to get users by their fname, or fname and lname with/without space
const getUsersByName = async (req, res) => {
  try {
    const { name } = req.params; // Get the search term from request parameters

    if (!name) {
      return res.status(400).json({ message: "Name parameter is required" }); // Validate input
    }

    // Build a regex to match the first name or the concatenated first and last name
    const nameRegex = new RegExp(name, 'i');

    // Find users whose first name, last name, or concatenated name matches the regex
    const users = await User.find({
      $or: [
        { fname: nameRegex }, // Match first name
        { lname: nameRegex }, // Match last name
        { fullName: nameRegex } // Optional: Create a 'fullName' field that concatenates fname and lname
      ],
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with the given name" });
    }

    res.status(200).json({ message: "Users found", users }); // Return the matching users
  } catch (error) {
    console.error("Error fetching users by name:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Function to fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field from the response
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  module.exports = { signup, login,  getUsersByName, getAllUsers, };