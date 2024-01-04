const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../backend/db'); // Assuming the User model is defined in a separate file

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.render('Login');
  });
// Handle user registration
app.post('/register', async (req, res) => {
  try {
    // Create a new user based on the form data
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).send('User registered successfully!');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the provided password matches the user's password
    if (password === user.password) {
      // Passwords match, consider the user logged in
      return res.status(200).send('User logged in successfully!');
    } else {
      // Passwords do not match
      return res.status(401).send('Invalid password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
