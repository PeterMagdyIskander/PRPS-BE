const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");
const FRONTEND_URL = process.env.FRONTEND_URL;
const appDataSource = require("../dataSource");
let handleForgetPasswordForTestingMessage;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pepomagdy999@gmail.com",
    pass: "yqhb mkgu fnnm tain",
  },
});

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and Password are required." });

  try {
    const response = await axios.get(`${process.env.ACCOUNT_MANAGER_URL}/users/${email}`);
    const userData = response.data;
    if (!userData) return res.sendStatus(401);

    // const match = await bcrypt.compare(password, foundUser.password);

    if (userData.password === password) {
      const accessToken = jwt.sign(
        {
          email: userData.email,
          role: userData.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1hr" }
      );
      res.status(200).json({
        role: userData.role,
        token: accessToken,
        message: "success",
        id:userData.id
      });
    } else {
      return res.status(401).json({ message: "Password is incorrect." });
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res
      .status(401)
      .json({ error: "Email is either incorrect or does not exist" });
  }
};

const handleVerify = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "unauthorized" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "unauthorized" });
    req.user = decoded.email;
    res.status(200).json({ message: "success" });
  });
};

const handleSignup = async (req, res) => {
  const { company, occupation, firstName, lastName, email } = req.body;
  if (!company || !occupation || !firstName || !lastName || !email)
    return res
      .status(400)
      .json({ message: "Please provide all the required fields." });
  if (
    firstName.includes(" ") ||
    firstName.length > 100 ||
    !isOnlyLetters(firstName)
  )
    return res.status(400).json({ message: "First name is invalid." });
  if (
    lastName.includes(" ") ||
    lastName.length > 100 ||
    !isOnlyLetters(lastName)
  )
    return res.status(400).json({ message: "Last name is invalid." });
  if (!validateEmail(email))
    return res.status(400).json({ message: "Please enter a valid email." });

  try {
    const response = await axios.get(`${process.env.ACCOUNT_MANAGER_URL}/users/${email}`);
    if (response.status === 200)
      return res.status(401).json({ message: "Mail already exists." });
  } catch (error) {
    if (error.response && error.response.status === 400) {
      try {
        await axios.post(`${process.env.ACCOUNT_MANAGER_URL}/users/signup`, {
          company,
          occupation,
          firstName,
          lastName,
          email,
        });

        return res.status(201).json({
          message: "User info has been saved and sent to another service.",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Error saving user info or sending it to another service.",
        });
      }
    } else {
      return res
        .status(500)
        .json({ error: "Error fetching emails from database" });
    }
  }
};

const handleUpdatePassword = async (req, res) => {
  const { email, password } = req.body;
  const validation = validatePassword(password);
  if (!validateEmail(email))
    return res.status(400).json({ message: "Please enter a valid email." });
  if (!validation.valid) {
    return res.status(400).json({
      message: validation.message,
    });
  }
  try {
    await axios.post(`${process.env.ACCOUNT_MANAGER_URL}/users/updatePassword`, {
      email,
      password,
    });

    res.status(201).json({
      message: "Password has been updated successfully",
    });
  } catch (error) {
    if (error.response.status === 404) {
      res.status(400).json({
        message: "Email not found!",
      });
    } else {
      console.error(error.response.status);
      res.status(500).json({
        message: "Error updating password",
      });
    }
  }
};

const handleForgetPasswordForTesting = async (req, res) => {
  await handleForgetPassword(req, res);
  console.log(handleForgetPasswordForTestingMessage);
  try {
    return res
      .status(200)
      .json({ message: handleForgetPasswordForTestingMessage });
  } catch (err) {
    console.log(err);
  }
};

const handleForgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  if (!validateEmail(email))
    return res.status(400).json({ message: "Please enter a valid email." });

  try {
    await axios.get(`${process.env.ACCOUNT_MANAGER_URL}/users/${email}`);
  } catch (err) {
    return res.status(401).json({ message: "Email does not exist." });
  }

  try {
    const accessToken = jwt.sign(
      {
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    const message = `http://localhost:3000/resetPassword/${accessToken}`;
    console.log(message);
    handleForgetPasswordForTestingMessage = message;
    const mailOptions = {
      from: "pepomagdy999@gmail.com",
      to: email,
      subject: "Forget password link",
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }

      res.status(200).send("Email sent: " + info.response);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email to " + info.response });
  }
};

const handleResetPassword = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.email;

    res.status(200).json({ email: decoded.email });
  });
};
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isOnlyLetters(str) {
  const onlyLettersRegex = /^[A-Za-z]+$/;
  return onlyLettersRegex.test(str);
}
function validatePassword(password) {
  const minLength = 12;
  const maxLength = 100;
  if (password === "" || password === null || !password) {
    return {
      valid: false,
      message: `Please enter a valid password.`,
    };
  }
  if (password.length < minLength) {
    return {
      valid: false,
      message: `Password is too short. It must be at least ${minLength} characters long.`,
    };
  }

  if (password.length > maxLength) {
    return {
      valid: false,
      message: `Password is too long. It must be no more than ${maxLength} characters long.`,
    };
  }

  // Regular expressions to check for the required character types
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!hasLowerCase) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  if (!hasNumber) {
    return {
      valid: false,
      message: "Password must contain at least one number.",
    };
  }

  if (!hasSpecialChar) {
    return {
      valid: false,
      message:
        "Password must contain at least one special character (e.g., !@#$%^&*).",
    };
  }

  return {
    valid: true,
    message: "Password is valid.",
  };
}

module.exports = {
  handleLogin,
  handleVerify,
  handleSignup,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
  handleForgetPasswordForTesting,
};
