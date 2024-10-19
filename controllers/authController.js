import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import { createTransport } from "nodemailer";
import { getAllUserDataByEmail } from '../services/authService.js'
import { updatePassword, createAccount } from '../services/authService.js'
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "pepomagdy999@gmail.com",
    pass: "yqhb mkgu fnnm tain",
  },
});

const handleSignup = async (req, res) => {
  const { email, password, userObject } = req.body;
  if (!email || !password || !userObject.firstName
    || !userObject.lastName
    || !userObject.phoneNumber
    || !userObject.gender
    || !userObject.track
    || !userObject.city
    || !userObject.street
    || !userObject.dob
    || !userObject.educationLevel
    || !userObject.schoolName
    || !userObject.major
    || !userObject.graduationYear
    || !userObject.nationalId
    || !userObject.signature
  )
    return res
      .status(400)
      .json({ message: "Please submit all mandatory data." });
  const accountCreatedSuccessfully = await createAccount(email, password, userObject);
  if (accountCreatedSuccessfully)
    return res.status(201).json({
      message: "Account created Successfully."
    });

  return res
    .status(500)
    .json({ message: "Error creating your account." });
}
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const user = await getAllUserDataByEmail(email);
  if (!user)
    return res
      .status(404)
      .json({ message: `Email does not exist` });

  if (user.userCredentials.password === password) {
    const accessToken = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({
      role: user.role,
      token: accessToken,
      message: "success",
      user: user
    });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
}



const handleForgotPassword = async (req, res) => {
  //forget password flow
  //frontend will send POST API to /auth/forgetPassword
  //BE will send email to the person trying to recover password
  //person will click on link in the mail
  //FE will send the access token in the url to the backend with the new password


  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const accessToken = jwt.sign(
      {
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    const message = `http://localhost:8080/resetPassword/${accessToken}`;
    const mailOptions = {
      from: "pepomagdy999@gmail.com",
      to: email,
      subject: "Forget password link",
      text: message,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ error: "Failed to send email to " + email });
      }

      res.status(200).send("Email sent: " + email);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email to " + email });
  }
};


const handleUpdatePassword = async (req, res) => {
  const { accessToken, password } = req.body;

  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden: Invalid token' });
      await updatePassword(decoded.email, password)
    });

    res.status(201).json({
      message: "Password has been updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating password",
    });
  }
};





// function validateEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }
// function isOnlyLetters(str) {
//   const onlyLettersRegex = /^[A-Za-z]+$/;
//   return onlyLettersRegex.test(str);
// }

// function validatePassword(password) {
//   const minLength = 12;
//   const maxLength = 100;
//   if (password === "" || password === null || !password) {
//     return {
//       valid: false,
//       message: `Please enter a valid password.`,
//     };
//   }
//   if (password.length < minLength) {
//     return {
//       valid: false,
//       message: `Password is too short. It must be at least ${minLength} characters long.`,
//     };
//   }

//   if (password.length > maxLength) {
//     return {
//       valid: false,
//       message: `Password is too long. It must be no more than ${maxLength} characters long.`,
//     };
//   }

//   // Regular expressions to check for the required character types
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasLowerCase = /[a-z]/.test(password);
//   const hasNumber = /\d/.test(password);
//   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//   if (!hasUpperCase) {
//     return {
//       valid: false,
//       message: "Password must contain at least one uppercase letter.",
//     };
//   }

//   if (!hasLowerCase) {
//     return {
//       valid: false,
//       message: "Password must contain at least one lowercase letter.",
//     };
//   }

//   if (!hasNumber) {
//     return {
//       valid: false,
//       message: "Password must contain at least one number.",
//     };
//   }

//   if (!hasSpecialChar) {
//     return {
//       valid: false,
//       message:
//         "Password must contain at least one special character (e.g., !@#$%^&*).",
//     };
//   }

//   return {
//     valid: true,
//     message: "Password is valid.",
//   };
// }

export {
  handleLogin,
  handleForgotPassword,
  handleUpdatePassword,
  handleSignup
};
